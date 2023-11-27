import React from 'react'
import {Navigate} from "react-router-dom"

export default function PublicRoute({children}) {
  if(localStorage.getItem("token")){
    const id = localStorage.getItem("UserId");
    const path = `/Landing/${id}`;
    return <Navigate to={path}/>
  }else{
    return children;
  }
}
