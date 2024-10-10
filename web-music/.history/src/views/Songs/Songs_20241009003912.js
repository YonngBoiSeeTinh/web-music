import React from "react";
import SongItem from './SongItems'
import Ranking from '../home/Ranking'
import './song.css';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


const Songs =()=> {

    const fetchApi = async () => {
        try {
            const res = await axios.get(`http://localhost:3001/api/song/get`);
            console.log('API Response:', res.data); 
            return res.data.data; 
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    };
  

    const arrSong = query.data || [];

    const query = useQuery({ queryKey: ['song'], queryFn: fetchApi });
    
    if (query.isLoading) {
        return <div>Loading...</div>; 
    }

    if (query.isError) {
        return <div>Error fetching data: {query.error.message}</div>; 
    }
  
        return (
            <div className="songs-container">
            
            <div class="song-list">
            <h2>BÀI HÁT HOT NHẤT</h2>
            {arrSong.map((song, index)=>{
                <SongItem song={song} key={index}/>
            })}
              
            </div>
            <Ranking/>      
        </div>     
        );
    
}

export default Songs;
