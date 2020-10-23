import axios from "axios";

export const login = ({ userName, email }) => ({
  type: "LOGIN",
  userName,
  email,
  loggedIn: true,
});

export const logout = () => ({
  type: "LOGOUT",
});

export const startLogin = ({ email, password }) => (dispatch) => {
  return axios
    .post(
      `${process.env.BACKEND_URL}/authenticate`,
      { email, password },
      { withCredentials: true }
    )
    .then((response) => {
      const user = response.data.user;
      const { name: userName, email } = user;
      dispatch(login({ userName, email }));
    });
};

export const startAutoLogin = (cookie) => (dispatch) => {
  const config = cookie ? { headers: cookie } : { withCredentials: true, sameSite: "none", secure: true };
  return axios
    .get(`${process.env.BACKEND_URL}/auto_login`, config)
    .then((response) => {
      const { email, name: userName } = response.data;
      dispatch(login({ userName, email }));
    })
    .catch((e) => console.log(e));
};

export const startSignUp = ({
  userName,
  email,
  password,
  passwordConfirmation,
}) => (dispatch) => {
  const user = {
    name: userName,
    email,
    password,
    password_confirmation: passwordConfirmation,
  };
  return axios
    .post(`${process.env.BACKEND_URL}/users`, user, { withCredentials: true })
    .then((response) => {
      const user = response.data.user;
      const { name: userName, email } = user;
      dispatch(login({ userName, email }));
    });
};
