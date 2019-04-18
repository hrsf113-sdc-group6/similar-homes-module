const faker = require('faker');
const fs = require('fs');

function generateUsers() {
  const users = [];

  for (let id = 1; id <= 110; id += 1) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const pic = 'https://source.unsplash.com/random';
    const title = faker.lorem.words(Math.floor(Math.random() * 7));
    const city = faker.address.city();
    const country = faker.address.country();

    const guests = faker.random.number(9) + 1;
    const beds = faker.random.number(4) + 1;
    const bedrooms = faker.random.number(4) + 1;

    const bathArray = [1, 1.5, 2, 2.5];
    const baths = bathArray[Math.floor(Math.random() * 4)]; // array?

    const superHost = faker.random.boolean();
    const selfCheckIn = faker.random.boolean();
    const rating = faker.random.number({ min: 85, max: 100 });

    const description = faker.lorem.paragraphs(10);

    const license = faker.address.stateAbbr() + faker.random.number({ min: 100000000000, max: 1000000000000 });

    users.push({
      'hostid': id,
      'firstName': firstName,
      'lastName': lastName,
      'pic': pic,
      'title': title,
      'city': city,
      'country': country,
      'guests': guests,
      'beds': beds,
      'bedrooms': bedrooms,
      'baths': baths,
      'superHost': superHost,
      'selfCheckIn': selfCheckIn,
      'rating': rating,
      'description': description,
      'license': license,
    });
  }

  return users;
}

const dataObj = generateUsers();
fs.writeFileSync('data.json', JSON.stringify(dataObj, null, '\t'));

module.exports = generateUsers;
