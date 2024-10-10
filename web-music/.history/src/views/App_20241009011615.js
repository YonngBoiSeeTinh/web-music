import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 

import Navigation from './Nav/NavigationTop';
import Home from './home/Home.js';
import Songs from './Songs/Songs.js'
import PlaylistSong from './Playlist/PlaylistSong.js';
import SongPlay from './Play-music/song-plays.js';
import USerPage from './User/UserPage.js'


import AdminLayout from './admin/AdminLayout.js';
import AdminDasboard from './admin/Dashboard/AdminDasboard.js'


import { isJsonString } from '../Service/ultils';
import { axiosJWT, GetDetailUser } from '../Service/UserService.js';
import { refresh_token } from '../Service/UserService';
import './style.css'

import { useDispatch } from 'react-redux';
import { updateUser } from '../Redux/sliders/userSlide';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';


import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {

      const location = useLocation();
      const isAdminPage = location.pathname.startsWith('/admin');

      const [isSignIn, setIsSignIn] = useState(false);

      useEffect(() => { 
        const result = handleDecode();
        if (result) {
            const { storageData, decode } = result;       
            if (decode?.id) {
                try {
                    handelGetDetailUser(decode.id, storageData);
                } catch (error) {
                    console.error('Lỗi khi tải chi tiết người dùng:', error);
                }
            }
        }
        }, []);
    
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

      const user = useSelector((state) => state.user)
  return (
    <div className="App">
    {/* Kiểm tra trang Admin để hiển thị Navigation */}
    {!isAdminPage && <Navigation isSignIn={isSignIn} setIsSignIn={setIsSignIn} />}
    
    <BrowserRouter>
      <div className="main-container">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/songs' element={<Songs />} />      
          <Route path='/song_play/:id' element={<SongPlay />} /> 
          <Route path='/playListSong/:playlist' element={<PlaylistSong />} /> 
          <Route path='/userPage' element={<UserPage setIsSignIn={setIsSignIn} />} /> 

          {/* Chỉ render trang admin khi user.isAdmin là true */}
          <Route path='/admin/' element={user?.isAdmin ? <AdminLayout isAdmin={user.isAdmin} /> : <Navigate to="/" />}>
            <Route index element={<AdminDasboard />} /> 
            <Route path='dashboard' element={<AdminDasboard />} /> 
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  );
}

export default App;
