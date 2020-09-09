import axios from "axios";

import { removeAsset } from "../actions/assets";
import { addAsset } from "../actions/assets";

const addFollowing = (asset) => {
  return {
    type: "ADD_FOLLOWING",
    asset,
  };
};

const removeFollowing = (asset) => {
  return {
    type: "REMOVE_FOLLOWING",
    asset,
  };
};

export const setFollowings = (assets) => {
  return {
    type: "SET_FOLLOWINGS",
    assets,
  };
};

export const startSetFollowings = (cookie) => (dispatch) => {
  return axios
    .get("http://localhost:3001/followings", { headers: cookie })
    .then((response) => {
      dispatch(setFollowings(response.data));
      return response;
    });
};

export const startRemoveFollowing = (assetId) => (dispatch) => {
  return axios
    .delete(`http://localhost:3001/followings/${assetId}`, {
      withCredentials: true,
    })
    .then((response) => {
      const following = response.data;
      dispatch(addAsset(following.asset));
      dispatch(removeFollowing(following.asset));
    })
    .catch((e) => {
      console.log(e);
    });
};

export const startAddFollowing = (assetId) => (dispatch) => {
  return axios
    .post(
      "http://localhost:3001/followings",
      {
        asset_id: assetId,
      },
      { withCredentials: true }
    )
    .then((response) => {
      const following = response.data;
      dispatch(addFollowing(following.asset));
      dispatch(removeAsset(following.asset));
    })
    .catch((e) => {
      console.log(e);
    });
};
