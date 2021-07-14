import axios from "axios";
import APICONST from "./APIConst";

const fetchDashboardList = (day) => {
  const { BASE_URL, DASHBOARD_REQUEST } = APICONST;
  const dashboardFetchBaseUrl = BASE_URL + DASHBOARD_REQUEST;
  const currentTime = new Date();
  let dashboardFetchUrl = "";
  if (day === 0) {
    dashboardFetchUrl = `${dashboardFetchBaseUrl}work_record.txt?t=${currentTime.getTime()}`;
  } else {
    dashboardFetchUrl = `${dashboardFetchBaseUrl}./${day}/work_record.txt?t=${currentTime.getTime()}`;
  }
  return axios.get(dashboardFetchUrl);
};
export default fetchDashboardList;
