const Golfer = require('./golfer.model');
const _ = require('underscore');

module.exports = {
  getById: (golferId, callback) => {
    Golfer.findById(golferId, (err, golfer) => {
      return callback(err, golfer);
    });
  },

  createNewGolfer: (golferData, callback) => {
    let newGolfer = new Golfer(golferData);
    newGolfer.save((err) => {
      return callback(err, newGolfer);
    })
  },

  searchByName: (name, limit, callback) => {
    console.log(name);
    Golfer.find({'name_searchable': new RegExp(name, 'i')})
    .where('status').equals(1)
    .limit(limit)
    .lean()
    .exec((err, golfers) => {
      return callback(err, golfers);
    })
  },

  searchGolferInTeam: (name, arrayMember, limit, callback) => {
    Golfer.find({
      'name_searchable': new RegExp(name, 'i'),
      '_id': {$in: arrayMember}
    })
    .where('status').equals(1)
    .limit(limit)
    .lean()
    .exec((err, golfers) => {
      return callback(err, golfers);
    })
  },

  saveGolferData: (oldGolferObj, data, callback) => {
    delete data._id;
    _.extend(oldGolferObj, data);
    oldGolferObj.save((err) => {
      return callback(err, oldGolferObj);
    })
  },

  getAll: (limit, offset, callback) => {
    Golfer.find()
    .where('status').equals(1)
    .sort({created_at: -1})
    .limit(limit)
    .skip(offset)
    .lean()
    .exec((err, golfers) => {
      return callback(err, golfers);
    })
  }

}