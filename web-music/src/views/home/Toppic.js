import React from "react";
import './home.css';
import PlaylistItem from './TopicItem';

function Toppic({ arrTopic }) {
    return (
        <div className="topic">  
            {arrTopic.map((topic, index) => (
                <div key={index}>
                    <div id="topic-name">{topic.name}</div>
                    <PlaylistItem topicValue={topic.value} /> 
                </div>
            ))}     
        </div>
    );
}

export default Toppic;
