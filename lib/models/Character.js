const mongo = require('mongoose');
const Schema = mongo.Schema;

const characterSchema = new Schema({
  name: String,
  image: String,
  nicknames: Array,
  alias: Array,
  species: Array,
  weapons: Array,
  sex: Array,
  gender_pronoun: Array,
  hair: Array,
  eyes: Array,
  gemstone: Array,
  gem_type: Array,
  affiliations: Array,
  occupations: Array,
  alignment: Array,
  relatives: Array,
  friends: Array,
  voice_actor: Array,
  first_appearance: Array
});

module.exports = mongo.model('Character', characterSchema);
