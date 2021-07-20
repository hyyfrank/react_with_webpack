import axios from "axios";
import APICONST from "./APIConst";

const fetchAllDevices = (payload) => {
  const { BASE_URL, ALGORITHM_REQUEST } = APICONST;
  const algorithmServiceListURL = BASE_URL + ALGORITHM_REQUEST;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return axios.post(algorithmServiceListURL, payload, config);
};

const addNewCarema = (payload) => {
  const { BASE_URL, ADD_CAREMA } = APICONST;
  const addNewCaremaUrl = BASE_URL + ADD_CAREMA;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return axios.post(addNewCaremaUrl, payload, config);
};
export { fetchAllDevices, addNewCarema };
