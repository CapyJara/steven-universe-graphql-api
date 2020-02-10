const mongo = require('mongoose');
const Schema = mongo.Schema;

const songSchema = new Schema({
  name: String,
  image: String,
  vocalists: Array,
  composers: Array,
  lyrics: String
});

module.exports = mongo.model('Song', songSchema);
