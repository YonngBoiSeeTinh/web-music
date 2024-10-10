const express = require("express");
const router= express.Router();
const SongController = require('../controllers/SongController');

router.post('/create', SongController.createSong);
router.put('/update/:id', SongController.updateSong);
router.get('/get', SongController.getAllSongs);
router.delete('/delete/:id', SongController.deleteSong);
module.exports = router;