import axios from "axios";
import APICONST from "./APIConst";

const fetchLoginStaus = (username, password) => {
  const { BASE_URL, PREFIX, LOGIN_REQUEST } = APICONST;
  const LoginFetchUrl = BASE_URL + PREFIX + LOGIN_REQUEST;

  const postBody = {
    type: "LOGIN",
    login: {
      user: username,
      pass: password
    },
    ctrl_key: -1
  };
  return axios.post(LoginFetchUrl, postBody);
};
export default fetchLoginStaus;
