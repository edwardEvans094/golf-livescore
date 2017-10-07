const golferDao = require('./golfer.dao');
const teamDao = require('../team/team.dao');
const RecordNotFoundError =  require('../util/error/data_access_error/recordNotFound.error');

const golferService = {
  getById: (golferId, callback) => {
    golferDao.getById(golferId, callback);
  },

  createNewGolfer: (golferData, callback) => {
    golferDao.createNewGolfer(golferData, callback);
  },

  searchByName: (name, limit, callback) => {
    golferDao.searchByName(name, limit, callback);
  },

  searchGolferInTeam: (name, teamId, limit, callback) => {
    teamDao.getById(teamId, (err, team) => {
      if(err){
        return callback(err);
      }
      if(!team ){
        return callback(new RecordNotFoundError('team not found in searchGolferInTeam()'))
      }
      console.log(team);
      golferDao.searchGolferInTeam(name, team.member, 3, callback);
    })
  },

  saveGolferData: (golferId, data, callback) => {
    golferDao.getById(golferId, (err, golfer) => {
      if(err){
        return callback(err);
      }
      if(!golfer){
        return new RecordNotFoundError('team not found in saveGolferData()')
      }
      golferDao.saveGolferData(golfer, data, callback);
    })
  }
}

module.exports = golferService;