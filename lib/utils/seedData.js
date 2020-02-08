const chance = require('chance').Chance();
const Chef = require('../models/Chef');
const Dish = require('../models/Dish');

const seedChefs = () => {
  const users = [...Array(10)].map(() => ({
    name: chance.name(),
    rating: chance.integer({ min: 0, max: 5 })
  }));
  return Chef.create(users);
};

const seedDishes = async() => {
  const chefs = await seedChefs();
  const dishes = [...Array(50)].map(() => {
    const chef = chance.pickone(chefs);
    return {
      name: chance.animal(),
      country: chance.country(),
      tasty: chance.bool(),
      chefsId: chef._id
    };
  });
  return await Dish.create(dishes);
};

module.exports = seedDishes;
