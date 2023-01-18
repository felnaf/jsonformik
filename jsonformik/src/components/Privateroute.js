import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Privateroute = () => {
  const navigate = useNavigate();
  let auth = JSON.parse(sessionStorage.getItem('value'));
  return <div>{auth ? <Outlet /> : navigate('/login')}</div>;
};

export default Privateroute;
