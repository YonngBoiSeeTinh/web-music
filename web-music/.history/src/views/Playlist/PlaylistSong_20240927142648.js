import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faForwardFast, faVolumeHigh,faPause } from "@fortawesome/free-solid-svg-icons";
import PlayListSongItem from './PlaylistSongItem';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import '../Songs/song.css';

const PlayListSong = () => {  
    const { playlist } = useParams();
    const [currentSongIndex, setCurrentSongIndex] = useState(0); // Theo dõi bài hát hiện tại
    const [isPlaying, setIsPlaying] = useState(false); // Trạng thái theo dõi việc nhạc đang phát hay không

    const audioRef = useRef(null); // Tạo ref cho phần tử audio

    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/song/get?filter=playlist&filter=${playlist}`);
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const query = useQuery({ queryKey: ['playlist', playlist], queryFn: fetchApi });

    // Chờ dữ liệu từ API, không có điều kiện
    const arrSong = query.data || [];
    const songPlay = arrSong[currentSongIndex];

    // Thực hiện useEffect để cập nhật audio element và phát nhạc
    useEffect(() => {
        if (audioRef.current && songPlay && !isPlaying) {
            audioRef.current.src = songPlay.audioFile; // Gán nguồn cho audio element
            audioRef.current.play(); // Phát bài hát
            setIsPlaying(!isPlaying); // cap nhat trang thai dang phat
        }
    }, [songPlay]); // Chạy mỗi khi bài hát hiện tại thay đổi

    // Nếu đang tải hoặc có lỗi, trả về các thông báo
    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    if (query.isError) {
        return <div>Error fetching data: {query.error.message}</div>;
    }

    const playSong = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause(); // Tạm dừng nhạc nếu đang phát
                setIsPlaying(false); // Cập nhật trạng thái là tạm dừng
            } else {
                audioRef.current.play(); // Phát nhạc nếu đang tạm dừng
                setIsPlaying(true); // Cập nhật trạng thái là đang phát
            }
        }
    };

        const playNextSong = () => {
            const nextIndex = (currentSongIndex + 1) % arrSong.length; // Lặp lại từ đầu nếu hết bài
            audioRef.current.pause();
            setCurrentSongIndex(nextIndex); // Cập nhật bài hát hiện tại
            setIsPlaying(false);
        };

    return (
        <div className="song-play_container">
            <div className="left">
                {songPlay ? (
                    <div className="box-playing">
                        <div className="box-play-infor">
                            <div className="song-name">{songPlay.title}</div>
                            <div className="song-artist">{songPlay.artist}</div>
                        </div>
                        <div className="box-playing_container">
                            <div></div>
                            <div className="box-img">
                                <img src={songPlay.coverImage} alt={songPlay.title} />
                            </div>
                            <div className="box-seekbar"></div>
                            <div className="box-action">
                                <div className="box-action-left">
                                    <div className="song-action_item" onClick={playSong}>
                                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                                    </div>
                                    <div className="song-action_item" onClick={playNextSong}>
                                        <FontAwesomeIcon icon={faForwardFast} />
                                    </div>
                                </div>
                                <div className="box-action-right ">
                                    <div className="song-action_item">
                                        <div className="render">128kps</div>
                                    </div>
                                    <div className="song-action_item">
                                        <FontAwesomeIcon icon={faVolumeHigh} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Phần tử audio để phát nhạc */}
                        <audio ref={audioRef} controls hidden /> {/* hidden để ẩn audio element */}
                    </div>
                ) : (
                    <div className="box-playing">
                        <h1>Không có bài hát nào được chọn.</h1>
                    </div>
                )}
                <div className='song-playlist_list'>
                    <PlayListSongItem arrSong={arrSong} />
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

export default PlayListSong;