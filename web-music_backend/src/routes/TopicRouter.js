const express = require("express");
const router= express.Router();
const TopicController = require('../controllers/TopicController');

router.post('/create', TopicController.createTopic);
router.put('/update/:id', TopicController.updateTopic);
router.get('/get', TopicController.getAllTopics);
router.delete('/delete/:id', TopicController.deleteTopic);
module.exports = router;