import {
  deleteData,
  editData,
  getData,
  postData,
  encrypt,
  decrypt,
} from '../service';

export const getUserData = () => async (dispatch) => {
  const { data } = await getData('User');
  dispatch({
    type: 'GET_USER',
    payload: data,
  });
};

export const postUserData = (data) => async (dispatch) => {
  await postData('User', data);
  dispatch(getUserData());
};

export const deleteUserData = (id) => async (dispatch) => {
  await deleteData(`User/${id}`);
  dispatch(getUserData());
};

export const editUserData = (id) => async (dispatch) => {
  const { data } = await getData(`User/${id}`);
  dispatch({
    type: 'EDIT_USER',
    payload: data,
  });
};

export const edittedData = (data, id) => async (dispatch) => {
  await editData(`User/${id}`, data);
  dispatch(getUserData());
};

export const viewUserData = (id) => async (dispatch) => {
  const { data } = await getData(`User/${id}`);
  // console.log(data);
  dispatch({
    type: 'VIEW_USER',
    payload: data,
  });
};

// login
export const postLoginData = (values, navigate) => async (dispatch) => {
  const { data } = await getData('Login');

  if (data.find((d) => d.username === values.username)) {
    alert('User already exists');
  } else {
    let { password, ...restValues } = values;

    const encyrptedPassword = encrypt(password);

    restValues = { ...restValues, encyrptedPassword };

    await postData('Login', restValues);

    navigate();
  }
};

export const loginGetData =
  ({ username, password }, navigate) =>
  async (dispatch) => {
    const { data } = await getData('Login');
    let item = false;

    if (
      data.find(
        (d) =>
          d.username === username && decrypt(d.encyrptedPassword) === password
      )
    ) {
      item = true;
      sessionStorage.setItem('value', item);
      alert('login Success');
      navigate();
    } else {
      alert('invalid');
    }
    dispatch({
      type: 'LOGIN',
      payload: item,
    });
  };
