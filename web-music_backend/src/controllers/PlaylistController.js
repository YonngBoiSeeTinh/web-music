
const PlaylistService = require("../service/PlaylistService");

const createPlaylist = async (req, res) => {
    try {
        const response = await PlaylistService.createPlaylist(req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const updatePlaylist = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await PlaylistService.updatePlaylist(id, req.body);
        return res.status(response.status === 'OK' ? 200 : 400).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'Internal server error',
            err: error.message,
        });
    }
};

const getAllPlaylists = async (req, res) => {
   
    try {
        const {page,limit,sort,filter } = req.query
        const response = await PlaylistService.getAllPlaylists(Number(limit)||8 , Number(page)||0,sort,filter);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            status: 'ERROR',
            message: 'An error occurred while retrieving Playlists',
            err: error.message,
        });
    }
};

const deletePlaylist = async (req, res) => {
    const { id } = req.params; // Lấy ID từ params
    try {
        const response = await PlaylistService.deletePlaylist(id);
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
    createPlaylist,
    updatePlaylist,
    getAllPlaylists,
    deletePlaylist,
};
