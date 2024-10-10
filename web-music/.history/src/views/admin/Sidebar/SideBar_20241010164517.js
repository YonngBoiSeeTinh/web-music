import React from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { logout } from "../../../Service/UserService";
import { useDispatch } from 'react-redux';
import { resetUser } from "../../../Redux/sliders/userSlide";
import './sideBar.css'
const Sidebar = () => {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogOut = async () => {
    await logout();
    dispatch(resetUser());
    navigate('/');
};
  return (
    <aside className="sidebar">
      <ul className="nav">
        <li className="nav-title">MENU</li>
        <li className="nav-item">
          <Link to="/admin/dashboard" className="nav-link"><i className="fa fa-home"></i> Trang Chủ</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/products" className="nav-link"><i className="fa fa-th-large"></i> Upload</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/customers" className="nav-link"><i className="fa fa-address-book-o"></i> Người dùng</Link>
        </li>   
        <li className="nav-item">
          <hr />
        </li>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={handleLogOut}>
            <i className="fa fa-arrow-left"></i> Đăng xuất (về Trang chủ)
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
