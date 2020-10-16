import axios from "axios";

export const startCreatePrice = ({ assetId, value, change }) => {
  const price = { asset_id: assetId, value, change };
  return axios.post("http://localhost:3001/admin/prices", price, {
    withCredentials: true,
  });
};
