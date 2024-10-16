import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../main'
import { toast } from 'react-toastify'
import axios from 'axios'

const Navbar = () => {
  const [show,setShow]=useState(false);
  const {isAuthenticated,setIsAuthenticated} =useContext(Context);


  const handleLogout = async () => {
    await axios
      .get("http://localhost:4000/api/v1/user/patient/logout", {
        withCredentials: true,
      })
      .then((res) => {
        toast.success(res.data.message);
        setIsAuthenticated(false);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const navigateTo = useNavigate ();

  const goToLogin = () => {
    navigateTo("/login");
  };


  return (
    <nav className='container'>
      <div className='logo'>CareConnect</div>
      <div className={show ? "navLinks showmenu": "navLinks"}>
        <div className="links">
        <Link to={"/"}>Home</Link>
        <Link to={"/appointment"}>Appointment</Link>
        <Link to={"/about"}>About Us</Link>
        </div>
        {!isAuthenticated ? (
            <button className="logoutBtn btn" onClick={handleLogout}>
              LOGOUT
            </button>
          ) : (
            <button className="loginBtn btn" onClick={goToLogin}>
              LOGIN
            </button>
          )}
      </div>
    </nav>
  )
}

export default Navbar