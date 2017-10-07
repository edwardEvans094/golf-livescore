const tournamentService = require('../tournament/tournament.service');
const matchService = require('../match/match.service');

const async = require('async');

module.exports = {
  renderScore: (req, res) => {
    let slug = req.params.slug;
    tournamentService.getBySlug(slug, (err, tournament) => {
      if(err){

      }
      if(!tournament){

      }
      async.parallel({
        getSingleMatch: (asyncCallback) => {
          matchService.getAllSingleMatch(tournament._id, asyncCallback);
        },
        getFoursomesMatch: (asyncCallback) => {
          matchService.getAllFoursomesMatch(tournament._id, asyncCallback);
        }
      }, (errs, results) => {
        if(errs){
          //todo handle errors
        }
        results.getTournament = tournament;
        console.log(results);
        return res.render('tournament/score', {results: results});
      });
    });
  }
}