const teamDAO = require('./team.dao');

module.exports = {
  createNewTeam: (teamData, callback) => {
    teamDAO.createNewTeam(teamData, callback);
  },

  searchByName: (name, limit, callback) => {
    teamDAO.searchByName(name, limit, callback);
  },

  getAll: (limit, offset, callback) => {
    teamDAO.getAll(limit, offset, callback);
  }
}