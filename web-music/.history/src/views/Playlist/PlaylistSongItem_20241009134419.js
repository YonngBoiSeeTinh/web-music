import React from 'react';
import './MessageBar.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faForwardFast, faVolumeHigh } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

const PlayListSongItem = ({song,setPlaySong}) => {
  return (
    <>
   
    <div className="message-bar  active" >
            <div className="signal-icon" />
            <span className="nameSong">{song.name}</span>
            <span className="artist">-{song.artist}</span>
            <div className="actions">
              <button className="action-button pause" onClick={setPlaySong}> <FontAwesomeIcon icon={faPlay}/></button>
              <button className="action-button favorite"></button>
              <button className="action-button download"></button>
              <button className="action-button copy"></button>
            </div>
        </div>
   
  
  </>  
    
  );
};

export default PlayListSongItem;
