const APICONST = {
  // BASE_URL: "http://10.33.4.2:27018",
  BASE_URL: "http://cvp.g2link.cn:20095",
  // BASE_URL: "http://cvp.g2link.cn:20065",

  SERVER_MACHINE_BASE: "http://cvp.g2link.cn:20093",

  SERVER_MACHINE_FETCH_MACHINE_INFO: "/ServerConfig",
  // LOGIN
  LOGIN_REQUEST: "/manager",
  // DASHBOARD
  DASHBOARD_REQUEST: "/?filename=",
  // ALGORITHM
  ALGORITHM_REQUEST: "/manager",
  // ADD SERVICE
  ADD_SERVICE: "/manager",
  // DEL SERVICE
  DEL_SERVICE: "/manager",
  // DEPLOYED SERVICE
  SERVICE_LIST_REQUEST: "/manager",
  SOURCE_LIST_REQUEST: "/manager",
  SERVICE_SUPPORT_REQUEST: "/manager",
  // ADD NEW CAREMA
  ADD_CAREMA: "/manager",
  DEL_CAREMA: "/manager"
};

export default APICONST;

// delete source : POST
// {"type":"SERVICE_DELETE","index":0,"serviceindex":{"ID":1},"ctrl_key":1626853483}

// add source: POST
// 帧服务器：req: {"type":"SERVICE_ADD","serviceindex":{"ID":1,"Description":"消防通道/消控室（图像）分析服务，输出通道堵塞和恢复畅通事件/人员离岗和复岗事件[占用显存：4G]","CloudURL":"http://124.204.79.221:27018/inference"},"ctrl_key":1626853483}
// 算法服务器： req: {"type":"SERVICE_ADD","serviceindex":{"ID":0,"GPU":0,"Description":"月台（图像）分析服务，输出车辆靠台和离开事件，包含车牌识别结果[占用显存：5G]"},"ctrl_key":1626854477}
