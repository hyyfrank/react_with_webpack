import axios from "axios";
import APICONST from "./APIConst";

const config = {
  headers: {
    "Content-Type": "multipart/form-data"
  }
};
const saveSourceCanvasDetail = (payload) => {
  // base url
  const { INSTURMENT_URL, SERVICELIST_SAVE_REQUEST } = APICONST;
  const serviceListURL = INSTURMENT_URL + SERVICELIST_SAVE_REQUEST;
  // params: form data
  const serviceListForm = new FormData();
  const obj = {
    type: "SOURCEEDIT",
    ...payload
  };
  serviceListForm.append("req", JSON.stringify(obj));
  // send request
  return axios.post(serviceListURL, serviceListForm, config);
};

export default saveSourceCanvasDetail;
