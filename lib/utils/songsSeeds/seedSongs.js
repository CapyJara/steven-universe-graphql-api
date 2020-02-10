require('dotenv').config();
const connect = require('../connect');
const mongoose = require('mongoose');
const Song = require('../../models/Song');
const songs = require('./songsFixed.json');

const seedSongs = () => {
  return Song.create(songs)
    .then(() => console.log('success'))
    .catch(() => console.log('error'));
};

const seed = async() => {
  await connect();
  try { await mongoose.connection.collection('songs').drop(); }
  catch(e) { console.log('couldnt drop collection'); }
  await seedSongs();
  await mongoose.connection.close();
};

seed();
