import axios from "axios";
import APICONST from "./APIConst";

const config = {
  headers: {
    "Content-Type": "multipart/form-data"
  }
};
const fetchServiceList = () => {
  // base url
  const { BASE_URL, SERVICE_LIST_REQUEST } = APICONST;
  const serviceListURL = BASE_URL + SERVICE_LIST_REQUEST;
  // params: form data
  const serviceListForm = new FormData();
  const obj = {
    type: "SERVICE_LIST",
    ctrl_key:
      sessionStorage.getItem("ctrl_key") == null
        ? -1
        : sessionStorage.getItem("ctrl_key")
  };
  serviceListForm.append("req", JSON.stringify(obj));
  // send request
  return axios.post(serviceListURL, serviceListForm, config);
};
const fetchSourceList = () => {
  // base url
  const { BASE_URL, SOURCE_LIST_REQUEST } = APICONST;
  const sourceListURL = BASE_URL + SOURCE_LIST_REQUEST;
  // params: form data
  const sourceListForm = new FormData();
  const obj = {
    type: "SOURCE_LIST",
    ctrl_key:
      sessionStorage.getItem("ctrl_key") == null
        ? -1
        : sessionStorage.getItem("ctrl_key")
  };
  sourceListForm.append("req", JSON.stringify(obj));
  // send request
  return axios.post(sourceListURL, sourceListForm, config);
};
const fetchServiceSupportList = () => {
  // base url
  const { BASE_URL, SERVICE_SUPPORT_REQUEST } = APICONST;
  const serviceSupportURL = BASE_URL + SERVICE_SUPPORT_REQUEST;
  // params: form data
  const serviceSupportForm = new FormData();
  const objAlgo = {
    type: "SERVICE_SUPPORT",
    ctrl_key:
      sessionStorage.getItem("ctrl_key") == null
        ? -1
        : sessionStorage.getItem("ctrl_key")
  };
  serviceSupportForm.append("req", JSON.stringify(objAlgo));
  // send request
  return axios.post(serviceSupportURL, serviceSupportForm, config);
};
export { fetchServiceList, fetchSourceList, fetchServiceSupportList };
