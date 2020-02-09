const mongo = require('mongoose');
const Schema = mongo.Schema;

const locationSchema = new Schema({
  name: String,
  type: String,
  location: String,
  first: String,
  last: String,
  inhabitants: Array,
  owner: String,
  employees: Array,
});

module.exports = mongo.model('Location', locationSchema);
