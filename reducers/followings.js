const followingsReducerDefaultState = [];

const followingsReducer = (state = followingsReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_FOLLOWINGS":
      return [...action.assets];
    case "ADD_FOLLOWING":
      return [...state, action.asset];
    case "REMOVE_FOLLOWING":
      return [...state.filter(({ id }) => id !== action.asset.id)];
    default:
      return state;
  }
};

export default followingsReducer;
