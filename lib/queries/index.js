const { GraphQLList, GraphQLObjectType, GraphQLID, GraphQLString } = require('graphql');
const Character = require('../models/Character');
const CharacterType = require('./CharacterType');
const Location = require('../models/Location');
const LocationType = require('./LocationType');
const Episode = require('../models/Episode');
const EpisodeType = require('./EpisodeType');
const Song = require('../models/Song');
const SongType = require('./SongType');

const QueryRootType = new GraphQLObjectType ({
  name: 'AppSchema',
  description: 'Application Schema Query Root',
  fields: () => ({
    characters: {
      type: new GraphQLList(CharacterType),
      description: 'List all characters',
      args: {
        gem_type: { type: GraphQLString },
        species: { type: GraphQLString },
        gemstone: { type: GraphQLString },
        affiliations: { type: GraphQLString },
        alignment: { type: GraphQLString },
        sex: { type: GraphQLString },
        gender_pronoun: { type: GraphQLString },
        name: { type: GraphQLString },
      },
      resolve: async function(parent, args) {
        return await Character.find(args);
      }
    },
    character: {
      type: CharacterType,
      description: 'Gets character by id',
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Character.findById(args.id);
      }
    },
    locations: {
      type: new GraphQLList(LocationType),
      description: 'List all locations',
      args: {
        name: { type: GraphQLString },
        type: { type: GraphQLString },
        location: { type: GraphQLString },
        inhabitants: { type: GraphQLString },
        owner: { type: GraphQLString },
        employees: { type: GraphQLString },
      },
      resolve: async function(parent, args) {
        return await Location.find(args);
      }
    },
    location: {
      type: LocationType,
      description: 'Gets location by id',
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Location.findById(args.id);
      }
    },
    episodes: {
      type: new GraphQLList(EpisodeType),
      description: 'List all episodes',
      args: {
        name: { type: GraphQLString },
        season: { type: GraphQLString },
        episode: { type: GraphQLString },
        written_and_story_boarded_by: { type: GraphQLString },
        directed_by: { type: GraphQLString },
        characters: { type: GraphQLString },
        music: { type: GraphQLString },
        locations: { type: GraphQLString },
      },
      resolve: async function(parent, args) {
        return await Episode.find(args);
      }
    },
    episode: {
      type: EpisodeType,
      description: 'Gets episode by id',
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Episode.findById(args.id);
      }
    },
    songs: {
      type: new GraphQLList(SongType),
      description: 'List all songs',
      args: {
        name: { type: GraphQLString },
        image: { type: GraphQLString },
        vocalists: { type: GraphQLString },
        composers: { type: GraphQLString },
      },
      resolve: async function(parent, args) {
        return await Song.find(args);
      }
    },
    song: {
      type: SongType,
      description: 'Gets song by id',
      args: {
        id: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Song.findById(args.id);
      }
    },
  })
});

module.exports = QueryRootType;
