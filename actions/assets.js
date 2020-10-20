import axios from "axios";

export const startSetAssets = (cookie) => (dispatch) => {
  return axios
    .get(`${process.env.BACKEND_URL}/assets`, { headers: cookie })
    .then((response) => {
      dispatch(setAssets(response.data));
      return response;
    });
};

export const removeAsset = (asset) => {
  return {
    type: "REMOVE_ASSET",
    asset,
  };
};

export const addAsset = (asset) => {
  return {
    type: "ADD_ASSET",
    asset,
  };
};

export const setAssets = (assets) => {
  return {
    type: "SET_ASSETS",
    assets,
  };
};
