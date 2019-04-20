const faker = require('faker');

(async () => {
  const k = 500;
  const mil = 1e6 + 1;
  const twomil = 2e6 + 1;
  const tenMil = 1e7 + 1;

  const header = '_id, propertyAvail, locationName, photoUrl, price, rating, reviewCount\n';
  const homeType = ['Entire home', 'Private room', 'Hotel Room', 'Shared Room'];
  const array = ['2', '2.5', '3', '3.5', '4', '4.5', '5'];
  const homeDescriptor = ['Studio', 'Loft', 'Apartment', 'House', 'Home', 'Condo', 'Cabin', 'Suite', 'Duplex', 'Town-Home', 'Villa', 'Vacation-House', 'Yurt', 'Bungaloo', 'Chalet', 'Penthouse', 'Terrace', 'Cottage', 'Yacht'];

  process.stdout.write(header);

  let num, propertyAvail, locationName, photoUrl, price, rating, reviewCount, buzzWord;

  for (let count = 0; count < tenMil; count += 1) {
    buzzWord = faker.company.bsAdjective();
    buzzWord = buzzWord[0].toUpperCase() + buzzWord.slice(1);

    num = faker.random.number({ min: 1, max: 1030 });
    propertyAvail = `${homeType[Math.floor(Math.random() * 3)]} • ${faker.address.city()}`;
    locationName = `${buzzWord} ${homeDescriptor[Math.floor(Math.random() * 17)]} in ${faker.address.city()}`;
    photoUrl = `https://s3.amazonaws.com/similar-homes-module/city/city${num}.jpg`;
    price = faker.random.number({ min: 77, max: 1982 });
    rating = array[Math.ceil(Math.random() * 6)];
    reviewCount = faker.random.number({ min: 17, max: 777 });

    const row = `${count},${propertyAvail},"${locationName}",${photoUrl},${price},${rating},${reviewCount}\n`;

    if (!process.stdout.write(row)) {
      await new Promise(resolve => file.once('drain', resolve));
    }
    if (count % 1e6 === 0) {
      console.error(count, 'count per mil');
      console.error(process.uptime());
    }
  }
  console.error(process.uptime());
})();
