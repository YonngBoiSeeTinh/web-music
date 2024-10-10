import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCopy } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-regular-svg-icons";
import { useNavigate } from 'react-router-dom';

const SongItem = ({ song }) => {  // Nhận props từ component cha
    const navigate = useNavigate();  // Sử dụng useNavigate để điều hướng
    const handleSongClick = (song) => {
        navigate(`/song_play/${song.id}`);
    };

    return (
        <div>
            <div key={song.id} className="song-items">
                <img className="song song-img" src={song.coverImage}/>
                <div className="song song-infor" onClick={() => handleSongClick(song)}>
                    <div className="song song-infor_name">{song.title}</div>
                    <div className="song song-infor_artist">{song.artist}</div>
                </div>
                <div className="song-mark">
                    <span className="icon-tag-official" title="Bản Chính Thức">Official</span>
                    <span className="icon-tag-hd" title="High Quality (Chất Lượng Cao)">HQ</span>
                </div>
                <div className="song-action">
                    <div className="song-action_item"><FontAwesomeIcon icon={faPlay} /></div>
                    <div className="song-action_item"><FontAwesomeIcon icon={faHeart} /></div>
                    <div className="song-action_item"><FontAwesomeIcon icon={faCopy} /></div>
                </div>
            </div>
        </div>
    );
}

export default SongItem;
