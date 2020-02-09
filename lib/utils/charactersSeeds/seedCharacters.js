require('dotenv').config();
const connect = require('../connect');
const mongoose = require('mongoose');
const Character = require('../../models/Character');
const scrapeCharacterInfo = require('./scrapeCharacters');

const seedCharacters = async() => {
  const characters = await scrapeCharacterInfo();
  return Character.create(characters)
    .then(() => console.log('success'))
    .catch(() => console.log('error'));
};

const seed = async() => {
  await connect();
  try { await mongoose.connection.collection('characters').drop(); }
  catch(e) { console.log('couldnt drop collection'); }
  await seedCharacters();
  await mongoose.connection.close();
};

seed();
