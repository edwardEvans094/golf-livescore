const express = require('express');
const subdomain = require('express-subdomain');
const router = express.Router();
// const app = express();
const contactRoute = require('../contact/contact.route');
const homeRoute = require('../home/home.route');
const userRoute = require('../user/user.route');
const golferRoute = require('../golfer/golfer.route');
const matchRoute = require('../match/match.route');
const tournamentRoute = require('../tournament/tournament.route');
const teamRoute = require('../team/team.route');

const liveScoreRoute = require('../live_score/liveScore.route');

const publicGetRoute = require('./public.get.route');
const publicPostRoute = require('./public.post.route');

module.exports = (app) => {
  if(publicGetRoute && publicGetRoute.length){
    app.use(publicGetRoute, (req, res, next) => {
      //allow ajax cross domain
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
      res.header("Access-Control-Max-Age", "3600");
      res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      next();
    });
  }
  
  if(publicPostRoute && publicPostRoute.length){
    app.use(publicPostRoute, (req, res, next) => {
      //allow ajax cross domain
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
      res.header("Access-Control-Max-Age", "3600");
      res.header("Access-Control-Allow-Headers", "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
      next();
    });
  }


  // app.use(homeRoute);
  // app.use(userRoute);
  // app.use(contactRoute);
  // app.use(golferRoute);
  // app.use(matchRoute);
  // app.use(tournamentRoute);
  // app.use(teamRoute);
  router.use('/', homeRoute);
  router.use('/user', userRoute);
  router.use('/contact', contactRoute);
  router.use('/golfer', golferRoute);
  router.use('/match', matchRoute);
  router.use('/tournament', tournamentRoute);
  router.use('/team', teamRoute);

  app.use(subdomain('cms', router));
  

  app.use(subdomain('livescore', liveScoreRoute));
}
