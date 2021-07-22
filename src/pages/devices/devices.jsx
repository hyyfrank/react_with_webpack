import React, { Component } from "react";
import { Table, Breadcrumb, Button, Modal, Input, Select, message } from "antd";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import {
  fetchAllDevices,
  addNewCarema,
  deleteCarema
} from "../../services/devices";
import fetchDeloyedServices from "../../services/deploys";

import * as style from "../../css/devices.less";

const { Option } = Select;
class DevicesComponent extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.addNewCarema = this.addNewCarema.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChouzhenTimeChange = this.onChouzhenTimeChange.bind(this);
    this.onDetectTimeChange = this.onDetectTimeChange.bind(this);
    this.onChangeVideoUrl = this.onChangeVideoUrl.bind(this);
    this.onChangeIOTCode = this.onChangeIOTCode.bind(this);
    this.onAlgorithmChange = this.onAlgorithmChange.bind(this);
    this.delCarema = this.delCarema.bind(this);
    this.state = {
      bottom: "bottomRight",
      isModalVisible: false,
      isDeleteVisiable: false,
      tableData: [],
      isCreateModalVisible: false,
      algoIdNameMapping: [],
      // new field for create new carema
      newFieldChouzhenTime: "",
      newFieldDetectTime: "",
      newFieldVideoUrl: "",
      newFieldIotCode: "",
      newFieldAlgorithm: "",
      newFieldDeviceType: ""
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  onCompleted() {
    console.log("create new carema.");
    const {
      newFieldChouzhenTime,
      newFieldDetectTime,
      newFieldVideoUrl,
      newFieldIotCode,
      newFieldAlgorithm,
      newFieldDeviceType
    } = this.state;
    const formData = new FormData();
    const objparms = {
      type: "SOURCE_ADD",
      videoCFG: {
        enable: true,
        url: newFieldVideoUrl,
        IoTCode: newFieldIotCode,
        interval: Number(newFieldChouzhenTime),
        times: Number(newFieldDetectTime),
        serviceID: Number(newFieldAlgorithm),
        DeviceType: newFieldDeviceType,
        region: [
          [10, 10],
          [100, 10],
          [100, 100],
          [10, 100]
        ]
      },
      ctrl_key:
        sessionStorage.getItem("ctrl_key") == null
          ? -1
          : Number(sessionStorage.getItem("ctrl_key"))
    };
    formData.append("req", JSON.stringify(objparms));
    console.log(`add carema request parameter:${JSON.stringify(objparms)}`);
    addNewCarema(formData).then(({ data }) => {
      console.log(`result from .. add carema.${JSON.stringify(data)}`);
      if (data.response.state === "OK" && data.response.detail === "OK") {
        if (
          data.response.detail === "Service is not ready or NOT supported !!!"
        ) {
          message.error("暂时不支持该算法，请重新创建！");
          return;
        }
        message.info("新增成功");
        this.fetchData();
      }
    });
    this.setState({
      isModalVisible: false
    });
  }

  onCancel() {
    console.log("cancel...");
    this.setState({
      isModalVisible: false
    });
  }

  onChouzhenTimeChange(val) {
    console.log(`chouzhen time change${val}`);
    this.setState({
      newFieldChouzhenTime: val
    });
  }

  onDetectTimeChange(val) {
    console.log(`detect time change ${val}`);
    this.setState({
      newFieldDetectTime: val
    });
  }

  onChangeVideoUrl(event) {
    if (event && event.target && event.target.value) {
      const { value } = event.target;
      this.setState(() => ({ newFieldVideoUrl: value }));
    }
  }

  onChangeIOTCode(event) {
    if (event && event.target && event.target.value) {
      const { value } = event.target;
      this.setState(() => ({ newFieldIotCode: value }));
    }
  }

  onAlgorithmChange(val) {
    console.log(`algorithm change${val}`);
    this.setState({
      newFieldAlgorithm: val.split(":")[0],
      newFieldDeviceType: val.split(":")[1]
    });
  }

  fetchData() {
    const formData = new FormData();
    const objparms = {
      type: "SOURCE_LIST",
      ctrl_key:
        sessionStorage.getItem("ctrl_key") == null
          ? -1
          : Number(sessionStorage.getItem("ctrl_key"))
    };
    formData.append("req", JSON.stringify(objparms));

    fetchAllDevices(formData).then(({ data }) => {
      console.log(`get data from devices: ${JSON.stringify(data)}`);
      if (data.response.state === "error") {
        console.log("state error, please retry.");
        this.setState({ tableData: [] });
      } else {
        const mockdata = {
          type: "SOURCE_LIST",
          ctrl_key: 1626314900,
          response: {
            state: "OK",
            detail: [
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
        };
        this.setState({ tableData: data.response.detail });
        // this.setState({ tableData: data.response.detail });
      }
    });
    // fetch algo list

    const formDataAlgo = new FormData();
    const obj = {
      type: "SERVICE_SUPPORT",
      ctrl_key:
        sessionStorage.getItem("ctrl_key") == null
          ? -1
          : Number(sessionStorage.getItem("ctrl_key"))
    };
    formDataAlgo.append("req", JSON.stringify(obj));

    fetchDeloyedServices(formDataAlgo).then(({ data }) => {
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
      const details = data.response.detail;
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
      // 过滤出当前支持的算法，只有支持的算法可以用来选择创建相机
      const allEnabledServices = details[1].WorkCFG.services;
      const enableIds = allEnabledServices.map((item) => item.ID);
      const allEnabledVideo = algoFieldIdMapping.filter((item) => {
        return enableIds.includes(item.ID);
      });
      console.log(
        `log every enabled video: ${JSON.stringify(allEnabledVideo)}`
      );
      this.setState({ algoIdNameMapping: allEnabledVideo });
    });
    // end of fetch
  }

  delCarema(record) {
    console.log(`start to delete carema:${JSON.stringify(record)}`);
    const formData = new FormData();
    const obj = {
      type: "SOURCE_DELETE",
      videoCFG: record,
      ctrl_key:
        sessionStorage.getItem("ctrl_key") == null
          ? -1
          : sessionStorage.getItem("ctrl_key")
    };
    formData.append("req", JSON.stringify(obj));
    deleteCarema(formData)
      .then(({ data }) => {
        console.log(`del carema respons: ${JSON.stringify(data)}`);
        if (data.response.state === "OK" && data.response.detail === "OK") {
          this.fetchData();
          message.info("删除成功！");
        } else {
          message.error(`删除失败:${JSON.stringify(data.response)}`);
        }
      })
      .catch((e) => {
        message.error(`删除失败：${JSON.stringify(e)}`);
      });
  }

  addNewCarema() {
    console.log("add new carema...");
    this.setState({
      isModalVisible: true
    });
  }

  render() {
    const { bottom, isModalVisible, algoIdNameMapping } = this.state;
    const columns = [
      {
        title: "设备场景类型",
        dataIndex: "DeviceType",
        key: "DeviceType",
        width: "12%",
        render: (name) => {
          if (name === "Platform") {
            return <span className={style.platform}>月台车辆分析</span>;
          }
          if (name === "Room") {
            return <span className={style.road}>消防通道/消控室</span>;
          }
          if (name === "Road") {
            return <span className={style.road}>消防通道/消控室</span>;
          }
          if (name === "WareHouse") {
            return <span className={style.warehouse}>仓库占用分析</span>;
          }
          if (name === "HelmetEntrance") {
            return (
              <span className={style.helmetentrance}>工地进出口安全帽分析</span>
            );
          }
          if (name === "HelmetWork") {
            return (
              <span className={style.helmetwork}>工地作业区安全帽分析</span>
            );
          }
          if (name === "LEDSegmentDisplays") {
            return <span className={style.led}>变压器LED分析</span>;
          }

          if (name === "SpinSwitch") {
            return <span className={style.led}>消防轩旋钮分析</span>;
          }
          if (name === "StatusLight") {
            return <span className={style.led}>消防轩状态指示灯分析</span>;
          }

          return <span>{name}</span>;
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
        title: "部署详情",
        dataIndex: "detail",
        key: "detail",
        width: "8%",
        render: (text, record, index) => {
          const url = `/deploys/detail/${record.IoTCode}`;
          return (
            <div>
              <Link to={url}>
                <span>查看</span>
              </Link>
              <Button
                type="link"
                onClick={() => {
                  this.delCarema(record);
                }}
              >
                删除
              </Button>
            </div>
          );
        }
      }
    ];

    const { tableData } = this.state;
    const algorithmsOptions = [];
    algoIdNameMapping.map((item) => {
      algorithmsOptions.push(
        <Option key={item.ID} value={`${item.ID}:${item.algoName}`}>
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
            <Breadcrumb.Item href="/devices">
              <PictureOutlined />
              <span>Devices</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={style.contentLayer}>
          <div className={style.addBtnLayer}>
            <div className={style.btnStyle}>
              <Button
                type="primary"
                onClick={() => {
                  this.addNewCarema();
                }}
              >
                新增
              </Button>
            </div>
          </div>
          <Table
            rowKey={(record) => record.name}
            columns={columns}
            pagination={{ position: [bottom] }}
            dataSource={tableData}
          />
          <Modal
            title="创建新的相机"
            visible={isModalVisible}
            onOk={this.onCompleted}
            onCancel={this.onCancel}
            width={550}
          >
            <div className={style.items}>
              <div className={style.item}>
                <div className={style.labelName}>Video:</div>
                <Input
                  className={style.inputStyle}
                  placeholder="rtsp://user:pass@ip"
                  onChange={(event) => this.onChangeVideoUrl(event)}
                />
                <span className={style.testconnection}>测试连接</span>
              </div>
              <div className={style.item}>
                <div className={style.labelName}>IoTCode:</div>
                <Input
                  className={style.inputStyle}
                  placeholder="XXXXXXXX"
                  onChange={(event) => this.onChangeIOTCode(event)}
                />
              </div>
              <div className={style.item}>
                <div className={style.labelName}>Algorithm:</div>
                <Select
                  showSearch
                  defaultValue=""
                  style={{ width: 300 }}
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
              <div className={style.item}>
                <div className={style.labelName}>Interval:</div>
                <Select
                  defaultValue="5"
                  style={{ width: 300 }}
                  onChange={this.onChouzhenTimeChange}
                >
                  <Option value="1">1s</Option>
                  <Option value="2">2s</Option>
                  <Option value="3">3s</Option>
                  <Option value="4">4s</Option>
                  <Option value="5">5s</Option>
                  <Option value="6">6s</Option>
                  <Option value="7">7s</Option>
                  <Option value="8">8s</Option>
                  <Option value="15">15s</Option>
                  <Option value="30">30s</Option>
                  <Option value="60">60s</Option>
                  <Option value="300">300s</Option>
                  <Option value="600">600s</Option>
                </Select>
              </div>
              <div className={style.item}>
                <div className={style.labelName}>Detect Time:</div>
                <Select
                  defaultValue="600"
                  style={{ width: 300 }}
                  onChange={this.onDetectTimeChange}
                >
                  <Option value="15">15s</Option>
                  <Option value="30">30s</Option>
                  <Option value="60">60s</Option>
                  <Option value="120">120s</Option>
                  <Option value="180">180s</Option>
                  <Option value="240">240s</Option>
                  <Option value="300">300s</Option>
                  <Option value="360">360s</Option>
                  <Option value="420">420s</Option>
                  <Option value="480">480s</Option>
                  <Option value="540">540s</Option>
                  <Option value="600">600s</Option>
                  <Option value="720">720s</Option>
                  <Option value="900">900s</Option>
                  <Option value="1800">1800s</Option>
                </Select>
              </div>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default DevicesComponent;
