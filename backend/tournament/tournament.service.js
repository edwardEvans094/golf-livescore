const tournamentDAO = require('./tournament.dao');

const tournamentService = {
  getById: (tournamentId, callback) => {
    return tournamentDAO.getById(tournamentId, callback);
  },

  getByIdPopulateTeam: (tournamentId, callback) => {
    return tournamentDAO.getByIdPopulateTeam(tournamentId, callback);
  },

  createNewTournament: (data, callback) => {
    return tournamentDAO.createNewTournament(data, callback);
  },
  getAll: (callback) => {
    return tournamentDAO.getAll(callback);
  },

  updateTournamentData: (tournamentId, data, callback) => {
    tournamentService.getById(tournamentId, (err, tournament) => {
      if(err){

      }
      if(!tournament){
        // TODO handle err here
      }
      tournamentDAO.saveTournamentData(tournament, data, callback);
    })
  }
}

module.exports = tournamentService;