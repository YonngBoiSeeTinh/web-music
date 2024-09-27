import React from "react";
import './home.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from "react-router-dom";

const PlaylistItem = ({ topicValue }) => {  // Sử dụng destructuring props
    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/playlist/get?filter=topic&filter=${topicValue}`);
            console.log('API Response:', res.data); 
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };

    const query = useQuery({ queryKey: ['playlist', topicValue], queryFn: fetchApi });

    if (query.isLoading) {
        return <div>Loading...</div>;
    }

    if (query.isError) {
        return <div>Error fetching data: {query.error.message}</div>;
    }

    const arrPlaylist = query.data || [];

    return (
        <div className="topic-item_list">
            {arrPlaylist.map((topicItem, index) => (
                <Link to={`/playListSong/${topicItem.name}`}>
                    <div className="topic-item"key={index}> 
                    <div className="topic-item-img">
                       <img src={topicItem.coverImage} alt={topicItem.name} />
                    </div>
                    <div className="topic-item-name">
                        {topicItem.name}
                    </div>
                </div>
                </Link>
                
            ))}
        </div>
    );
};

export default PlaylistItem;
