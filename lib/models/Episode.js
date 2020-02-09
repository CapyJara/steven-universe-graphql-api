const mongo = require('mongoose');
const Schema = mongo.Schema;

const episodeSchema = new Schema({
  name: String,
  season: String,
  episode: String,
  airdate: Array,
  written_and_story_boarded_by: Array,
  directed_by: Array,
  previous: String,
  next: String,
  synopsis: String,
  characters: Array,
  objects: Array,
  music: Array,
  locations: Array,
});

module.exports = mongo.model('Episode', episodeSchema);
