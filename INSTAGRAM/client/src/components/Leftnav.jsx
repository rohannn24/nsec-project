import React from 'react'
import logo from '../pages/img/logo.png'
import './Leftnav.css'
import {Link, useNavigate} from 'react-router-dom'
import Addphoto from './Addphoto'

const Leftnav = () => {
    const Navigate = useNavigate();
    const handleClick = () => {
        const uploadBox = document.querySelector('.uploading-popup-card');
        uploadBox.style.display = 'flex'
    }
    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        Navigate('/');
    }
    return (
        <>
            <section className="left-nav">
                <div className="upper-sec">
                    <img src={logo} alt="" />
                    <ul className="side-nav-list">
                        <Link to ='/'><li className="snl-items"><i className="fa-solid fa-house"></i><span>Home</span></li></Link>
                        <Link to ='/'><li className="snl-items"><i className="fa-solid fa-magnifying-glass"></i><span>Search</span></li></Link>
                        <Link to ='/'><li className="snl-items"><i className="fa-regular fa-compass"></i><span>Explore</span></li></Link>
                        <Link to ='/'><li className="snl-items"><i className="fa-solid fa-video"></i><span>Reels</span></li></Link>
                        <Link to ='/'><li className="snl-items"><i className="fa-solid fa-message"></i><span>Messages</span></li></Link>
                        <Link to ='/'><li className="snl-items"><i className="fa-regular fa-heart"></i><span>Notifications</span></li></Link>
                        <li className="snl-items" onClick={handleClick}><i className="fa-solid fa-circle-plus"></i><span>Create</span></li>
                        <Link to ='/profile'><li className="snl-items"><i className="fa-solid fa-user"></i><span>Profile</span></li></Link>
                    </ul>
                </div>
                <div className="lower-sec">
                <ul className="side-nav-list">
                        <li className="snl-items"><i className="fa-brands fa-threads"></i><span>Threads</span></li>
                        <li className="snl-items" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket" style={{color: 'red'}}></i><span style={{color: 'red'}}>Logout</span></li>
                    </ul>
                </div>
            </section>
            <Addphoto/>
        </>
    )
}

export default Leftnav