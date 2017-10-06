const express = require('express');
const router = express.Router();

const tournamentController = require('./tournament.controller');


router.get('/create', tournamentController.renderCreate);

router.get('/list', tournamentController.renderListTournament);

router.get('/score/:tournamentId', tournamentController.renderScore);

router.get('/edit/:id', tournamentController.renderUpdate);

router.post('/create', tournamentController.createNewTournament);
module.exports = router;