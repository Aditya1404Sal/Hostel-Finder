import React from 'react';
import '../styles/HostelCard.css'; // You can style your card in this CSS file

const HostelCard = ({ hostel , onClick}) => {
  return (
    <main>
    <div className="card" onClick={onClick}>
            <div className="image">
                <img src={require('../images/images/Hostels/Hostel 1.jpg')} width="200px" alt="images"/>
            </div>
            <div className="title">
            <h1>{hostel.hostelName}</h1>
            </div>
            <div className="description">
              <p><span >{hostel.landmark}</span> </p>
              <p><span >{hostel.vacancy} Vacancies Available</span> </p>
            </div>
            </div>
            </main>
  ); 
};

export default HostelCard;