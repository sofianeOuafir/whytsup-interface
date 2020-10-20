import axios from "axios";

export const setHeadlines = (headlines) => {
  return {
    type: "SET_HEADLINES",
    headlines,
  };
};

export const startSetHeadlines = (cookie) => (dispatch) => {
  return axios
    .get(`${process.env.BACKEND_URL}/headlines`, { headers: cookie })
    .then((response) => {
      dispatch(setHeadlines(response.data));
      return response;
    });
};

export const startGetHeadline = ({ cookie, id }) => {
  return axios
    .get(`${process.env.BACKEND_URL}/headlines/${id}`, { headers: cookie })
    .then((response) => {
      return response;
    });
};

export const startCreateHeadline = (assetId) => {
  return axios.post(
    `${process.env.BACKEND_URL}/admin/headlines`,
    { asset_id: assetId },
    {
      withCredentials: true,
    }
  );
};

export const startGetAdminHeadlines = (cookie) => {
  return axios.get(`${process.env.BACKEND_URL}/admin/headlines`, {
    headers: cookie,
  });
};

export const startGetAdminHeadline = ({ cookie, id }) => {
  return axios.get(`${process.env.BACKEND_URL}/admin/headlines/${id}`, {
    headers: cookie,
  });
};
