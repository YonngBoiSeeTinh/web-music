const mongoose = require('mongoose');

const PlaylistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  topic: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ""
  },
  coverImage: {
    type: String // URL hoặc đường dẫn ảnh bìa của playlist
  },

  creator: {
    type: String, // Tên người tạo playlist
    required: true
  },
  likes: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Playlist', PlaylistSchema);
