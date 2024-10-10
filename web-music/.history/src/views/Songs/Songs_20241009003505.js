import React from "react";
import SongItem from './SongItems'
import Ranking from '../home/Ranking'
import './song.css';


const Songs =()=> {


  
        return (
            <div className="songs-container">
            
            <div class="song-list">
            <h2>BÀI HÁT HOT NHẤT</h2>
                <SongItem arrSong ={this.props.arrSong}/>
            </div>
            <Ranking/>      
        </div>     
        );
    
}

export default Songs;
