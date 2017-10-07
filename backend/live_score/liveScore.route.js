const express = require('express');
const router = express.Router();

const liveScoreController = require('./liveScore.controller');


router.get('/:slug', liveScoreController.renderScore);

module.exports = router;