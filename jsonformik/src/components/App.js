import React ,{useEffect}from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import RegisterForm from './RegisterForm';
import View from './View';
import Login from './Login';
import LoginRegister from './LoginRegister';
import Privateroute from './Privateroute';

const App = () => {
  useEffect(() => {
    let auth_value = sessionStorage.getItem('value');
    if (auth_value === null) {
      auth_value = false;
      sessionStorage.setItem('value', auth_value);
    }
  }, []);
  return (
    <Routes>
      <Route path="/" element={<LoginRegister />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Privateroute />}>
        <Route path="/home" element={<Home />} />
        <Route path="/register-form" element={<RegisterForm />} />
        <Route path="/edit-form/:id" element={<RegisterForm />} />
        <Route path="/view-form/:id" element={<View />} />
      </Route>
    </Routes>
  );
};

export default App;
