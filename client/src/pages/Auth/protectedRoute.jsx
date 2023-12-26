import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectRoute = ({children}) => {
 

let item=localStorage.getItem('Profile');

     return item?<Navigate to="/" /> : children
};

export default ProtectRoute;