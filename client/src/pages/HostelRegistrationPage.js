import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {Form, message} from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import FormItem from 'antd/es/form/FormItem';
import Input from 'antd/es/input/Input';
import axios from 'axios'
import "../styles/RegisterStyle.css"



function HostelRegistrationPage() {
    const { user_id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [amenities, setAmenities] = useState([]);
    const [newAmenity, setNewAmenity] = useState('');


    const [restrictions, setRestrictions] = useState([]);
    const [newRestriction, setNewRestriction] = useState('');


    const handleAddAmenity = (e) => {
      e.preventDefault();
      if (newAmenity.trim() !== '') {
        setAmenities([...amenities, newAmenity]);
        setNewAmenity('');
      }
    };
  
    const handleRemoveAmenity = (index) => {
      const updatedAmenities = amenities.filter((_, i) => i !== index);
      setAmenities(updatedAmenities);
    };

    //restrictions
    const handleAddRestriction = (e) => {
      e.preventDefault();
      if (newRestriction.trim() !== '') {
        setRestrictions([...restrictions, newRestriction]);
        setNewRestriction('');
      }
    };
  
    const handleRemoveRestriction = (index) => {
      const updatedRestrictions = restrictions.filter((_, i) => i !== index);
      setRestrictions(updatedRestrictions);
    };
    const OnFinishHandler = async(values) => {
      try {

        dispatch(showLoading());
        const formData = { ...values, owner_id: user_id, hostelAmenities: amenities, hostelRestrictions: restrictions };
        const res = await axios.post('/api/v1/user/RegisterHostel' , formData)
        dispatch(hideLoading());

        if(res.data.success){
          message.success('Registered your Hostel Successfully');
          navigate(`/Login`);
        }else{
          message.error(res.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error('Something went wrong');
      }
    }
  return (
    <body>
    <div className='form-container'>
  <Form layout='vertical' onFinish={OnFinishHandler} className="Register-form p-4">
    <h1>Hostel Register Form</h1>
    <FormItem label="Name of Hostel*" name="hostelName" >
      <Input type='text' required/>
    </FormItem>
    <FormItem label="Name of Owner*" name="ownerName" >
      <Input type='text' required/>
    </FormItem>
    <FormItem label="Address*" name="location" >
      <Input type='text' required/>
    </FormItem>
    <FormItem label="Landmark*" name="landmark" >
      <Input type='text' required/>
    </FormItem>
    <FormItem label="Description of your hostel*" name="description" >
      <Input type='text' required/>
    </FormItem>
    <FormItem label="Pincode*" name="pincode" >
      <Input type='text' pattern="[0-9]{6}" required/>
    </FormItem>
    <FormItem label="Wardens Phone Number*" name="phoneNumber" >
      <Input type='text' pattern="[0-9]{10}" required/>
    </FormItem>
    <FormItem label="Total Capacity for people*" name="totalOccupancy" >
      <Input type='text' required/>
    </FormItem>
    <FormItem label="Total Rooms*" name="totalRoom" >
      <Input type='text' required/>
    </FormItem>
    <FormItem label="Vacancy*" name="vacancy" >
      <Input type='text' required/>
    </FormItem>
    <FormItem label="People per room*" name="perRoomCount" >
      <Input type='text' required/>
    </FormItem>
    <FormItem label="Full Rooms available*" name="roomAvailable" >
      <Input type='text' required/>
    </FormItem>
    <FormItem label="Annual rent*" name="AnnualRent" >
      <Input type='text' required/>
    </FormItem>
    <FormItem label="Amenities">
          <div>
            <Input
              className='specific'
              type="text"
              value={newAmenity}
              onChange={(e) => setNewAmenity(e.target.value)}
            />
            <button className='buttun' onClick={(e) => { handleAddAmenity(e);}}>Add</button>
          </div>
          <ul>
            {amenities.map((amenity, index) => (
              <li key={index}>
                {amenity}{' '}
                <button className='buttunR' onClick={() => handleRemoveAmenity(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </FormItem>
        <FormItem label="Restrictions">
          <div>
            <Input
              className='specific'
              type="text"
              value={newRestriction}
              onChange={(e) => setNewRestriction(e.target.value)}
            />
            <button className='buttun' onClick={(e) => { handleAddRestriction(e); }}>Add</button>
          </div>
          <ul>
            {restrictions.map((restriction, index) => (
              <li key={index}>
                {restriction}{' '}
                <button className='buttunR' onClick={() => handleRemoveRestriction(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </FormItem>
        <hr/>
    <button className='btn btn-primary' type='submit'>Register Your Hostel</button>
  </Form>
</div>
</body>
  )
}

export default HostelRegistrationPage