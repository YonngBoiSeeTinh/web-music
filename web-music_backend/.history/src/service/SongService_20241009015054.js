const Song = require("../model/SongModel");

const createSong = async (newSong) => {
    try {
        // Kiểm tra xem tên bài hát đã tồn tại chưa
        const existingSong = await Song.findOne({ title: newSong.title });
        if (existingSong) {
            return {
                status: 'FAILED',
                message: 'The Song title is already registered',
            };
        }

        // Tạo bài hát mới
        const createdSong = await Song.create(newSong);
        return {
            status: 'OK',
            message: 'Song created successfully',
            data: createdSong,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const updateSong = async (id, updatedData) => {
    try {
        const existingSong = await Song.findById(id);
        if (!existingSong) {
            return {
                status: 'FAILED',
                message: 'Song not found',
            };
        }

        // Cập nhật thông tin bài hát
        const updatedSong = await Song.findByIdAndUpdate(id, updatedData, { new: true });
        return {
            status: 'OK',
            message: 'Song updated successfully',
            data: updatedSong,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const getAllSongs = async (limit = 20, page = 0, sort, filter) => {
    try {
        let query = {};
        
        if (filter) {
            const label = filter[0];
            const value = filter[1];
            query = { [label]: { '$regex': value, '$options': 'i' } };
        }

        const totalSong = await Song.countDocuments(query); // Đếm bài hát theo điều kiện lọc (nếu có)

        let songsQuery = Song.find(query).limit(limit).skip(page * limit);
        
        if (sort) {
            const objectSort = {};
            objectSort[sort[0]] = sort[1];
            songsQuery = songsQuery.sort(objectSort);
        }

        const songs = await songsQuery;

        return {
            status: 'OK',
            message: 'Songs retrieved successfully',
            data: songs,
            total: totalSong,
            pageCurrent: Number(page) + 1,
            totalPage: Math.ceil(totalSong / limit),
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while retrieving songs',
            err: error.message,
        };
    }
};
const getDetailSong = async (id) => {
    try {
       
        let songsQuery = Song.find(id);
        const songs = await songsQuery;

        return {
            status: 'OK',
            message: 'Songs retrieved successfully',
            data: songs,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while retrieving songs',
            err: error.message,
        };
    }
};

const deleteSong = async (id) => {
    try {
        const deletedSong = await Song.findByIdAndDelete(id);
        if (!deletedSong) {
            return {
                status: 'FAILED',
                message: 'Song not found',
            };
        }

        return {
            status: 'OK',
            message: 'Song deleted successfully',
            data: deletedSong,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while deleting the Song',
            err: error.message,
        };
    }
};

module.exports = {
    createSong,
    updateSong,
    getAllSongs,
    deleteSong,
    getDetailSong
};
