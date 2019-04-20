const faker = require('faker');
// const file = require('fs').createWriteStream('./k.csv');

const stars = () => {
  const array = ['2', '2.5', '3', '3.5', '4', '4.5', '5'];
  return array[Math.ceil(Math.random() * 6)];
};

const propertyType = () => {
  const homeType = ['Entire home', 'Private room', 'Hotel Room', 'Shared Room'];
  return `${homeType[Math.floor(Math.random() * 3)]} • ${faker.address.city()}`;
};

const title = () => {
  const homeDescriptor = ['Studio', 'Loft', 'Apartment', 'House', 'Home', 'Condo', 'Cabin', 'Suite', 'Duplex', 'Town-Home', 'Villa', 'Vacation-House', 'Yurt', 'Bungaloo', 'Chalet', 'Penthouse', 'Terrace', 'Cottage', 'Yacht'];
  let buzzWord = faker.company.bsAdjective();
  buzzWord = buzzWord[0].toUpperCase() + buzzWord.slice(1);
  return `${buzzWord} ${homeDescriptor[Math.floor(Math.random() * 17)]} in ${faker.address.city()}`;
};

// (async () => {
//   const k = 1000;
//   const mil = 1e6 + 1;
//   const tenMil = 1e7 + 1;
//   for (let count = 0; count < k; count += 1) {
//     const num = faker.random.number({ min: 1, max: 1030 });
//     const propertyAvail = propertyType();
//     const locationName = title();
//     const photoUrl = `https://s3.amazonaws.com/similar-homes-module/city/city${num}.jpg`;
//     const price = faker.random.number({ min: 77, max: 1982 });
//     const rating = stars();
//     const reviewCount = faker.random.number({ min: 17, max: 777 });

//     if (count === 0) {
//       const header = '_id, propertyAvail, locationName, photoUrl, price, rating, reviewCount\n';
//       if (!file.write(header)) {
//         await new Promise(resolve => file.once('drain', resolve));
//       }
//     } else {
//       const row = `${count},${propertyAvail},"${locationName}",${photoUrl},${price},${rating},${reviewCount}\n`;
//       if (!file.write(row)) {
//         console.log('black magic');
//         await new Promise(resolve => file.once('drain', resolve));
//       }
//     }
//   }
//   console.error(process.uptime());
// })();

(async () => {
  const k = 500;
  const mil = 1e6 + 1;
  const tenMil = 1e7 + 1;

  const header = '_id, propertyAvail, locationName, photoUrl, price, rating, reviewCount\n';

  process.stdout.write(header);
  // file.write(header);

  for (let count = 0; count < mil; count += 1) {
    const num = faker.random.number({ min: 1, max: 1030 });
    const propertyAvail = propertyType();
    const locationName = title();
    const photoUrl = `https://s3.amazonaws.com/similar-homes-module/city/city${num}.jpg`;
    const price = faker.random.number({ min: 77, max: 1982 });
    const rating = stars();
    const reviewCount = faker.random.number({ min: 17, max: 777 });

    const row = `${count},${propertyAvail},"${locationName}",${photoUrl},${price},${rating},${reviewCount}\n`;
    process.stdout.write(row);
    // if (!file.write(row)) {
    //   await new Promise(resolve => file.once('drain', resolve));
    // }
  }
  console.error(process.uptime());
})();

// function writeOneMillionTimes(writer, data, encoding, callback) {
//   let i = 1000000;
//   write();
//   function write() {
//     let ok = true;
//     do {
//       i--;
//       if (i === 0) {
//         // last time!
//         writer.write(data, encoding, callback);
//       } else {
//         // See if we should continue, or wait.
//         // Don't pass the callback, because we're not done yet.
//         ok = writer.write(data, encoding);
//       }
//     } while (i > 0 && ok);
//     if (i > 0) {
//       // had to stop early!
//       // write some more once it drains
//       writer.once('drain', write);
//     }
//   }
// }
