const mongoose = require('mongoose');

const SongSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  artist: {
    type: String,
    required: true
  },
  playlist: {
    type: String,
    required: true
  },
  type: {
    type: String, // Thể loại nhạc (pop, hip-hop, v.v.)
    required: true
  },
  releaseDate: {
    type: Date, // Ngày phát hành bài hát
    required: true
  },
  coverImage: {
    type: String // URL hoặc đường dẫn ảnh bìa
  },
  audioFile: {
    type: String, // URL hoặc đường dẫn file nhạc
    required: true
  },
  plays: {
    type: Number,
    default: 0 // Lượt nghe bài hát
  }
}, { timestamps: true });

module.exports = mongoose.model('Song', SongSchema);
