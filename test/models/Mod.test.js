const mongoose = require('mongoose');
const Mod = require('../../lib/models/Mod');

describe('model test', () => {
  it('new Announcement', () => {
    const mod = new Mod({
      name: 'jimmy'
    });
    expect(mod.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'jimmy'
    });
  });

});
