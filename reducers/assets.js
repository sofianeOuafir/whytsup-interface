const assetsReducerDefaultState = [];

const assetsReducer = (state = assetsReducerDefaultState, action) => {
  switch (action.type) {
    case "SET_ASSETS":
      return [...action.assets];
    case "REMOVE_ASSET":
      return [...state.filter(({ id }) => id !== action.asset.id)];
    case "ADD_ASSET":
      return [...state, action.asset]
    default:
      return state;
  }
};

export default assetsReducer;
