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

const deleteCarema = (payload) => {
  const { BASE_URL, DEL_CAREMA } = APICONST;
  const DelCaremaUrl = BASE_URL + DEL_CAREMA;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return axios.post(DelCaremaUrl, payload, config);
};

const fetchAllInsturment = (payload) => {
  const { INSTURMENT_URL, INSTURMENT_LIST } = APICONST;
  const INSTURMENT_LIST_URL = INSTURMENT_URL + INSTURMENT_LIST;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return axios.post(INSTURMENT_LIST_URL, payload, config);
};
export { fetchAllDevices, addNewCarema, deleteCarema, fetchAllInsturment };
