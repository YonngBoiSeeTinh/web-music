import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 

import Navigation from './Nav/NavigationTop';
import Home from './home/Home.js';
import Songs from './Songs/Songs.js'
import PlaylistSong from './Playlist/PlaylistSong.js';
import SongPlay from './Play-music/song-plays.js';
import USerPage from './User/UserPage.js'

import { isJsonString } from '../Service/ultils';
import { axiosJWT, GetDetailUser } from '../Service/UserService.js';
import { refresh_token } from '../Service/UserService';
import 'style.css'

import { useDispatch } from 'react-redux';
import { updateUser } from '../Redux/sliders/userSlide';


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
      
      const [isSignIn, setIsSignIn] = useState(false);

      useEffect(()=>{ 
       
          const {storageData, decode} =  handleDecode();       
            if(decode?.id){
                try {
                     handelGetDetailUser(decode.id, storageData);

                } catch (error) {
                    console.error('Lỗi khi tải chi tiết người dùng:', error);
                }
            }
      
      },[])
    
      const handleDecode =()=>{
        let storageData =  localStorage.getItem('accessToken');
        let decode = {}
        if(storageData && isJsonString(storageData)){
          
            storageData = JSON.parse(storageData)
            decode = jwtDecode(storageData)
            return {decode, storageData}
        }
      }
      axiosJWT.interceptors.response.use(function (config) {
        const {storageData, decode} =  handleDecode();
        const currentDate = new Date();
        if(decode?.exp < currentDate.getTime()/1000) { //mls
          
          const data =  refresh_token();
          config.headers['token'] = `Bearer ${data?.access_token}`
          console.log('het han accesstoken:',data.access_token);
        }
        return config;
      }, function (error) {
       
        return Promise.reject(error);
      });
    
      const dispatch = useDispatch();
      const handelGetDetailUser = async (id, token) =>{
          const res = await GetDetailUser(id, token)
        
          dispatch(updateUser({ ...res?.data, access_token: token })); 
         
    
      }
  return (
  
    <BrowserRouter>
      <div className="App" >
        <Navigation isSignIn={isSignIn} setIsSignIn={setIsSignIn} />
        
        <div style={{ marginTop: '120px' }}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/songs' element={<Songs arrSong={arrSong}/>} />      
          <Route path='/song_play/:id' element={<SongPlay />} /> 
          <Route path='/playListSong/:playlist' element={<PlaylistSong />} /> 
          <Route path='/userPage' element={<USerPage setIsSignIn={setIsSignIn} />} /> 
        </Routes>
      </div>
      </div>
    </BrowserRouter>
  );
}

export default App;