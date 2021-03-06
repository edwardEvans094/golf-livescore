const Match = require('./match.model');
const _ = require('underscore')
const matchDAO = {
  getById: (matchId, callback) => {
    Match.findById(matchId, (err, match) => {
      return callback(err, match);
    })
  },

  getByIdWithPopulate: (matchId, callback) => {
    Match.findById(matchId)
      .populate([
        {path: 'golfer.golfer_id', model: 'Golfer', select: '_id name avatar'},
        {path: 'tournament_id', model: 'Tournament'}
      ])
      .lean()
      .exec((err, match) => {
        return callback(err, match);
      })
  },

  createNewMatchInTournament: (matchData, callback) => {
    let newMatch = new Match(matchData);
    newMatch.save((err) => {
      return callback(err, newMatch);
    })
  },

  updateScore: (matchId, data, callback) => {
    matchDAO.getById(matchId, (err, result) => {
      if(err){
        //TODO return err
        return err
      }
      if(!result){
        //todo return result not found from dao

      }
      _.extend(result.golfer, data);
      result.save((err) => {
        return callback(err);
      })
    })
  },

  getAll: (tournamentId, callback) => {
    //TODO find with status 1
    Match.find({tournament_id: tournamentId})
    .sort({created_at: -1})
    .limit(10)
    .lean()
    .exec((err, results) => {
      return callback(err, results);
    })
  },

  getAllMatchWithType: (tournamentId, type, callback) => {
    Match.find({
      tournament_id: tournamentId,
      type: type
    })
    .populate([
      {path: 'golfer.golfer_id', model: 'Golfer', select: '_id name avatar'}
    ])
    .sort({created_at: -1})
    .limit(10)
    .lean()
    .exec((err, results) => {
      return callback(err, results);
    })
  },

  saveMatchData: (oldMatchObj, data, callback) => {
    delete data._id;
    delete data.tournament_id;

    console.log("++++++++++++++++++++++");
    console.log(data);
    console.log(oldMatchObj);
    _.extend(oldMatchObj, data);
    oldMatchObj.save((err) => {
      return callback(err, oldMatchObj);
    })
  }
}

module.exports = matchDAO;