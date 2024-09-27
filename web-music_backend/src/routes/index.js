const UserRouter = require('./UserRouter');
const SongRouter = require('./SongRouter');
const PlaylistRouter = require('./PlaylistRouter')
const TopicRouter = require('./TopicRouter')

const routes = (app) => {
    app.use('/api/user', UserRouter); // Gán đường dẫn /api/user cho UserRouter
    app.use('/api/song', SongRouter);
    app.use('/api/playlist', PlaylistRouter);
    app.use('/api/topic', TopicRouter);
};
module.exports = routes;
