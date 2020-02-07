require('dotenv').config();
const request = require('supertest');
const app = require('../../lib/app');
const mongoose = require('mongoose');
const connect = require('../../lib/utils/connect');

beforeAll(() => connect());
beforeEach(() => mongoose.connection.dropDatabase());
afterAll(() => mongoose.connection.close());

describe('route tests', () => {

  it('create a new mod', () => {
    return request(app)
      .post('/api/v1/rout')
      .send({
        name: 'jimmy'
      })
      .then(res => {
        expect(res.body).toEqual({
          name: 'jimmy',
          _id: expect.any(String),
        });
      });
  });
});
