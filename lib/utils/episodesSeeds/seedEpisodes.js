require('dotenv').config();
const connect = require('../connect');
const mongoose = require('mongoose');
const Episode = require('../../models/Episode');
const episodes = require('./episodesFixed.json');

const seedEpisodes = () => {
  return Episode.create(episodes)
    .then(() => console.log('success'))
    .catch(() => console.log('error'));
};

const seed = async() => {
  await connect();
  try { await mongoose.connection.collection('episodes').drop(); }
  catch(e) { console.log('couldnt drop collection'); }
  await seedEpisodes();
  await mongoose.connection.close();
};

seed();
