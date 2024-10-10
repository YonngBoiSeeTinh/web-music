import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './song-play.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faForwardFast, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const SongPlay = () => {
    const { id } = useParams(); // lấy id từ URL
    const [currentSongIndex, setCurrentSongIndex] = useState(-1); // -1 để chỉ bài hát đầu tiên từ getDetail API
    const [isPlaying, setIsPlaying] = useState(false); // theo dõi trạng thái phát nhạc
    const audioRef = useRef(null); // tạo ref cho phần tử audio

    // API để lấy danh sách bài hát trong playlist
    const fetchApiSong = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/song/get`);
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const querySong = useQuery({ queryKey: ['playlist'], queryFn: fetchApiSong });

    // Lấy dữ liệu từ API getDetail theo id
    const fetchApiDetail = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/song/getDetail/${id}`);
            console.log('API Response:', res.data); 
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
  
    const queryDetail = useQuery({ queryKey: ['song', id], queryFn: fetchApiDetail });

    // Dữ liệu từ các API
    const arrSong = querySong.data || [];
    const songDetail = queryDetail.data; 
    const songPlay = currentSongIndex === -1 ? songDetail : arrSong[currentSongIndex]; // nếu currentSongIndex = -1 thì lấy từ getDetail

    useEffect(() => {
        if (audioRef.current && songPlay && !isPlaying) {
            audioRef.current.src = songPlay.audioFile; // gán nguồn audio
            audioRef.current.play(); // phát nhạc
            setIsPlaying(true); // cập nhật trạng thái đang phát
        }
    }, [songPlay]);

    // Nếu đang tải hoặc có lỗi, trả về các thông báo
    if (queryDetail.isLoading || querySong.isLoading) {
        return <div>Loading...</div>;
    }

    if (queryDetail.isError || querySong.isError) {
        return <div>Error fetching data: {queryDetail.error?.message || querySong.error?.message}</div>;
    }

    const playSong = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause(); // tạm dừng nhạc nếu đang phát
                setIsPlaying(false); // cập nhật trạng thái là tạm dừng
            } else {
                audioRef.current.play(); // phát nhạc nếu đang tạm dừng
                setIsPlaying(true); // cập nhật trạng thái là đang phát
            }
        }
    };

    const playNextSong = () => {
        const nextIndex = (currentSongIndex + 1) % arrSong.length; // lặp lại từ đầu nếu hết bài
        audioRef.current.pause();
        setCurrentSongIndex(nextIndex); // cập nhật bài hát hiện tại
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
