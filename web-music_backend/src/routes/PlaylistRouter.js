const express = require("express");
const router= express.Router();
const PlaylistController = require('../controllers/PlaylistController');

router.post('/create', PlaylistController.createPlaylist);
router.put('/update/:id', PlaylistController.updatePlaylist);
router.get('/get', PlaylistController.getAllPlaylists);
router.delete('/delete/:id', PlaylistController.deletePlaylist);
module.exports = router;