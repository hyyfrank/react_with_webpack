import axios from "axios";
import APICONST from "./APIConst";

const fetchDeployedAlgorithm = (payload, config) => {
  const { REAL_BASE_URL, NEW_PREFIX, ALGORITHM_REQUEST } = APICONST;
  const algorithmServiceListURL =
    REAL_BASE_URL + NEW_PREFIX + ALGORITHM_REQUEST;
  return axios.post(algorithmServiceListURL, payload, config);
};
export default fetchDeployedAlgorithm;
