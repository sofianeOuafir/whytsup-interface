const headlinesReducerDefaultState = [];

const headlinesReducer = (state = headlinesReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_HEADLINES":
      return [...action.headlines];
    default:
      return state;
  }
};

export default headlinesReducer;
