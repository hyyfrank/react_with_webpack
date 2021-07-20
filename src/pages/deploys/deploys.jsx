import React, { Component } from "react";
import { Table, Breadcrumb, Button, Select, Divider } from "antd";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import StepsComponent from "./steps";
import fetchDeloyedServices from "../../services/deploys";
import * as style from "../../css/deploys.less";

const { Option } = Select;

class DeploysComponent extends Component {
  constructor() {
    super();
    this.addNewDeploy = this.addNewDeploy.bind(this);
    this.filterCurrentTable = this.filterCurrentTable.bind(this);
    this.createOkHandler = this.createOkHandler.bind(this);
    this.createCancelHandler = this.createCancelHandler.bind(this);
    this.onAlgorithmChange = this.onAlgorithmChange.bind(this);
    this.onCaremaChange = this.onCaremaChange.bind(this);
    this.delRecord = this.delRecord.bind(this);
    this.resetTableData = this.resetTableData.bind(this);

    this.state = {
      isModalVisible: false,
      isDeleteVisiable: false,
      tableData: [],
      filterData: [],
      showStepPage: false,
      algoIdNameMapping: [],
      bottom: "bottomRight",
      caremaSelected: "",
      algoSelected: ""
    };
  }

  componentDidMount() {
    const formData = new FormData();
    const obj = {
      type: "SERVICE_SUPPORT",
      ctrl_key:
        sessionStorage.getItem("ctrl_key") == null
          ? -1
          : Number(sessionStorage.getItem("ctrl_key"))
    };
    formData.append("req", JSON.stringify(obj));

    fetchDeloyedServices(formData).then(({ data }) => {
      const mockData = {
        type: "SERVICE_SUPPORT",
        ctrl_key: 1626329504,
        response: {
          state: "OK",
          detail: [
            {
              servicesCFG: [
                {
                  ID: [0],
                  name: ["Platform"],
                  Type: "ObjectDetection",
                  Description:
                    "月台（图像）分析服务，输出车辆靠台和离开事件，包含车牌识别结果",
                  GPUMemory: 5,
                  MaxLoad: 10,
                  Algorithm: { A1: "Vehicle", A2: "License", A3: "OCR" }
                },
                {
                  ID: [1, 2],
                  name: ["Road", "Room"],
                  Type: "ObjectDetection",
                  Description:
                    "消防通道/消控室（图像）分析服务，输出通道堵塞和恢复畅通事件/人员离岗和复岗事件",
                  GPUMemory: 4,
                  MaxLoad: 30,
                  Algorithm: { A1: "DNVehiclePersonV4" },
                  CheckOBJS: [
                    ["car", "truck", "minibus", "forklift"],
                    ["person"]
                  ]
                },
                {
                  ID: [4],
                  name: ["HelmetEntrance"],
                  Type: "ObjectDetection",
                  Description:
                    "工地进出口未戴安全帽/人员聚集（图像）分析服务，输出监控区域没戴安全帽以及聚集情况",
                  GPUMemory: 2,
                  MaxLoad: 30,
                  Algorithm: { A1: "PT_V5_Hat" },
                  Enable: true
                },
                {
                  ID: [3],
                  name: ["WareHouse"],
                  Type: "Classification",
                  Description:
                    "仓库内仓位占用（图像）分析服务，输出仓位占用和空闲事件",
                  GPUMemory: 0.7,
                  MaxLoad: 100,
                  Algorithm: { A1: "TF_WareHouse" },
                  Enable: true
                },
                {
                  ID: [6],
                  name: ["SpinSwitch"],
                  Type: "Classification",
                  Description:
                    "消防轩旋钮开关（图像）分析服务，输出监控区域内旋钮开关的旋钮方向",
                  GPUMemory: 0.7,
                  MaxLoad: 100,
                  Algorithm: { A1: "PT_3RS_Classify.API" },
                  Enable: true
                },
                {
                  ID: [7],
                  name: ["LEDSegmentDisplays"],
                  Type: "Detection",
                  Description:
                    "变压器LED显示（图像）分析服务，输出监控区域内LED显示字符",
                  GPUMemory: 1.1,
                  MaxLoad: 100,
                  Algorithm: { A1: "PT_LED_Detection" },
                  Enable: true
                },
                {
                  ID: [8],
                  name: ["StatusLight"],
                  Type: "Classification",
                  Description:
                    "消防轩状态指示灯（图像）分析服务，输出监控区域内的状态指示灯的亮暗",
                  GPUMemory: 0.7,
                  MaxLoad: 100,
                  Algorithm: { A1: "PT_Status_Light_Classify" },
                  Enable: true
                }
              ]
            },
            {
              WorkCFG: {
                services: [
                  {
                    ID: 8,
                    Description:
                      "消防轩状态指示灯（图像）分析服务，输出监控区域内的状态指示灯的亮暗[占用显存：0.7G]",
                    CloudURL: "http://124.204.79.221:27017/upload"
                  },
                  {
                    ID: 1,
                    Description:
                      "消防通道/消控室（图像）分析服务，输出通道堵塞和恢复畅通事件/人员离岗和复岗事件[占用显存：4G]",
                    CloudURL: "http://124.204.79.221:27018/inference"
                  }
                ],
                History: 15,
                VideoSource: [
                  {
                    enable: true,
                    url: "rtsp://admin:plsfd123@192.168.2.56",
                    IoTCode: "21097000661",
                    interval: 5,
                    times: 600,
                    serviceID: 2,
                    DeviceType: "Room",
                    region: [
                      [38, 30],
                      [24, 1050],
                      [1692, 1050],
                      [1590, 10]
                    ],
                    index2: 0
                  },
                  {
                    enable: true,
                    url: "rtsp://admin:plsfd123@192.168.2.50",
                    IoTCode: "21097000648",
                    interval: 5,
                    times: 600,
                    serviceID: 2,
                    DeviceType: "Room",
                    region: [
                      [48, 72],
                      [1890, 54],
                      [1892, 1068],
                      [20, 1068]
                    ],
                    index2: 1
                  },
                  {
                    enable: true,
                    url: "rtsp://admin:plsfd123@192.168.2.25:554/cam/realmonitor?channel=1&subtype=0",
                    IoTCode: "21097000651",
                    interval: 5,
                    times: 600,
                    serviceID: 1,
                    DeviceType: "Road",
                    region: [
                      [89, 244],
                      [180, 230],
                      [801, 632],
                      [132, 698]
                    ],
                    index2: 2
                  },
                  {
                    enable: true,
                    url: "rtsp://admin:plsfd123@192.168.2.52:554/cam/realmonitor?channel=1&subtype=0",
                    IoTCode: "XXXXXXXXC041",
                    interval: 5,
                    times: 600,
                    serviceID: 1,
                    DeviceType: "Road",
                    region: [
                      [672, 1068],
                      [1732, 1060],
                      [1064, 504],
                      [984, 508]
                    ],
                    index2: 3
                  },
                  {
                    enable: true,
                    url: "rtsp://admin:plsfd123@192.168.2.139",
                    IoTCode: "21097000654",
                    interval: 5,
                    times: 600,
                    serviceID: 1,
                    DeviceType: "Road",
                    region: [
                      [1014, 488],
                      [1458, 618],
                      [1594, 234],
                      [1434, 200]
                    ],
                    index2: 4
                  },
                  {
                    enable: true,
                    url: "rtsp://admin:plsfd123@192.168.2.198",
                    IoTCode: "21097000662",
                    interval: 5,
                    times: 600,
                    serviceID: 8,
                    DeviceType: "StatusLight",
                    region: [
                      [10, 10],
                      [100, 10],
                      [100, 100],
                      [10, 100]
                    ],
                    index2: 6
                  },
                  {
                    enable: true,
                    url: "rtsp://admin:plsfd123@192.168.2.199",
                    IoTCode: "21097000663",
                    interval: 5,
                    times: 600,
                    serviceID: 8,
                    DeviceType: "StatusLight",
                    region: [
                      [10, 10],
                      [100, 10],
                      [100, 100],
                      [10, 100]
                    ],
                    index2: 7
                  }
                ]
              }
            },
            {
              CloudURL: [
                {
                  name: ["Platform"],
                  url: "http://124.204.79.221:27018/inference"
                },
                {
                  name: ["Road/Room"],
                  url: "http://124.204.79.221:27018/inference"
                },
                {
                  name: ["WareHouse"],
                  url: "http://124.204.79.221:27017/upload"
                },
                {
                  name: ["Instruments"],
                  url: "http://124.204.79.221:27017/upload"
                }
              ]
            }
          ]
        }
      };
      const algoFieldIdMapping = [];
      // const details = data.response.detail;
      const details = mockData.response.detail;
      // get id and gpu and platform from the all servicesCFG map.
      details[0].servicesCFG.map((item) => {
        if (item.ID.length > 1) {
          for (let i = 0; i < item.ID.length; i++) {
            algoFieldIdMapping.push({
              ID: item.ID[i],
              algoName: item.name[i],
              gpu: item.GPUMemory
            });
          }
        } else {
          algoFieldIdMapping.push({
            ID: item.ID[0],
            algoName: item.name[0],
            gpu: item.GPUMemory
          });
        }
      });
      console.log(`获取所有idMapAlgos:${JSON.stringify(algoFieldIdMapping)}`);
      this.setState({ algoIdNameMapping: algoFieldIdMapping });
      const idToCaremaMapping = details[1].WorkCFG.VideoSource;
      console.log(
        `获取serviceIdMapCamera:${JSON.stringify(
          details[1].WorkCFG.VideoSource
        )}`
      );
      const ids = details[1].WorkCFG.services.map((item) => item.ID);
      console.log(`部署的ids:${JSON.stringify(ids)}`);
      let finalData = [];

      finalData = algoFieldIdMapping.filter((item) => {
        return ids.includes(item.ID);
      });

      console.log(`finalData:${JSON.stringify(finalData)}`);
      const tableDataFin = [];
      finalData.map((item) => {
        const cameraItems = idToCaremaMapping.filter((i) => {
          if (item.ID === 1 || item.ID === 2) {
            return i.serviceID === 1 || i.serviceID === 2;
          }
          return i.serviceID === item.ID;
        });
        console.log(`caremaItems:${item.ID}:${JSON.stringify(cameraItems)}`);
        for (let i = 0; i < cameraItems.length; i++) {
          const fullObj = cameraItems[i];
          Object.keys(item).forEach((j) => {
            fullObj[j] = item[j];
          });
          fullObj.uid = fullObj.IoTCode + fullObj.DeviceType;
          tableDataFin.push(fullObj);
        }
      });
      console.log(`new finalData:${JSON.stringify(tableDataFin)}`);

      if (mockData.response.state === "error") {
        // if (data.response.state === "error") {
        console.log("state error, please retry.");
        this.setState({ tableData: [] });
      } else {
        this.setState({
          tableData: tableDataFin,
          filterData: tableDataFin
        });
      }
    });
  }

