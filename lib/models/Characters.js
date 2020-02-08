const mongo = require('mongoose');
const Schema = mongo.Schema;

const characterSchema = new Schema({
  name: String,
  nicknames: Array,
  alias: Array,
  species: String,
  weapons: Array,
  sex: String,
  gender_pronoun: Array,
  hair: String,
  eyes: String,
  gemstone: String,
  gem_type: String,
  affiliations: Array,
  occupations: Array,
  alignment: String,
  relatives: Array,
  friends: Array,
  voice_actor: String,
  first_appearance: Array
});

module.exports = mongo.model('Character', characterSchema);
