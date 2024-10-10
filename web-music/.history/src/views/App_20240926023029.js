import Navigation from './Nav/NavigationTop';
import Home from './home/Home.js';
import Songs from './Songs/Songs.js'
import PlaylistSong from './Playlist/PlaylistSong.js';
import SongPlay from './Play-music/song-plays.js';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

        const arrSong = [
          { id: 'song1', title: 'ANH EM GOI LA CO MAT NGAY', artist: 'Duc Phuc' ,playlist:'anhtraisayhi'},
          { id: 'song2', title: 'VU NO LON', artist: 'MCK',playlist:'rapviet' },
          { id: 'song3', title: '3107 id 072019', artist: 'W/n ft 267',playlist:'lofi' }
      ];      
  return (
  
    <BrowserRouter>
      <div className="App" >
        <Navigation />
        
        <div style={{ marginTop: '120px' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/songs' element={<Songs arrSong={arrSong}/>} />      
          <Route path='/song_play/:id' element={<SongPlay />} /> 
          <Route path='/playListSong/:playlist' element={<PlaylistSong />} /> 
         
        </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
