import { combineReducers } from 'redux';

const dummy = () => '';

const initialState = {
  data: [],
  editData: {},
  viewData: {},
  loginData: sessionStorage.getItem('value'),
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_USER':
      return { ...state, data: action.payload };
    case 'EDIT_USER':
      return { ...state, editData: action.payload };
    case 'VIEW_USER':
      return { ...state, viewData: action.payload };
    case 'LOGIN':
      return { ...state, loginData: action.payload };

    default:
      return state;
  }
};

export default combineReducers({ dummy, postReducer });
