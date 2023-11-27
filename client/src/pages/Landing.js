import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/LandingStyle.css'
import HostelCard from '../components/HostelCard';
import axios from 'axios'
import { Form, Input } from 'antd';
import { useState } from 'react';

const Landing = () => {
    const [hostelData , setHostelData] = useState([]);
    const [pin, setSearch] = useState("");

      const handleSubmit = () => {
        getPinCodeSpecificHostels(pin);
      };

    const getPinCodeSpecificHostels = async(pincode) => {
        try {
            const res = await axios.post('/api/v1/user/getPinCodeSpecificHostels',{ pin: pincode });
            if(res.data.success){
                setHostelData(res.data.data);
            }

        } catch (error) {
            console.log(error);
        }
    }
    const navigate = useNavigate();

    const NavToLogin = async() => {
        try {
            navigate('/Login')
        } catch (error) {
            console.log(error)
        }
    }

    const CardOnClickHandler = (hostelId) => {
        navigate(`/Details/${hostelId}`);
    };

    const NavToRegister = () => {
        try {
            navigate('/Register')
        } catch (error) {
            console.log(error)
        }
    }
    

  return (
    <>
    <header>
		<div className="navbar">
            <div>
                <a href='/'><img src={require('../images/Logo.png')} alt="" width="90px" height="45px"/></a>
            </div>
            <div className="nav-search">
                
                <div className="search-bar">
                    <Form className="search-box" onFinish={handleSubmit}>
                        <input placeholder="Search By Pincode" className="search-input" value={pin} onChange={(e) => setSearch(e.target.value)}/>
                        <button className="btn btn-common" id="searchbtn" type='submit'>Search</button>  
                    </Form>
                </div>
                
            </div>
            <div className="nav-button">
                <button className="btn white-btn" id="loginBtn" onClick={NavToLogin}>Login</button>
            </div>
            <div className="nav-button">
                <button className="btn white-btn" id="loginBtn" onClick={NavToRegister}>Register</button>
            </div>
        </div>
	</header>
    <body>
    <div className="slider">
            <div className="intro"><h2>Rooms On Rent In Your <span >Budget.</span></h2></div>
            <div className="ima">
                <img className='roomImg' src={require('../images/HotelRooms.png')}/>
            </div>
        </div>
        <div className="des"><p>At Hostel Hub we belive in creating a home away from home.Nested in Kolhapur,we offer a heaven for <span > students</span> seeking comfort,convenience,and a touch of local charm.</p></div>
        {
            hostelData && (
              <div className="DataView">
              {hostelData.map((hostel) => (
                <div className="column"> 
                  <HostelCard  
                    key={hostel._id} 
                    hostel={hostel} 
                    onClick={() => CardOnClickHandler(hostel._id)}
                  />
                </div>  
              ))}
            </div>
            )
            } 
        
    </body>
    <footer>
    <div className="vessel">
      <div className="wrapper">
        <div className="footer-widget">
          <a href="/">
            <img src={require('../images/Logo.png')} width="150px" className="logo" />
          </a>
          
        </div>
        <div className="footer-widget">
            <h6>Reach Us</h6>
            <hr className="line"/>
          <ul className="links">
            <li><a href="#">FAQ</a></li>
            <li><a href="#">TERMS AND CONDITIONS</a></li>
            <li><a href="#">PAYMENT INFO</a></li>
            <li><a href="#">CONTACT US</a></li>
          </ul>
      </div>
      <div className="footer-widget">
        <ul className="socials">
          <li>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </li>
        </ul>
        <div className="copyright-wrapper">
          <p>
            Designed and Developed by
            <a href="#" target="blank"> Hostel Hub</a>
          </p>
        </div>
      </div>
    </div>
    </div>
    </footer>
    </>
  )
}

export default Landing