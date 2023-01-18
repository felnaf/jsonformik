import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserData, deleteUserData } from '../actions';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data } = useSelector((state) => state.postReducer);
  //   console.log(data);

  useEffect(() => {
    dispatch(getUserData());
  }, []);
  const logout = () => {
    let low = false;
    sessionStorage.setItem('value', low);
    navigate('/login');
  };

  const [val, setval] = useState('');
  const dataSearch = data.filter((e) => e.firstName.includes(val));
  return (
    <div>
      <button>
        <Link to="/register-form">ADD</Link>
      </button>
      <input
        type="text"
        placeholder="search"
        onChange={(e) => setval(e.target.value.trim())}
      />
      {dataSearch.map((d, index) => (
        <div key={index}>
          <div>{d.firstName}</div>
          <div>{d.lastName}</div>
          <img src={d.image} style={{ height: '100px' }} />
          <div>
            <button>
              <Link to={`/view-form/${d.id}`}>View</Link>
            </button>
            <button>
              <Link to={`/edit-form/${d.id}`}>Edit</Link>
            </button>
            <button onClick={() => dispatch(deleteUserData(d.id))}>
              delete
            </button>
          </div>
          <button onClick={() => logout()}>Logout</button>
        </div>
      ))}
    </div>
  );
};

export default Home;
