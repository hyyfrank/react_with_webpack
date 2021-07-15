import axios from "axios";
import APICONST from "./APIConst";

const fetchDeloyedServices = (payload) => {
  const { BASE_URL, SERVICE_LIST_REQUEST } = APICONST;
  const deployedServiceListURL = BASE_URL + SERVICE_LIST_REQUEST;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  return axios.post(deployedServiceListURL, payload, config);
};
export default fetchDeloyedServices;
