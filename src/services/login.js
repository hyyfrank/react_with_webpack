import axios from "axios";
import APICONST from "./APIConst";

const fetchLoginStaus = (payload) => {
  const { BASE_URL, LOGIN_REQUEST } = APICONST;
  const LoginFetchUrl = BASE_URL + LOGIN_REQUEST;
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return axios.post(LoginFetchUrl, payload, config);
};

const fetchGardenInfos = (payload) => {
  const { SERVER_MACHINE_BASE, SERVER_MACHINE_FETCH_MACHINE_INFO } = APICONST;
  const fetchGardenUrl =
    SERVER_MACHINE_BASE + SERVER_MACHINE_FETCH_MACHINE_INFO;
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  return axios.post(fetchGardenUrl, payload, config);
};
export { fetchLoginStaus, fetchGardenInfos };
