
const TopicService = require("../service/TopicService");

const createTopic = async (req, res) => {
    try {
        const response = await TopicService.createTopic(req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const updateTopic = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await TopicService.updateTopic(id, req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const getAllTopics = async (req, res) => {
   
    try {
        const {page,limit,sort,filter } = req.query
        const response = await TopicService.getAllTopics(Number(limit)||8 , Number(page)||0,sort,filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving Topics',
            err: error.message,
        });
    }
};

const deleteTopic = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await TopicService.deleteTopic(id);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

module.exports = {
    createTopic,
    updateTopic,
    getAllTopics,
    deleteTopic,
};
