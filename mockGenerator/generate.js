const faker = require('faker');
const fs = require('fs').createWriteStream('./tenMil.csv');

(async () => {
  const k = 1000 + 1;
  const mil = 1e6 + 1;
  const tenMil = 1e7 + 1;

  const header = 'id,city,property_avail,location_name,photo_url,price,rating,review_count\n';
  const homeType = ['Entire home', 'Private room', 'Hotel Room', 'Shared Room'];
  const array = ['2', '2.5', '3', '3.5', '4', '4.5', '5'];
  const homeDescriptor = ['Studio', 'Loft', 'Apartment', 'House', 'Home', 'Condo', 'Cabin', 'Suite', 'Duplex', 'Town-Home', 'Villa', 'Vacation-House', 'Yurt', 'Bungaloo', 'Chalet', 'Penthouse', 'Terrace', 'Cottage', 'Yacht'];

  let num, propertyAvail, locationName, photoUrl, price, rating, reviewCount, buzzWord;
  const city = [];

  // process.stdout.write(header);
  fs.write(header);

  const generateCities = (number) => {
    for (let i = 0; i < number; i += 1) {
      city.push(faker.address.city());
    }
  };

  generateCities(1031);

  for (let count = 0; count < tenMil; count += 1) {
    buzzWord = faker.company.bsAdjective();
    buzzWord = buzzWord[0].toUpperCase() + buzzWord.slice(1);

    num = faker.random.number({ min: 1, max: 1030 });

    propertyAvail = `${homeType[Math.floor(Math.random() * 3)]} • ${city[num]}`;
    locationName = `${buzzWord} ${homeDescriptor[Math.floor(Math.random() * 20)]} in ${city[num]}`;
    photoUrl = `https://s3.amazonaws.com/similar-homes-module/city/city${num}.jpg`;
    price = faker.random.number({ min: 77, max: 1982 });
    rating = array[Math.floor(Math.random() * 7)];
    reviewCount = faker.random.number({ min: 17, max: 777 });

    const row = `${count},${city[num]},${propertyAvail},"${locationName}",${photoUrl},${price},${rating},${reviewCount}\n`;

    // if (!process.stdout.write(row)) {
    //   await new Promise(resolve => process.stdout.once('drain', resolve));
    // }
    if (!fs.write(row)) {
      await new Promise(resolve => fs.once('drain', resolve));
    }
    if (count % 1e6 === 0) {
      console.error(count, 'count per mil');
      console.error(process.uptime());
    }
  }
  console.error(process.uptime());
})();
