import axios from "axios";
import APICONST from "./APIConst";

const config = {
  headers: {
    "Content-Type": "multipart/form-data"
  }
};
const saveSourceDetail = (payload) => {
  // base url
  const { BASE_URL, SERVICE_LIST_REQUEST } = APICONST;
  const serviceListURL = BASE_URL + SERVICE_LIST_REQUEST;
  // params: form data
  const serviceListForm = new FormData();
  const obj = {
    type: "SOURCE_EDIT",
    videoCFG: payload,
    ctrl_key:
      sessionStorage.getItem("ctrl_key") == null
        ? -1
        : sessionStorage.getItem("ctrl_key")
  };
  serviceListForm.append("req", JSON.stringify(obj));
  // send request
  return axios.post(serviceListURL, serviceListForm, config);
};

export default saveSourceDetail;
