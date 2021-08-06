const APICONST = {
  // BASE_URL: "http://10.33.4.2:27018",

  // BASE_URL: "http://cvp.g2link.cn:20095",
  // INSTURMENT_URL: "http://cvp.g2link.cn:20112",

  // BASE_URL: "http://cvp.g2link.cn:20122",
  BASE_URL: "http://cvp.g2link.cn:20065",
  INSTURMENT_URL: "http://cvp.g2link.cn:20034",

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
  DEL_CAREMA: "/manager",

  // INSTRUMENT LIST
  INSTURMENT_LIST: "/manager",
  SERVICELIST_SAVE_REQUEST: "/manager"
};

export default APICONST;

// save instrument post
// {"IoTCode":"dfgkihjhftrdg","cameraID":"22015000271","regions":[{"ID":"0","Desc":"StatusLight","axis":[[516,171],[558,171],[550,220],[511,217]]},{"ID":"1","Desc":"StatusLight","axis":[[691,180],[733,175],[730,231],[693,229]]},{"ID":"2","Desc":"StatusLight","axis":[[873,174],[909,174],[909,225],[868,228]]},{"ID":"3","Desc":"StatusLight","axis":[[1063,402],[1104,399],[1093,451],[1060,453]]},{"ID":"4","Desc":"StatusLight","axis":[[1303,270],[1338,265],[1338,307],[1305,315]]},{"ID":"5","Desc":"StatusLight","axis":[[1540,297],[1575,294],[1576,352],[1540,349]]},{"ID":"6","Desc":"StatusLight","axis":[[736,490],[774,489],[768,541],[732,540]]},{"ID":"7","Desc":"StatusLight","axis":[[1030,555],[1068,552],[1066,606],[1026,606]]},{"ID":"8","Desc":"StatusLight","axis":[[1270,591],[1312,589],[1314,634],[1275,642]]},{"ID":"9","Desc":"StatusLight","axis":[[1125,738],[1164,730],[1158,783],[1116,784]]},{"ID":"DFSD","Desc":"DFSD","axis":[[216,139],[351,136],[387,253],[220,271]]}],"type":"SOURCEEDIT"}

// list instrument post

// delete source : POST
// {"type":"SERVICE_DELETE","index":0,"serviceindex":{"ID":1},"ctrl_key":1626853483}

// add source: POST
// 帧服务器：req: {"type":"SERVICE_ADD","serviceindex":{"ID":1,"Description":"消防通道/消控室（图像）分析服务，输出通道堵塞和恢复畅通事件/人员离岗和复岗事件[占用显存：4G]","CloudURL":"http://124.204.79.221:27018/inference"},"ctrl_key":1626853483}
// 算法服务器： req: {"type":"SERVICE_ADD","serviceindex":{"ID":0,"GPU":0,"Description":"月台（图像）分析服务，输出车辆靠台和离开事件，包含车牌识别结果[占用显存：5G]"},"ctrl_key":1626854477}