  onAlgorithmChange(val) {
    console.log(`algo selected: ${val}`);
    this.setState({
      algoSelected: val || ""
    });
  }

  onCaremaChange(val) {
    console.log(`carema selected: ${val}`);
    this.setState({
      caremaSelected: val || ""
    });
  }

  delRecord(record) {
    console.log(`will delete iotID:${JSON.stringify(record)}`);
  }

  resetTableData() {
    const { tableData } = this.state;
    this.setState({
      filterData: tableData,
      caremaSelected: "",
      algoSelected: ""
    });
  }

  createCancelHandler() {
    this.setState({
      showStepPage: false
    });
  }

  filterCurrentTable() {
    const { caremaSelected, algoSelected, tableData } = this.state;
    console.log(`before filter is:${caremaSelected},algo is:${algoSelected}`);
    let filterResult = [];
    if (caremaSelected === "" && algoSelected === "") {
      console.log(`both null${JSON.stringify(tableData)}`);
      this.setState({
        filterData: tableData
      });
    } else if (caremaSelected !== "" && algoSelected === "") {
      filterResult = tableData.filter((item) => {
        return item.IoTCode === caremaSelected;
      });
      this.setState({
        filterData: filterResult
      });
      console.log(`only carema:${JSON.stringify(filterResult)}`);
    } else if (caremaSelected === "" && algoSelected !== "") {
      filterResult = tableData.filter((item) => {
        return item.serviceID === algoSelected;
      });
      this.setState({
        filterData: filterResult
      });
      console.log(`only algos:${JSON.stringify(filterResult)}`);
    } else {
      filterResult = tableData.filter((item) => {
        return (
          item.serviceID === algoSelected && item.IoTCode === caremaSelected
        );
      });
      this.setState({
        filterData: filterResult
      });
      console.log(`both:${JSON.stringify(filterResult)}`);
    }
  }

