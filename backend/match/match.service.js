const matchDAO = require('./match.dao');

const matchType = {
  SINGLE: 2,
  FOURSOME: 3
}
module.exports = {
  getById: (matchId, callback) => {
    return matchDAO.getById(matchId, callback);
  },

  getByIdWithPopulate: (matchId, callback) => {
    return matchDAO.getByIdWithPopulate(matchId, callback);
  },

  createNewMatchInTournament: (matchData, callback) => {
    return matchDAO.createNewMatchInTournament(matchData, callback);
  },

  updateScore: (matchId, data, callback) => {
    return matchDAO.updateScore(matchId, data, callback);
  },

  getAll: (tournamentId, callback) => {
    return matchDAO.getAll(tournamentId, callback);
  },

  getAllSingleMatch: (tournamentId, callback) => {
    return matchDAO.getAllMatchWithType(tournamentId, matchType.SINGLE, callback);
  },

  getAllFoursomesMatch: (tournamentId, callback) => {
    return matchDAO.getAllMatchWithType(tournamentId, matchType.FOURSOME, callback);
  }
}