const express = require('express');
const { getMenuItemes } = require('../controllers/userMenuController');

const router = express.Router();

router.get("/:id", getMenuItemes);

module.exports = router;