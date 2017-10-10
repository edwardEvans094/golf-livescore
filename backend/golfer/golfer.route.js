const express = require('express');
const router = express.Router();

const golferController = require('./golfer.controller');


router.get('/create', golferController.renderCreate);

router.get('/search-name', golferController.searchGolferName);

router.get('/search-in-team/:teamId', golferController.searchGolferInTeam);

router.get('/edit/:id', golferController.renderEdit);

router.get('/list', golferController.renderListUser);

router.post('/edit/:id', golferController.editGolfer);

router.post('/create', golferController.createGolfer);

module.exports = router;