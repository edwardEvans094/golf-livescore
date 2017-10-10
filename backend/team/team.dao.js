let Team = require('./team.model');
let Golfer = require('../golfer/golfer.model');
let _ = require('underscore');
module.exports = {
  getById : (teamId, callback) => {
    Team.findById(teamId, (err, team) => {
      return callback(err, team);
    })
  }, 

  getByIdPopulate : (teamId, callback) => {
    Team.findById(teamId)
    .populate([
      {path: 'member', model: 'Golfer', select: '_id name avatar'}
    ])
    .lean()
    .exec((err, team) => {
      return callback(err, team);
    })
  }, 

  getByName : (teamName, callback) => {

  },

  createNewTeam : (teamData, callback) => {
    let newTeam = new Team(teamData);
    newTeam.save((err) => {
      return callback(err, newTeam);
    })
  },

  editTeam : (teamId, newData, callback) => {
    
  },

  searchByName: (name, limit, callback) => {
    console.log(name);
    Team.find({'name_searchable': new RegExp(name, 'i')})
    .where('status').equals(1)
    .limit(limit)
    .lean()
    .exec((err, teams) => {
      return callback(err, teams);
    })
  },

  getAll: (limit, offset, callback) => {
    Team.find()
    .where('status').equals(1)
    .sort({created_at: -1})
    .limit(limit)
    .skip(offset)
    .lean()
    .exec((err, teams) => {
      return callback(err, teams);
    })
  },

  saveTeamData: (teamObj, data, callback) => {
    _.extend(teamObj, data);
    teamObj.save((err) => {
      return callback(err, teamObj);
    });
  }
}