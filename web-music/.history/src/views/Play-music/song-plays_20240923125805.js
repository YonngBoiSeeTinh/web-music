import React from "react";
import { useLocation } from 'react-router-dom';
import './song-play.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faForwardFast, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";


const SongPlay = () => {
    const location = useLocation();
    const { song } = location.state || {};  // Đảm bảo có một giá trị mặc định

    if (!song) {
        return <div>Không có bài hát nào được chọn.</div>;
    }
    return (
        <div className="song-play_container">
            <div className="left">
                
                <div className="box-playing">
                    <div className="box-play-infor">
                        <div className="song-name">{song.title}</div>
                        <div className="song-artist">{song.artist}</div>
                    </div>
                    <div className="box-playing_container">
                        <div></div>
                        <div className="box-img"></div>
                        <div className="box-seekbar"></div>
                        <div className="box-action">
                            <div className="box-action-left">
                                <div className="song-action_item"><FontAwesomeIcon icon={faPlay} /></div>
                                <div className="song-action_item"> <FontAwesomeIcon icon={faForwardFast} /></div>
                            </div>
                            <div className="box-action-right">
                                <div className="song-action_item">
                                    <div className="render">
                                        128kps
                                    </div>
                                </div>
                                <div className="song-action_item">  <FontAwesomeIcon icon={faVolumeHigh} /></div>
                            </div>
                        </div>
                    </div>
                </div>
           
                <div className="song-play_action">
                    <div className="song-play_action-list">
                        <div className="item">Thêm vào</div>
                        <div className="item">Tải nhạc</div>
                        <div className="item">Chia sẻ</div>
                        <div className="item">Nhạc chờ</div>
                    </div>
                    
                </div>
                <div className="song-lyrics">
                    <div className="song-lyrics_infor">
                        <div className="">Lời bài hát: </div>   
                        <div className="">Nhạc sĩ: </div>
                        <div className="">Lời đăng bởi: </div>
                        <div className="lyrics">
                            <p className="lyrics-content"></p>
                        </div>
                        <div className="more-lyrics"></div>
                    </div>
                </div>
            </div>
            
            <div className="right">
                <div className="continue-box">
                   <p>NGHE TIẾP</p> 
                </div>
            </div>
        </div>
    );
}

export default SongPlay;
