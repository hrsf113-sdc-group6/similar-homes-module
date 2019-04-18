const faker = require('faker');
const file = require('fs').createWriteStream('./test.dat');

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

(async () => {
  const users = [];

  for (let count = 1; count < 3; count += 1) {
    const num = faker.random.number({ min: 1, max: 1030 });
    // users.push({
    let single;
    if (count === 1) {
      single = JSON.stringify({
        id: count,
        propertyAvail: propertyType(),
        locationName: title(),
        photoUrl: 'https://s3.amazonaws.com/similar-homes-module/city/city${num}.jpg',
        price: faker.random.number({ min: 77, max: 1982 }),
        rating: stars(),
        reviewCount: faker.random.number({ min: 17, max: 777 }),    
      });

      if (!file.write('[' + JSON.stringify(single))) {
        // Will pause every 16384 iterations until `drain` is emitted
        await new Promise(resolve => file.once('drain', resolve));
      }
    } else {
      single = JSON.stringify({
        id: count,
        propertyAvail: propertyType(),
        locationName: title(),
        photoUrl: `https://s3.amazonaws.com/similar-homes-module/city/city${num}.jpg`,
        price: faker.random.number({ min: 77, max: 1982 }),
        rating: stars(),
        reviewCount: faker.random.number({ min: 17, max: 777 }),
      }).concat(',');

      if (!file.write(JSON.stringify(single))) {
        // Will pause every 16384 iterations until `drain` is emitted
        await new Promise(resolve => file.once('drain', resolve));
      }
    }
  }
})();
