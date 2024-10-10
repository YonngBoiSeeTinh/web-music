import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar/SideBar'; // Import Sidebar
import './adminStyle.css';

const AdminLayout = ({ isAdmin }) => {
  return (
    <>
      {isAdmin ? (
        <div className="admin-layout">
          <Sidebar /> {/* Hiển thị Sidebar */}
          <main className="main-content">
            <Outlet /> {/* Đây là nơi mà các route con sẽ được render */}
          </main>
        </div>
      ) : (
        <h1 className='notify'>You do not have access to this page.</h1> 
      )}
    </>
  );
};

export default AdminLayout;
