require('dotenv').config();
const connect = require('../connect');
const mongoose = require('mongoose');
const Character = require('../../models/Character');
const characters = require('./charactersFixed.json');

const seedCharacters = async() => {
  return Character.create(characters)
    .then(() => console.log('success'))
    .catch((e) => console.log('error', e));
};

const seed = async() => {
  await connect();
  try { await mongoose.connection.collection('characters').drop(); }
  catch(e) { console.log('couldnt drop collection'); }
  await seedCharacters();
  await mongoose.connection.close();
};

seed();
