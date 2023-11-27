import React,{useEffect, useState}from 'react'
import axios from 'axios';
import '../styles/HomepageStyle.css'
import { Row , Col} from 'antd';
import { useParams  } from 'react-router-dom';
import {Form, message} from 'antd';
import { useDispatch } from 'react-redux';
import { showLoading,hideLoading } from '../redux/features/alertSlice';
import FormItem from 'antd/es/form/FormItem';
import Input from 'antd/es/input/Input';


const HomePage = () => {

  
  const { user_id } = useParams();
    const dispatch = useDispatch();
    const [hostel, setHostel] = useState(null);
    const [amenities, setAmenities] = useState([]);
    const [newAmenity, setNewAmenity] = useState('');
    const [restrictions, setRestrictions] = useState([]);
    const [newRestriction, setNewRestriction] = useState('');


    const handleAddAmenity = (e) => {
      e.preventDefault(); // This Prevents the form from being submitted
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
        const res = await axios.post('/api/v1/user/UpdateHostel' ,
         formData,
         {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
         )
        dispatch(hideLoading());

        if(res.data.success){
          message.success('Updated your Hostel Successfully');
        }else{
          message.error(res.data.message);
        }
      } catch (error) {
        dispatch(hideLoading());
        console.log(error);
        message.error('Something went wrong');
      }
    }

    const delLocalStorageHandler =() => {
      localStorage.clear()
      window.location.reload()
    }

    const getHostelDetails = async() => {
      try {
        const res = await axios.post(
          "/api/v1/user/getHostelDetails",
        {owner_id : user_id},{
          headers:{
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
        );
        if(res.data.success){
          setHostel(res.data.data);
          console.log(hostel)
        }
      } catch (error) {
        console.log(error)
      }
    };
    useEffect(() => {
      getHostelDetails();
      //eslint-disable-next-line
    },[]);
    // TODO : remove primordial Data fields for preserving integrity
  return (
  <> 
    {
      hostel && (
        <div>
          <h1>{hostel.hostelName}</h1>
    <Form layout='vertical' initialValues={hostel} onFinish={OnFinishHandler} className="Register-form p-4">
    <h1>Hostel Update Form</h1>
    <Row gutter={20}>

    <Col xs={24} md={24} lg={8}>
    <FormItem label="Name of Hostel*" name="hostelName" >
      <Input type='text' required/>
    </FormItem>
    </Col>
    
    <Col xs={24} md={24} lg={8}>
    <FormItem label="Address*" name="location" >
      <Input type='text' required/>
    </FormItem>
    </Col>
    
    <Col xs={24} md={24} lg={8}>
    <FormItem label="Pincode*" name="pincode" >
      <Input type='text' pattern="[0-9]{6}" required/>
    </FormItem>
    </Col>
    
    <Col xs={24} md={24} lg={8}>
    <FormItem label="Wardens Phone Number*" name="phoneNumber" >
      <Input type='text' pattern="[0-9]{10}" required/>
    </FormItem>
    </Col>
    
    </Row>

    <Row gutter={20}>

    <Col xs={24} md={24} lg={8}>
    <FormItem label="Total Capacity*" name="totalOccupancy" >
      <Input type='text' required/>
    </FormItem>
    </Col>
    
    <Col xs={24} md={24} lg={8}>
    <FormItem label="Vacancy*" name="vacancy" >
      <Input type='text' required/>
    </FormItem>
    </Col>
    
    <Col xs={24} md={24} lg={8}>
    <FormItem label="People per room*" name="perRoomCount" >
      <Input type='text' required/>
    </FormItem>
    </Col>
    
    <Col xs={24} md={24} lg={8}>
    <FormItem label="Annual rent*" name="AnnualRent" >
      <Input type='text' required/>
    </FormItem>
    </Col>
    
    </Row>

    <Row gutter={20}>

    <Col xs={24} md={24} lg={8}>
    <FormItem label="Amenities">
  <div>
    <Input
      type="text"
      value={newAmenity}
      onChange={(e) => setNewAmenity(e.target.value)} // Handle input change
    />
    <button  onClick={(e) => { handleAddAmenity(e); }}>Add Amenity</button>
  </div>
  <ul>
    {amenities.map((amenity, index) => (
      <li key={index}>
        {amenity}{' '}
        <button  onClick={() => handleRemoveAmenity(index)}>Remove</button>
      </li>
    ))}
  </ul>
</FormItem>

    </Col>

        <Col xs={24} md={24} lg={8}>
        <FormItem label="Restrictions">
          <div>
            <Input
              type="text"
              value={newRestriction}
              onChange={(e) => setNewRestriction(e.target.value)}
            />
            <button  onClick={ (e) => { handleAddRestriction(e); }}>Add Restriction</button>
          </div>
          <ul>
            {restrictions.map((restriction, index) => (
              <li key={index}>
                {restriction}{' '}
                <button  onClick={() => handleRemoveRestriction(index)}>Remove</button>
              </li>
            ))}
          </ul>
        </FormItem>

        </Col>

        </Row>

        <hr/>
    <button className='btn btn-primary' type='submit'>Update</button>
  </Form>
        </div>
      )
    }
    <div>
      <button onClick={delLocalStorageHandler}>Log-Out</button>
    </div>
  </>);
};

export default HomePage