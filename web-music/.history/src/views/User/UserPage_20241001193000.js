import React from "react";
import './userPage.css';
import { logout } from "../../Service/UserService";
import { useNavigate } from 'react-router-dom';

function UserPage ({setIsSignIn}){
    const navigate = useNavigate();
    const handleLogOut =()=>{
         logout();
        setIsSignIn(false);
        navigate('/');
    }

    return(
        <div style = {{margin:'40px'}}>
            <div className="user-page">
                <div className="user-profile">
                    <div className="avatar-section">
                        <img src="https://via.placeholder.com/150" alt="User Avatar" className="user-avatar"/>
                    </div>
                    <div className="user-info">
                        <h1 className="user-name">John Doe</h1>
                        <p className="user-email">johndoe@example.com</p>
                        <p className="user-role">Role: Admin</p>
                        <div className="user-action">
                            <button className="edit-profile-btn">Chỉnh sửa tài khoản</button>
                            <button className="logout-btn"
                             onClick={() => handleLogOut()}
                            >
                                Đăng xuất
                                
                            </button>
                        </div>
                       
                    </div>
                </div>

                <div className="account-details">
                    <h2>Thông tin tài khoản</h2>
                    <div className="account-table">
                        <div className="account-table_row">
                            <div className="table_row-header" >Ngày tạo tài khoản:</div>
                            <div className="table_row-infor">01/01/2023</div>
                        </div>
                        <div className="account-table_row">
                            <div className="table_row-header">Số điện thoại:</div>
                            <div className="table_row-infor">+1234567890</div>
                        </div >
                        <div className="account-table_row">
                            <div className="table_row-header">Địa chỉ:</div>
                            <div className="table_row-infor">123 Street, City, Country</div>
                        </div>
                        <div className="account-table_row"> 
                            <div className="table_row-header"> Số đơn hàng đã thực hiện:</div>
                            <div className="table_row-infor">15</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )

}

export default UserPage;