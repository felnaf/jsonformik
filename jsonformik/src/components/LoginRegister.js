import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { postLoginData } from '../actions';

const LoginRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      <Formik
        initialValues={initial}
        validationSchema={validation}
        onSubmit={(values, { resetForm }) => {
          dispatch(postLoginData(values, () => navigate('/login')));
          resetForm();
        }}
      >
        <Form>
          <h1> Register to Login </h1>
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

export default LoginRegister;
