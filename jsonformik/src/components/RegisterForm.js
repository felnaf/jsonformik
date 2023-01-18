import React, { useEffect, useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { edittedData, editUserData, postUserData } from '../actions';
import { useNavigate, useParams } from 'react-router-dom';
import ImageUploader from 'react-images-upload';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const { editData } = useSelector((state) => state.postReducer);
  // console.log(editData);

  const initial = {
    firstName: id ? editData.firstName : '',
    lastName: id ? editData.lastName : '',
    email: id ? editData.email : '',
  };
  const [image, setImage] = useState('');
  const [errorImage, setErroImage] = useState('');

  const onDrop = (pictureFiles, pictureDataURLs) => {
    setImage(pictureDataURLs);
  };

  useEffect(() => {
    if (id) {
      dispatch(editUserData(id));
    }
  }, []);

  const validation = Yup.object({
    firstName: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    lastName: Yup.string()
      .max(20, 'Must be 20 characters or less')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
  });
  return (
    <div>
      <Formik
        initialValues={initial}
        validationSchema={validation}
        onSubmit={(values, { resetForm }) => {
          if (image === '') {
            setErroImage('Required');
          }
          if (id) {
            let img = image ? image : editData.image;
            dispatch(edittedData({ values, image: img }, id));
            navigate('/');
          } else {
            values = { ...values, image };
            dispatch(postUserData(values));
            navigate('/');
            resetForm();
          }
          // values = { ...values, image };
          // dispatch(postUserData(values));
          // navigate('/');
          // resetForm();
        }}
        enableReinitialize
      >
        <Form>
          <div className="mb-4">
            <label htmlFor="firstName">First Name</label>
            <Field name="firstName" type="text" />
            <div className="text-danger">
              <ErrorMessage name="firstName" />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="lastName">Last Name</label>
            <Field name="lastName" type="text" />
            <ErrorMessage name="lastName" />
          </div>

          <div className="mb-4">
            <label htmlFor="email">Email Address</label>
            <Field name="email" type="email" />
            <div className="text-danger">
              <ErrorMessage name="email" />
            </div>
          </div>

          <div className="mb-4">
            <label>Image:</label>
            {id ? (
              <img src={editData.image} style={{ height: '100px' }} />
            ) : null}
            <ImageUploader
              withIcon={true}
              buttonText="Choose images"
              value={image}
              withPreview={true}
              onChange={onDrop}
              imgExtension={['.jpg', '.gif', '.jpeg', '.png', '.gif']}
              maxFileSize={5242880}
            />
          </div>
          <div className="text-danger">{errorImage}</div>

          <button type="submit">Submit</button>
        </Form>
      </Formik>
      );
    </div>
  );
};

export default RegisterForm;
