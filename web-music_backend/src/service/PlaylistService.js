const Playlist = require("../model/PlaylistModel");

const createPlaylist = async (newPlaylist) => {
    try {
       
        const existingPlaylist = await Playlist.findOne({ name: newPlaylist.name });
        if (existingPlaylist) {
            return {
                status: 'FAILED',
                message: 'The Playlist name is already registered',
            };
        }

        const createdPlaylist = await Playlist.create(newPlaylist);
        return {
            status: 'OK',
            message: 'Playlist created successfully',
            data: createdPlaylist,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const updatePlaylist = async (id, updatedData) => {
    try {
        const existingPlaylist = await Playlist.findById(id);
        if (!existingPlaylist) {
            return {
                status: 'FAILED',
                message: 'Playlist not found',
            };
        }

        // Cập nhật thông tin bài hát
        const updatedPlaylist = await Playlist.findByIdAndUpdate(id, updatedData, { new: true });
        return {
            status: 'OK',
            message: 'Playlist updated successfully',
            data: updatedPlaylist,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const getAllPlaylists = async (limit = 20, page = 0, sort, filter) => {
    try {
        let query = {};
        
        if (filter) {
            const label = filter[0];
            const value = filter[1];
            query = { [label]: { '$regex': value, '$options': 'i' } };
        }

        const totalPlaylist = await Playlist.countDocuments(query); // Đếm bài hát theo điều kiện lọc (nếu có)

        let PlaylistsQuery = Playlist.find(query).limit(limit).skip(page * limit);
        
        if (sort) {
            const objectSort = {};
            objectSort[sort[0]] = sort[1];
            PlaylistsQuery = PlaylistsQuery.sort(objectSort);
        }

        const Playlists = await PlaylistsQuery;

        return {
            status: 'OK',
            message: 'Playlists retrieved successfully',
            data: Playlists,
            total: totalPlaylist,
            pageCurrent: Number(page) + 1,
            totalPage: Math.ceil(totalPlaylist / limit),
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while retrieving Playlists',
            err: error.message,
        };
    }
};

const deletePlaylist = async (id) => {
    try {
        const deletedPlaylist = await Playlist.findByIdAndDelete(id);
        if (!deletedPlaylist) {
            return {
                status: 'FAILED',
                message: 'Playlist not found',
            };
        }

        return {
            status: 'OK',
            message: 'Playlist deleted successfully',
            data: deletedPlaylist,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while deleting the Playlist',
            err: error.message,
        };
    }
};

module.exports = {
    createPlaylist,
    updatePlaylist,
    getAllPlaylists,
    deletePlaylist,
};
