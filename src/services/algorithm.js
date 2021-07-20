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
export default fetchDeployedAlgorithm;
