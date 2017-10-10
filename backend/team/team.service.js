const teamDAO = require('./team.dao');

module.exports = {
  getById : (teamId, callback) => {
    teamDAO.getById(teamId, callback);
  },

  getByIdPopulate : (teamId, callback) => {
    teamDAO.getByIdPopulate(teamId, callback);
  },
  
  createNewTeam: (teamData, callback) => {
    teamDAO.createNewTeam(teamData, callback);
  },

  searchByName: (name, limit, callback) => {
    teamDAO.searchByName(name, limit, callback);
  },

  getAll: (limit, offset, callback) => {
    teamDAO.getAll(limit, offset, callback);
  },

  saveTeamData: (teamId, data, callback) => {
    teamDAO.getById(teamId, (err, team) => {
      if(err){

      }
      if(!team){

      }
      console.log("++++++++++++++++");
      console.log(team);
      teamDAO.saveTeamData(team, data, callback);
    })
  }
}