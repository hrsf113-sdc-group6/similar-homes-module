const nr = require('newrelic');
const express = require('express');
const path = require('path');
const redis = require('redis');
const db = require('../SQLdatabase/index');

const client = redis.createClient();
const { tableName } = require('../SQLdatabase/model');

const app = express();
const port = 3004;

app.listen(port, () => console.log(`Port ${port} is live!!!`));

app.use('/similarhomes/:host_id', express.static(path.join(__dirname, '../client/dist')));


app.get('/similarhomes/:host_id/nearby', (req, res) => {
  const hostId = req.params.host_id;
  const idQuery = `SELECT * FROM ${tableName} WHERE id = ${hostId} ;`;

  db.query(idQuery, { type: db.QueryTypes.SELECT })
    .then((listing) => {
      const { city, price } = listing[0];
      const relatedQuery = `SELECT * FROM ${tableName} WHERE city = ? AND rating >= 4 AND price BETWEEN ${price - 5} AND ${price + 5} LIMIT 12 ;`;
      db.query(relatedQuery, { replacements: [city], type: db.QueryTypes.SELECT })
        .then(data => res.send(data));
    })
    .catch(err => res.status(404).end(err));
});

// const getId = (req, res) => {
//   const hostId = req.params.host_id;
//   const idQuery = `SELECT * FROM ${tableName} WHERE id = ${hostId} ;`;

//   db.query(idQuery, { type: db.QueryTypes.SELECT })
//     .then((listing) => {
//       const { city, price } = listing[0];
//       const relatedQuery = `SELECT * FROM ${tableName} WHERE city = ? AND rating >= 4 AND price BETWEEN ${price - 5} AND ${price + 5} LIMIT 12 ;`;
//       db.query(relatedQuery, { replacements: [city], type: db.QueryTypes.SELECT })
//         .then((data) => {
//           const related = data;
//           client.setex(hostId, 3600, JSON.stringify(related));
//           res.send(data);
//         });
//     })
//     .catch(err => res.status(404).end(err));
// };

// const getCache = (req, res) => {
//   const hostId = req.params.host_id;
//   client.get(hostId, (err, result) => {
//     if (result) {
//       res.send(result);
//     } else {
//       getId(req, res);
//     }
//   });
// };

// app.get('/similarhomes/:host_id/nearby', getCache);

app.post('/similarhomes/:host_id/nearby', (req, res) => {
  const data = req.body;
  const listing = {
    id: data.id,
    city: data,
    property_avil: data.property_avil,
    location_name: data.location_name,
    photo_url: data.photo_url,
    price: data.price,
    rating: data.rating,
    review_count: data.review_count,
  };
  const postQuery = `INSERT INTO ${tableName} (id, city, property_avil, location_name, photo_url, price, rating, review_count) VALUES (${listing.id}, ${listing.city}, ${listing.property_avil}, ${listing.location_name}, ${listing.photo_url}, ${listing.price}, ${listing.rating}, ${listing.review_count})`
  db.query(postQuery, { type: db.QueryTypes.INSERT })
    .then(() => res.status(201))
    .catch(err => res.status(404).end(err));
});

app.patch('/similarhomes/:host_id/nearby', (req, res) => {
  // const data = req.body;
  // const listing = {
  // }
  db.query(updateQuery, { type: db.QueryTypes.UPDATE })
    .then(() => res.send(202))
    .catch(err => res.status(404).end(err));
});
