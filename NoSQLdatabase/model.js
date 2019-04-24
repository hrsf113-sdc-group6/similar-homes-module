const ExpressCassandra = require('express-cassandra');

const models = ExpressCassandra.createClient({
  clientOptions: {
    contactPoints: ['127.0.0.1'],
    protocolOptions: { port: 9042 },
    keyspace: 'similarhomes',
    queryOptions: { consistency: ExpressCassandra.consistencies.one },
  },
  ormOptions: {
    defaultReplicationStrategy: {
      class: 'SimpleStrategy',
      replication_factor: 1,
    },
    migration: 'safe',
  },
});

const MyModel = models.loadSchema('similar_homes', {
  fields: {
    id: 'int',
    city: 'varchar',
    property_avail: 'varchar',
    location_name: 'varchar',
    photo_url: 'varchar',
    price: 'int',
    rating: 'decimal',
    review_count: 'int',
  },
  key: [['rating'], 'price', 'city'],
  clusteringorder: {
    "price": 'asc',
    "rating": 'desc',
  },
  indexes: ['id'], // indexes might be wrong
});

// const MyModel = models.loadSchema('similar_homes', {
//   fields: {
//     id: 'int',
//     city: 'varchar',
//     property_avail: 'varchar',
//     location_name: 'varchar',
//     photo_url: 'varchar',
//     price: 'int',
//     rating: 'decimal',
//     review_count: 'int',
//   },
//   key: ['id', 'city', 'price', 'rating'],
// });

console.log(models.instance.similar_homes === MyModel);

MyModel.syncDB((err, result) => {
  if (err) throw err;
});

// copy "similarhomes"."similar_homes" ("id", "city", "property_avail", "location_name", "photo_url", "price", "rating", "review_count") from '/Users/simonchan/Desktop/HR/similar-homes-module/mockGenerator/tenMil.csv' with delimiter = ',' and HEADER = true;
// copy "similarhomes"."similar_homes" ("id", "city", "property_avail", "location_name", "photo_url", "price", "rating", "review_count") from '/Users/simonchan/Desktop/HR/similar-homes-module/mockGenerator/ten.csv' with delimiter = ',' and HEADER = true;
