import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import "../styles/HostelInfoPage.css"

function HostelInfoPage() {
   const {hostel_id} = useParams();
   const [hostel,setHostel] = useState(null);
   const navigate = useNavigate();
   const getParticularHostelsDetails = async() => {
    try {
      const res = await axios.post('/api/v1/user/getParticularHostelsDetails',{
        hostel_id:hostel_id
      });
      if(res.data.success){
        setHostel(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
   }
   const redirectToChat = async() => {
      navigate(`/Details/ws/${hostel_id}`);
   }
   const redirectToLogin = async() => {
    navigate(`/Login`);
 }
   useEffect(() => {
    getParticularHostelsDetails();
   },[]);
  return (
    <>
    {
      hostel && (
        <div className="full-page">
        <div className="navbar">
            <div>
                <a href='/'><img src={require('../images/Logo.png')} alt="" width="100px" /></a>
            </div>
            <div className="nav-search">
                <div className="search-bar">
                    <div className="search-box">
                        <input placeholder="Search Pincode" className="search-input" />
                        <button className="btn btn-common" id="searchbtn" onClick={() => document.location='hostelcards.html'}>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="nav-button">
                <button className="btn white-btn" id="loginBtn" onClick={redirectToLogin}>
                    Login
                </button>
            </div>
        </div>

        <div className="house-details">
            <div className="house-title">
                <h1>{hostel.hostelName}</h1>
                <div className="row">
                    <div>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                        <i className="far fa-star"></i>
                        <span>245 Reviews</span>
                    </div>
                    <div>
                        <p>{hostel.landmark}</p>
                    </div>
                </div>
            </div>
            <div className="gallery">
                <div className="gallery-img-1"><img src={require('../images/images/images/images/house-1.png')} alt="House 1" /></div>
                <div><img src={require('../images/images/images/images/house-2.png')} alt="House 2" /></div>
                <div><img src={require('../images/images/images/images/house-3.png')} alt="House 3" /></div>
                <div><img src={require('../images/images/images/images/house-4.png')} alt="House 4" /></div>
                <div><img src={require('../images/images/images/images/house-5.png')} alt="House 5" /></div>
            </div>
            <div className="small-details">
                <h2>Rooms Available: {hostel.vacancy}</h2>
                <p><span style={{ color: 'whitesmoke' }}> Sharing &nbsp; &nbsp; Triple Sharing &nbsp; &nbsp; Dormitory</span></p>
                <h4>{hostel.AnnualRent} INR Anually</h4>
                <h4><span style={{ color: 'whitesmoke' }}>Minimum stay: One year</span></h4>
            </div>
            <hr className="line" />

            <ul className="details-list">
                <li>Address
                    <span>{hostel.location}</span>
                </li>
                <li>Intake Capacity
                    <span>Total Intake: {hostel.totalOccupancy}</span>
                    <span>Available: {hostel.vacancy}</span>
                </li>
            </ul>

            <hr className="line" />
            <p className="home-desc">{hostel.description}</p>
            <hr className="line" />

            <div className="ame-res">
                <ul className="amenities">
                    <h4>Amenities</h4>
                    {hostel.hostelAmenities.map(amenity => <li key={amenity}>{amenity}</li>)}
                </ul>

                <ul className="restrictions">
                    <h4>Restrictions</h4>
                    {hostel.hostelRestrictions.map(amenity => <li key={amenity}>{amenity}</li>)}
                </ul>
            </div>

            <hr className="line" />

            <div className="host">
                <img src={require('../images/images/images/images/host.png')} alt="Host Image" />
                <div>
                    <h2>Hosted by {hostel.ownerName}</h2>
                    <p><span>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star"></i>
                        <i className="fas fa-star-half-alt"></i>
                    </span></p>
                    <p><span style={{ color: 'whitesmoke' }}>Contact: {hostel.phoneNumber}</span></p>
                    <p><span style={{ color: 'whitesmoke' }}>Email: DummyMail@gmail.com</span></p>
                </div>
            </div>
        </div>

        <footer>
            <div className="vessel">
                <div className="wrapper">
                    <div className="footer-widget">
                        <a href="/">
                            <img src={require('../images/Logo.png')} width="300px" className="logo" alt="Logo" />
                        </a>
                    </div>
                    <div className="footer-widget">
                        <h6>Reach Us</h6>
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
                        <ul className="links">
                            <li><a href="#">FAQ</a></li>
                            <li><a href="#">TERMS AND CONDITIONS</a></li>
                            <li><a href="#">PAYMENT INFO</a></li>
                            <li><a href="#">CONTACT US</a></li>
                        </ul>
                    </div>
                    <div className="copyright-wrapper">
                        <p>
                            Design and Developed by
                            <a href="#" target="blank">Hostel Hub</a>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    </div>
      )
    }
    </>
  )
}

export default HostelInfoPage