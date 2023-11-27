import React, { useEffect, useState } from 'react'
import "../styles/ChatPageStyle.css"
import {io} from "socket.io-client"
import { useParams } from 'react-router-dom';
import Message from '../components/Message';
function ChattingPage() {
  const socket = io('http://localhost:5001');
  const {hostel_id} = useParams();
  const [Messagee, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  
  

  const sendMessage = async (msg) => {
    socket.emit('chatMessage', {
      room: hostel_id,
      message: msg,
    });
    console.log(msg)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(Messagee);
    setMessage('');
  };
  return (
    <>
    <div>
    </div>
    <div className='chatHistory'>
    {messages.map((message) => (
    <Message message={message} /> 
    ))}
    </div>
    <form onSubmit={handleSubmit}>
      <input 
        value={Messagee}
        onChange={(e) =>{ setMessage(e.currentTarget.value)}}
      />
      <button type="submit">Send</button> 
    </form>
    </>
  );
}

export default ChattingPage
