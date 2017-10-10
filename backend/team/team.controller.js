const teamService = require('./team.service');

module.exports = {
  renderCreate: (req, res) => {
    return res.render('team/createTeam');
  },

  searchTeamByName: (req, res) => {
    let name = req.query.q;
    console.log("-------------------- " + name );
    
    //TODO validate name
    if(!name) return res.json([]);
    teamService.searchByName(name, 3, (err, results) => {
      if(err){
        console.log(err);
      }
      return res.json(results);
    })
  },

  renderListTeam: (req, res) => {
    teamService.getAll(30, 0, (err, results) => {
      if(err){

      }
      if(!results){

      }
      return res.render('team/listTeam', {teams: results});
    })
  },

  renderEditTeam: (req, res) => {
    let teamId = req.params.teamId;
    teamService.getById(teamId, (err, team) => {
      if(err){
        
      }
      if(!team){

      }
      console.log(team);
      return res.render('team/editTeam', {team: team});
    })
  },

  editTeam: (req, res) => {
    let teamId = req.params.teamId;
    let name = req.body.name;
    let info = req.body.info;
    let member = req.body.member;
    let logo = req.body.logo;
    console.log(teamId);
    let data = {
      name: name,
      logo: logo,
      info: info
    }

    if(member){
      data.member = member.split(',')
    }
    teamService.saveTeamData(teamId, data, (err, result) => {
      if(err){

      }
      if(err){
        req.flash('error', { msg: 'An error when edit team!' });
        return res.redirect('/team/edit/' + teamId);
      }
      req.flash('success', { msg: 'Edit team successfully.' });
      return res.redirect('/team/edit/' + teamId);
    })

  },

  createNewTeam: (req, res) => {
    let name = req.body.name;
    let info = req.body.info;
    let member = req.body.member;
    let logo = req.body.logo;

    let data = {
      name: name,
      logo: logo,
      info: info,
      member: member.split(',')
    }

    teamService.createNewTeam(data, (err, result) => {
      console.log(err);
      console.log(result);
      if(err){
        req.flash('error', { msg: 'An error when create new team!' });
        return res.redirect('/team/create');
      }
      req.flash('success', { msg: 'Create new team successfully.' });
      return res.redirect('/team/create');
    });
  }
}