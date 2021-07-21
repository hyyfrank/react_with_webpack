const AlgorithmList = [
  {
    ID: [0],
    name: ["Platform"],
    Type: "ObjectDetection",
    Description:
      "月台（图像）分析服务，输出车辆靠台和离开事件，包含车牌识别结果",
    GPUMemory: 5,
    MaxLoad: 10,
    Algorithm: {
      A1: ["Vehicle", "modules.TF_Vehicle.API"],
      A2: ["License", "modules.TF_V3_License.API"],
      A3: ["OCR", "modules.TF_V3_OCR.API"]
    },
    Enable: "unsupported"
  },
  {
    ID: [1, 2],
    name: ["Road", "Room"],
    Type: "ObjectDetection",
    Description:
      "消防通道/消控室（图像）分析服务，输出通道堵塞和恢复畅通事件/人员离岗和复岗事件",
    GPUMemory: 4,
    MaxLoad: 30,
    Algorithm: {
      A1: ["PT_V5_Detection_VP", "modules.PT_V5_VehiclePerson_Detection.API"]
    },
    CheckOBJS: [["car", "truck", "minibus", "forklift"], ["person"]],
    Enable: "unsupported"
  },
  {
    ID: [3],
    name: ["WareHouse"],
    Type: "Classification",
    Description: "仓库内仓位占用（图像）分析服务，输出仓位占用和空闲事件",
    GPUMemory: 0.7,
    MaxLoad: 100,
    Algorithm: { A1: ["WareHouse", "modules.TF_WareHouse.API"] },
    Enable: "unsupported"
  },
  {
    ID: [4],
    name: ["HelmetEntrance"],
    Type: "ObjectDetection",
    Description:
      "工地进出口未戴安全帽/人员聚集（图像）分析服务，输出监控区域没戴安全帽以及聚集情况",
    GPUMemory: 2,
    MaxLoad: 30,
    Algorithm: { A1: ["PT_V5_Hat", "modules.PT_V5_Helmet.API"] },
    Enable: "unsupported"
  },
  {
    ID: [5],
    name: ["HelmetWork"],
    Type: "ObjectDetection",
    Description:
      "工地作业区未戴安全帽（图像）分析服务，输出监控区域没戴安全帽情况",
    GPUMemory: 2,
    MaxLoad: 30,
    Algorithm: { A1: ["PT_V5_Hat", "modules.PT_V5_Helmet1.API"] },
    Enable: "unsupported"
  },
  {
    ID: [6],
    name: ["SpinSwitch"],
    Type: "Classification",
    Description:
      "消防轩旋钮开关（图像）分析服务，输出监控区域内旋钮开关的旋钮方向",
    GPUMemory: 0.7,
    MaxLoad: 100,
    Algorithm: {
      A1: "PT_3RS_Classify.API"
    },
    Enable: "unsupported"
  },
  {
    ID: [7],
    name: ["LEDSegmentDisplays"],
    Type: "ObjectDetection",
    Description: "变压器LED显示（图像）分析服务，输出监控区域内LED显示字符",
    GPUMemory: 1.1,
    MaxLoad: 100,
    Algorithm: {
      A1: "PT_LED_Detection"
    },
    Enable: "unsupported"
  },
  {
    ID: [8],
    name: ["StatusLight"],
    Type: "Classification",
    Description:
      "消防轩状态指示灯（图像）分析服务，输出监控区域内的状态指示灯的亮暗",
    GPUMemory: 0.7,
    MaxLoad: 100,
    Algorithm: {
      A1: "PT_Status_Light_Classify"
    },
    Enable: "unsupported"
  }
];

export default AlgorithmList;
