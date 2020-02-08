require('dotenv').config();
const connect = require('./connect');
const mongoose = require('mongoose');
const seedData = require('./seedData');

const seed = async() => {
  await connect();
  await mongoose.connection.dropDatabase();
  await seedData();
  await mongoose.connection.close();
};

seed();
