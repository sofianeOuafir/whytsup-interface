const authReducerDefaultState = {};

const authReducer = (state = authReducerDefaultState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        userName: action.userName,
        email: action.email,
        loggedIn: action.loggedIn,
      };
    case "LOGOUT":
      return {};
    default:
      return state;
  }
};

export default authReducer;
