require('dotenv').config();
const connect = require('../connect');
const mongoose = require('mongoose');
const Location = require('../../models/Location');
const locations = require('./locationsFixed.json');

const seedLocations = async() => {
  return Location.create(locations)
    .then(() => console.log('success'))
    .catch(() => console.log('error'));
};

const seed = async() => {
  await connect();
  try { await mongoose.connection.collection('locations').drop(); }
  catch(e) { console.log('couldnt drop collection'); }
  await seedLocations();
  await mongoose.connection.close();
};

seed();
