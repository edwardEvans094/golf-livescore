const Tournament = require('./tournament.model');
const _ = require('underscore');
const slug = require('slug');

const util = require('../util');
module.exports = {
  getById: (tournamentId, callback) => {
    Tournament.findById(tournamentId, (err, tournament) => {
      return callback(err, tournament);
    })
  },

  getByIdPopulateTeam: (tournamentId, callback) => {
    Tournament.findById(tournamentId)
      .populate([
        {path: 'team.team_id', model: 'Team', select: '_id name info logo'}
      ])
      .lean()
      .exec((err, tournament) => {
        return callback(err, tournament);
      })
  },

  getBySlug: (slug, callback) => {
    Tournament.findOne({slug: slug})
    .populate([
      {path: 'team.team_id', model: 'Team', select: '_id name info logo'}
    ])
    .lean()
    .exec((err, tournament) => {
      return callback(err, tournament);
    });
  },

  createNewTournament: (data, callback) => {
    let newTournament = new Tournament(data);
    newTournament.slug = slug(newTournament.name,'-') + '-' + newTournament._id.toString().slice(0,5);
    newTournament.save((err) => { 
      return callback(err, newTournament);
    })
  },

  getAll: (callback) => {
    //TODO find with status 1
    Tournament.find()
    .sort({created_at: -1})
    .limit(10)
    .lean()
    .exec((err, results) => {
      return callback(err, results);
    })
  },

  saveTournamentData: (oldTournamentObj, tournamentData, callback) => {
    //remove id
    delete tournamentData._id;
    _.extend(oldTournamentObj, tournamentData);
    oldTournamentObj.save((err) => {
      return callback(err, oldTournamentObj);
    })
  }
}