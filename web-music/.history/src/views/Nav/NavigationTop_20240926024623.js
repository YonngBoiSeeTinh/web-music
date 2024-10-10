import React from "react";
import { Link } from "react-router-dom";
import './NavigationTop.css'

class Navigation extends React.Component {
    render() {
        return (
            <div className="sub-menu">
                <div className="sub-menu-1">
                        <Link className="" to="/">
                                <div className="logo">

                                </div>
                            </Link>
                    <ul className="lst-menu">
                        
                        <li>
                            <Link to="/discovery">Khám Phá</Link>
                        </li>
                        <li>
                            <Link to="/songs">Bài Hát</Link>
                        </li>
                        <li>
                            <Link to="/ranking">BXH</Link>
                        </li>
                        <li>
                            <Link to="/top100">Top 100</Link>
                        </li>
                        <li>
                            <Link to="/more">...</Link>
                        </li>
                    </ul>
                </div>
                <div className="sub-menu-2">
                    <ul className="lst-menu">
                        <li>
                            <div className="search-bar">
                            <input 
                                    type="text" 
                                    placeholder="Tìm kiếm..." 
                                    className="search-input" 
                                    style={{ 
                                        border: 'none', 
                                        width: '100%', 
                                        height: '95%' ,
                                        padding: '0px 5px'
                                    }}
                            />
                            </div>
                        </li>
                        <li>
                            <Link to="/payment">Thanh toán</Link>
                        </li>
                        <li>
                            <Link to="/upload">Upload</Link>
                        </li>
                    </ul>
                </div>
                <div className="sub-menu-3">
                     <div style={{ display: 'none' }}>
                    <Link to="/account">Account</Link>
                    </div>
                    <div className="login">
                    <Link to="/Login">Đăng nhập</Link>
                    </div> 
                    <div className="register">
                    <Link to="/Register">Đăng ký</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navigation;
