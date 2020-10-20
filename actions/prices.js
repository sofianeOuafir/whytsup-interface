import axios from "axios";

export const startCreatePrice = ({ assetId, value, change }) => {
  const price = { asset_id: assetId, value, change };
  return axios.post(`${process.env.BACKEND_URL}/admin/prices`, price, {
    withCredentials: true,
  });
};
