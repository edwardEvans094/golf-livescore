const Golfer = require('./golfer.model');

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
  }

}