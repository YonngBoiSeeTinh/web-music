const Topic = require("../model/TopicModel");

const createTopic = async (newTopic) => {
    try {
       
        const existingTopic = await Topic.findOne({ name: newTopic.name });
        if (existingTopic) {
            return {
                status: 'FAILED',
                message: 'The Topic name is already registered',
            };
        }

        const createdTopic = await Topic.create(newTopic);
        return {
            status: 'OK',
            message: 'Topic created successfully',
            data: createdTopic,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const updateTopic = async (id, updatedData) => {
    try {
        const existingTopic = await Topic.findById(id);
        if (!existingTopic) {
            return {
                status: 'FAILED',
                message: 'Topic not found',
            };
        }

        // Cập nhật thông tin bài hát
        const updatedTopic = await Topic.findByIdAndUpdate(id, updatedData, { new: true });
        return {
            status: 'OK',
            message: 'Topic updated successfully',
            data: updatedTopic,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred',
            err: error.message,
        };
    }
};

const getAllTopics = async (limit = 20, page = 0, sort, filter) => {
    try {
        let query = {};
        
        if (filter) {
            const label = filter[0];
            const value = filter[1];
            query = { [label]: { '$regex': value, '$options': 'i' } };
        }

        const totalTopic = await Topic.countDocuments(query); // Đếm bài hát theo điều kiện lọc (nếu có)

        let TopicsQuery = Topic.find(query).limit(limit).skip(page * limit);
        
        if (sort) {
            const objectSort = {};
            objectSort[sort[0]] = sort[1];
            TopicsQuery = TopicsQuery.sort(objectSort);
        }

        const Topics = await TopicsQuery;

        return {
            status: 'OK',
            message: 'Topics retrieved successfully',
            data: Topics,
            total: totalTopic,
            pageCurrent: Number(page) + 1,
            totalPage: Math.ceil(totalTopic / limit),
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while retrieving Topics',
            err: error.message,
        };
    }
};

const deleteTopic = async (id) => {
    try {
        const deletedTopic = await Topic.findByIdAndDelete(id);
        if (!deletedTopic) {
            return {
                status: 'FAILED',
                message: 'Topic not found',
            };
        }

        return {
            status: 'OK',
            message: 'Topic deleted successfully',
            data: deletedTopic,
        };
    } catch (error) {
        return {
            status: 'ERROR',
            message: 'An error occurred while deleting the Topic',
            err: error.message,
        };
    }
};

module.exports = {
    createTopic,
    updateTopic,
    getAllTopics,
    deleteTopic,
};
