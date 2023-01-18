import React from 'react';
import { useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginGetData } from '../actions';

const Login = () => {
//   const { loginData } = useSelector((state) => state.postReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initial = { username: '', password: '' };
  const validation = Yup.object({
    username: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    password: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    // email: Yup.string()
    //   .email('Invalid email address')
    //   .required('Required'),
  });
  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={initial}
        validationSchema={validation}
        onSubmit={(values, { resetForm }) => {
          dispatch(loginGetData(values, () => navigate('/home')));
          resetForm();
        }}
      >
        <Form>
         
          <label htmlFor="firstName">UserName</label>
          <Field name="username" type="text" />
          <ErrorMessage name="username" />

          <label htmlFor="lastName">Password</label>
          <Field name="password" type="text" />
          <ErrorMessage name="password" />
          {/* 
          <label htmlFor="email">Email Address</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" /> */}

          <button type="submit">Submit</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
