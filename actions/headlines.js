import axios from "axios";

export const setHeadlines = (headlines) => {
  return {
    type: "SET_HEADLINES",
    headlines,
  };
};

export const startSetHeadlines = (cookie) => (dispatch) => {
  return axios
    .get("http://localhost:3001/headlines", { headers: cookie })
    .then((response) => {
      dispatch(setHeadlines(response.data));
      return response;
    });
};

export const startGetHeadline = ({ cookie, id }) => {
  return axios
    .get(`http://localhost:3001/headlines/${id}`, { headers: cookie })
    .then((response) => {
      return response;
    });
};

export const startCreateHeadline = (assetId) => {
  return axios.post(
    "http://localhost:3001/admin/headlines",
    { asset_id: assetId },
    {
      withCredentials: true,
    }
  );
};

export const startGetAdminHeadlines = (cookie) => {
  return axios.get("http://localhost:3001/admin/headlines", {
    headers: cookie,
  });
};

export const startGetAdminHeadline = ({ cookie, id }) => {
  return axios.get(`http://localhost:3001/admin/headlines/${id}`, {
    headers: cookie,
  });
};
