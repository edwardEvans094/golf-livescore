const express = require('express');
const router = express.Router();

const matchController = require('./match.controller');


router.get('/create/:tournamentId', matchController.renderCreate);

router.get('/update-score/:matchId', matchController.renderUpdateScore);

router.get('/list/:tournamentId', matchController.renderListMatch);

router.get('/edit/:id', matchController.renderEdit);

router.post('/edit/:id', matchController.editMatch);

router.post('/create/:tournamentId', matchController.createNewMatchInTournament);

router.post('/update-score/:matchId', matchController.updateScore);
module.exports = router;