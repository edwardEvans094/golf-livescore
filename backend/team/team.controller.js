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

  createNewTeam: (req, res) => {
    let name = req.body.name;
    let info = req.body.name;
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