const express = require('express');
const controller = require('../controllers/reflectedController');

const router = express.Router();

router.get('/', controller.redirectToDefaultLevel);
router.get('/:levelSlug', controller.showReflectedPageBySlug);

module.exports = router;
