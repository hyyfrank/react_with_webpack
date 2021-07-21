import axios from "axios";
import APICONST from "./APIConst";

const fetchDeployedAlgorithm = (payload) => {
  const { BASE_URL, ALGORITHM_REQUEST } = APICONST;
  const algorithmServiceListURL = BASE_URL + ALGORITHM_REQUEST;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return axios.post(algorithmServiceListURL, payload, config);
};

const addService = (payload) => {
  const { BASE_URL, ADD_SERVICE } = APICONST;
  const ADD_SERVICE_URL = BASE_URL + ADD_SERVICE;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return axios.post(ADD_SERVICE_URL, payload, config);
};

const delService = (payload) => {
  const { BASE_URL, DEL_SERVICE } = APICONST;
  const DEL_SERVICE_URL = BASE_URL + DEL_SERVICE;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return axios.post(DEL_SERVICE_URL, payload, config);
};
export { fetchDeployedAlgorithm, addService, delService };
