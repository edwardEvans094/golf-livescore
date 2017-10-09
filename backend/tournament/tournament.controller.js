const tournamentService = require('./tournament.service');
const matchService = require('../match/match.service');

const async = require('async');


module.exports = {
  renderCreate: (req, res) => {
    return res.render('tournament/createTournament');
  },

  createNewTournament: (req, res) => {
    let name = req.body.name;
    let logo = req.body.logo;
    let info = req.body.info;
    let team = req.body.teamArray;
    let type = req.body.type;
    //TODO validate input

    let data = {
      name: name,
      info: info,
      team: team.split(',').map(function(x){return {team_id: x}}),
      type: type
    }
    if(logo){
      data.logo = logo;
    }
    tournamentService.createNewTournament(data, (err, result) => {
      console.log(err);
      console.log(result);
      if(err){
        req.flash('error', { msg: 'An error when create new tournament!' });
        return res.redirect('/tournament/create');
      }
      req.flash('success', { msg: 'Create new tournament successfully.' });
      return res.redirect('/tournament/create');
    });
  },

  renderListTournament: (req, res) => {
    tournamentService.getAll((err, results) => {
      if(err){
        //TODO hanfle error
      }
      res.render('tournament/listTournament', {list: results});
    })
  },

  renderScore: (req, res) => {
    let slug = req.params.slug;
    let host = req.get('host');
    let path = host.split('.');
    path[0] = 'livescore';
    let newUrl = path.join('.');
    return res.redirect('http://'+newUrl+'/'+slug);
  },

  renderUpdate: (req, res) => {
    let tournamentId = req.params.id;
    tournamentService.getByIdPopulateTeam(tournamentId, (err, result) => {
      if(err){
        //TODO handle error and return
      }
      if(!result){
        // TODO handle and return err
      }
      console.log(result);
      return res.render('tournament/editTournament', {tournament: result});
    })
  },

  editTournament: (req, res) => {
    let tournamentId = req.params.tournamentId;

    let name = req.body.name;
    let type = req.body.type;
    let info = req.body.info;
    let score = req.body.score;
    let team = req.body.team;
    let logo = req.body.logo;
    // TODO validate input

    let data = {
      name: name,
      logo: logo,
      info: info,
      type: type,
      team: score instanceof Array ? score.map((x, index)=> {return {
        team_id: team[index],
        score: Number(x)
      }}) : {
        team_id: team,
        score: score
      }
    }
    console.log("=======================");
    console.log(data);
    tournamentService.updateTournamentData(tournamentId, data, (err, result)=> {
      console.log(err);
      console.log(result);
      if(err){
        req.flash('error', { msg: 'An error when update tournament!' });
        return res.redirect('/tournament/edit/' + tournamentId);
      }
      req.flash('success', { msg: 'Update tournament successfully.' });
      return res.redirect('/tournament/edit/' + tournamentId);
    })
  }
}