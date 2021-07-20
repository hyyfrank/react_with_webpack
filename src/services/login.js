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
export default fetchLoginStaus;
