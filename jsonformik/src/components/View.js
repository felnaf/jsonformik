import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { viewUserData } from '../actions';

const View = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { viewData } = useSelector((state) => state.postReducer);
  console.log(viewData);

  useEffect(() => {
    if (id) {
      dispatch(viewUserData(id));
    }
  }, []);
  return (
    <div>
      <h5>{viewData.firstName}</h5>
      <img src={viewData.image}></img>
      <button>
        <Link to={'/home'}>Back</Link>
      </button>
    </div>
  );
};

export default View;