  addNewDeploy() {
    this.setState({ showStepPage: true });
  }

  createOkHandler(result) {
    console.log(`i can get params from steps:${JSON.stringify(result)}`);
    this.setState({
      showStepPage: false
    });
  }

  render() {
    const {
      bottom,
      algoIdNameMapping,
      showStepPage,
      algoSelected,
      caremaSelected,
      filterData,
      tableData
    } = this.state;
    const columns = [
      {
        title: "园区",
        dataIndex: "index2",
        key: "index2",
        width: "10%",
        render: () => {
          return <span>北京-GTX1080Ti</span>;
        }
      },
      {
        title: "算法场景",
        dataIndex: "algoName",
        key: "algoName",
        width: "12%",
        render: (algoName) => {
          if (algoName === "Platform") {
            return <span className={style.platform}>月台车辆分析</span>;
          }
          if (algoName === "Road" || algoName === "Room") {
            return <span className={style.road}>消防通道分析</span>;
          }
          if (algoName === "WareHouse") {
            return <span className={style.warehouse}>仓库占用分析</span>;
          }
          if (algoName === "HelmetEntrance") {
            return (
              <span className={style.helmetentrance}>工地进出口安全帽分析</span>
            );
          }
          if (algoName === "HelmetWork") {
            return (
              <span className={style.helmetwork}>工地作业区安全帽分析</span>
            );
          }
          if (algoName === "StatusLight") {
            return <span className={style.helmetwork}>状态灯检测</span>;
          }
          return <span>{algoName}</span>;
        }
      },
      {
        title: "显存",
        dataIndex: "gpu",
        key: "gpu",
        width: "8%",
        render: (text) => {
          return <span>{text}G</span>;
        }
      },
      {
        title: "IoT代码",
        dataIndex: "IoTCode",
        key: "IoTCode",
        width: "14%"
      },
      {
        title: "抽帧间隔",
        dataIndex: "interval",
        key: "interval",
        width: "8%",
        render: (text) => {
          return <span>{text}s</span>;
        }
      },
      {
        title: "检测时间",
        dataIndex: "times",
        key: "times",
        width: "8%",
        render: (text) => {
          return <span>{text}s</span>;
        }
      },
      {
        title: "流地址",
        dataIndex: "url",
        key: "url",
        ellipsis: true
      },
      {
        title: "启用状态",
        dataIndex: "enable",
        key: "enable",
        width: "8%",
        render: (text) => {
          if (text) {
            return <span className={style.enableAlgo}>已启用</span>;
          }
          return <span className={style.disableAlgo}>未启用</span>;
        }
      },
      {
        title: "操作",
        dataIndex: "detail",
        key: "detail",
        width: "12%",
        render: (text, record, index) => {
          const iotID = record.IoTCode;
          return (
            <div>
              <Link
                to={`/deploys/detail/${record.IoTCode}?algoName=${record.algoName}&gpu=${record.gpu}`}
              >
                <span>编辑 </span>
              </Link>
              <Divider type="vertical" />
              <Button
                className={style.delBtn}
                type="link"
                onClick={() => {
                  this.delRecord(iotID);
                }}
              >
                删除
              </Button>
            </div>
          );
        }
      }
    ];

    // console.log(`tableData:${JSON.stringify(tableData)}`);
    const caremaList = tableData.map((item) => item.IoTCode);
    // console.log(`carema items:${JSON.stringify(caremaList)}`);

    const algoList = tableData.map((item) => {
      return { algoName: item.algoName, serviceID: item.serviceID };
    });
    // console.log(`algo items:${JSON.stringify(algoList)}`);
    const stepParams = {
      isModalVisible: showStepPage,
      algoMapping: algoIdNameMapping,
      caremaMapping: caremaList,
      createOkHandler: (result) => {
        this.createOkHandler(result);
      },
      createCancelHandler: () => {
        this.createCancelHandler();
      }
    };
    const caremaOptions = [];
    const algorithmsOptions = [];
    caremaList.map((item) => {
      caremaOptions.push(
        <Option key={item} value={item}>
          {item}
        </Option>
      );
    });

    algoIdNameMapping.map((item) => {
      algorithmsOptions.push(
        <Option key={item.ID} value={item.ID}>
          {item.algoName}
        </Option>
      );
    });

    return (
      <div className={style.mainContent}>
        <div className={style.BreadcrumbPart}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/deploys">
              <PictureOutlined />
              <span>deploys</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={style.tableLayer}>
          <div className={style.topLayer}>
            <div className={style.filterBlock}>
              <div className={style.block}>
                <span className={style.blockLabel}>相机：</span>
                <div className={style.blockFilterItem}>
                  <Select
                    showSearch
                    defaultValue=""
                    value={caremaSelected}
                    allowClear
                    style={{ width: 200 }}
                    placeholder="选择一个相机"
                    optionFilterProp="children"
                    onChange={this.onCaremaChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {caremaOptions}
                  </Select>
                </div>
              </div>
              <div className={style.block}>
                <span className={style.blockLabel}>算法：</span>
                <div className={style.blockFilterItem}>
                  <Select
                    showSearch
                    defaultValue=""
                    value={algoSelected}
                    allowClear
                    style={{ width: 200 }}
                    placeholder="选择一种算法"
                    optionFilterProp="children"
                    onChange={this.onAlgorithmChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {algorithmsOptions}
                  </Select>
                </div>
              </div>
              <div className={style.block}>
                <Button
                  type="link"
                  onClick={() => {
                    this.filterCurrentTable();
                  }}
                >
                  筛选
                </Button>
                <Button
                  type="link"
                  className={style.filterBtns}
                  onClick={() => {
                    this.resetTableData();
                  }}
                >
                  重置
                </Button>
              </div>
            </div>
            <div>
              <Button
                type="primary"
                onClick={() => {
                  this.addNewDeploy();
                }}
              >
                新增
              </Button>
            </div>
          </div>
          <Table
            rowKey={(record) => record.uid}
            columns={columns}
            pagination={{ position: [bottom] }}
            dataSource={filterData}
          />
          <div>
            {showStepPage ? <StepsComponent {...stepParams} /> : <div />}
          </div>
        </div>
      </div>
    );
  }
}

export default DeploysComponent;
