import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode'; // Import chính xác
import Navigation from './Nav/NavigationTop';
import Home from './home/Home.js';
import Songs from './Songs/Songs.js'
import PlaylistSong from './Playlist/PlaylistSong.js';
import SongPlay from './Play-music/song-plays.js';
import UserPage from './User/UserPage.js';
import AdminLayout from './admin/AdminLayout.js';
import AdminDasboard from './admin/Dashboard/AdminDasboard.js';
import { isJsonString } from '../Service/ultils';
import { axiosJWT, GetDetailUser } from '../Service/UserService.js';
import { refresh_token } from '../Service/UserService';
import './style.css';
import { useDispatch } from 'react-redux';
import { updateUser } from '../Redux/sliders/userSlide';
import { useSelector } from 'react-redux';
import { useLocation, BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isSignIn, setIsSignIn] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  
  // Di chuyển logic này vào trong useEffect để tránh lỗi với useLocation
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  useEffect(() => {
    const result = handleDecode();
    if (result) {
      const { storageData, decode } = result;
      if (decode?.id) {
        handelGetDetailUser(decode.id, storageData);
      }
    }

    // Định nghĩa interceptor bên trong useEffect để tránh việc đăng ký nhiều lần
    axiosJWT.interceptors.response.use(
      async (config) => {
        const { storageData, decode } = handleDecode();
        const currentDate = new Date();
        if (decode?.exp < currentDate.getTime() / 1000) {
          const data = await refresh_token();
          config.headers['token'] = `Bearer ${data?.access_token}`;
          console.log('Token đã hết hạn, làm mới token:', data.access_token);
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }, []);

  const handleDecode = () => {
    let storageData = localStorage.getItem('accessToken');
    let decode = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decode = jwtDecode(storageData);
      return { decode, storageData };
    }
    return null;
  };

  const handelGetDetailUser = async (id, token) => {
    const res = await GetDetailUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    <BrowserRouter> {/* Di chuyển BrowserRouter ra ngoài cùng */}
      <div className="App">
        {!isAdminPage && <Navigation isSignIn={isSignIn} setIsSignIn={setIsSignIn} />}
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
      </div>
    </BrowserRouter>
  );
}

export default App;
