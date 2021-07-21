import React, { Component } from "react";
import { Table, Breadcrumb, Tooltip, Button, message, Icon } from "antd";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";

import {
  fetchDeployedAlgorithm,
  addService,
  delService
} from "../../services/algorithm";
import * as style from "../../css/algorithm.less";
import AlgorithmList from "./list";

class AlgorithmComponent extends Component {
  constructor() {
    super();

    this.addService = this.addService.bind(this);
    this.delServiceByID = this.delServiceByID.bind(this);
    this.state = {
      bottom: "bottomRight",
      isModalVisible: false,
      isDeleteVisiable: false,
      tableData: []
    };
  }

  componentDidMount() {
    const formData = new FormData();
    const obj = {
      type: "SERVICE_SUPPORT",
      ctrl_key:
        sessionStorage.getItem("ctrl_key") == null
          ? -1
          : sessionStorage.getItem("ctrl_key")
    };
    formData.append("req", JSON.stringify(obj));

    fetchDeployedAlgorithm(formData).then(({ data }) => {
      const mockData = {
        type: "SERVICE_SUPPORT",
        ctrl_key: 1626768377,
        response: {
          state: "OK",
          detail: [
            {
              servicesCFG: [
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
                  ID: [7],
                  name: ["LEDSegmentDisplays"],
                  Type: "ObjectDetection",
                  Description:
                    "变压器LED显示（图像）分析服务，输出监控区域内LED显示字符",
                  GPUMemory: 1.1,
                  MaxLoad: 100,
                  Algorithm: { A1: "PT_LED_Detection" },
                  Enable: true
                }
              ]
            },
            {
              WorkCFG: {
                services: [
                  {
                    ID: 1,
                    Description:
                      "消防通道/消控室（图像）分析服务，输出通道堵塞和恢复畅通事件/人员离岗和复岗事件[占用显存：4G]",
                    CloudURL: "http://124.204.79.221:27018/inference"
                  },
                  {
                    ID: 7,
                    Description:
                      "变压器LED显示（图像）分析服务，输出监控区域内LED显示字符[占用显存：1.1G]",
                    CloudURL: "http://127.0.0.1:27017/upload"
                  }
                ],
                History: 15,
                VideoSource: [
                  {
                    enable: true,
                    url: "rtsp://admin:a12345678@192.168.55.244",
                    IoTCode: "c8150300047b",
                    interval: 4,
                    times: 15,
                    serviceID: 7,
                    DeviceType: "LEDSegmentDisplays",
                    region: [
                      [10, 10],
                      [100, 10],
                      [100, 100],
                      [10, 100]
                    ],
                    index2: 0
                  },
                  {
                    enable: true,
                    url: "rtsp://admin:a12345678@192.168.1.64",
                    IoTCode: "22015000271",
                    interval: 4,
                    times: 180,
                    serviceID: 7,
                    DeviceType: "LEDSegmentDisplays",
                    region: [
                      [1858, 1046],
                      [1862, 28],
                      [396, 4],
                      [478, 1062]
                    ],
                    index2: 1
                  },
                  {
                    enable: true,
                    url: "rtsp://admin:a12345678@192.168.1.6",
                    IoTCode: "22015000270",
                    interval: 4,
                    times: 600,
                    serviceID: 7,
                    DeviceType: "LEDSegmentDisplays",
                    region: [
                      [296, 582],
                      [1308, 316],
                      [1786, 574],
                      [1146, 1056]
                    ],
                    index2: 2
                  },
                  {
                    enable: true,
                    url: "rtsp://admin:a12345678@192.168.1.111",
                    IoTCode: "22015000275",
                    interval: 4,
                    times: 600,
                    serviceID: 7,
                    DeviceType: "LEDSegmentDisplays",
                    region: [
                      [253, 210],
                      [861, 193],
                      [1206, 542],
                      [30, 632]
                    ],
                    index2: 3
                  },
                  {
                    enable: true,
                    url: "rtsp://admin:a12345678@192.168.1.115",
                    IoTCode: "22015000279",
                    interval: 4,
                    times: 600,
                    serviceID: 7,
                    DeviceType: "LEDSegmentDisplays",
                    region: [
                      [64, 394],
                      [1189, 389],
                      [1232, 702],
                      [45, 713]
                    ],
                    index2: 4
                  },
                  {
                    enable: true,
                    url: "rtsp://admin:a12345678@192.168.1.117",
                    IoTCode: "22015000274",
                    interval: 4,
                    times: 600,
                    serviceID: 7,
                    DeviceType: "LEDSegmentDisplays",
                    region: [
                      [952, 145],
                      [1157, 258],
                      [850, 669],
                      [193, 346]
                    ],
                    index2: 5
                  },
                  {
                    enable: true,
                    url: "rtsp://admin:a12345678@192.168.1.4",
                    IoTCode: "22015000285",
                    interval: 4,
                    times: 600,
                    serviceID: 7,
                    DeviceType: "LEDSegmentDisplays",
                    region: [
                      [1408, 98],
                      [1614, 110],
                      [1882, 890],
                      [400, 722]
                    ],
                    index2: 6
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
                  name: ["Instruments"],
                  url: "http://124.204.79.221:27017/upload"
                }
              ]
            }
          ]
        }
      };

      if (data.response.state === "error") {
        console.log("state error, please retry.");
        this.setState({ tableData: [] });
      } else {
        const algoTableDatas = AlgorithmList;

        const allSupportedService = data.response.detail[0].servicesCFG;
        const supportedAlgoIds = allSupportedService.map((item) => item.ID);
        console.log(
          `before support algorithms ids: ${JSON.stringify(supportedAlgoIds)}`
        );
        for (let i = 0; i < algoTableDatas.length; i++) {
          for (let j = 0; j < supportedAlgoIds.length; j++) {
            if (
              algoTableDatas[i].ID.length === 1 &&
              supportedAlgoIds[j].length === 1 &&
              algoTableDatas[i].ID[0] === supportedAlgoIds[j][0]
            ) {
              algoTableDatas[i].Enable = "disabled";
              const id = algoTableDatas[i].ID[0];
              algoTableDatas[i].ID = id;
            }
            if (
              algoTableDatas[i].ID.length === 2 &&
              supportedAlgoIds[j].length === 2 &&
              algoTableDatas[i].ID[0] === supportedAlgoIds[j][0] &&
              algoTableDatas[i].ID[1] === supportedAlgoIds[j][1]
            ) {
              algoTableDatas[i].Enable = "disabled";
            }
          }
        }
        console.log(
          `after support algorithms ids: ${JSON.stringify(algoTableDatas)}`
        );

        const allEnabledServices = data.response.detail[1].WorkCFG.services;
        const enableIds = allEnabledServices.map((item) => item.ID);
        console.log(`enabled ids: ${JSON.stringify(enableIds)}`);

        for (let i = 0; i < algoTableDatas.length; i++) {
          for (let j = 0; j < enableIds.length; j++) {
            if (
              Array.isArray(algoTableDatas[i].ID) &&
              algoTableDatas[i].ID.includes(enableIds[j])
            ) {
              algoTableDatas[i].Enable = "enabled";
              algoTableDatas[i].ID = enableIds[j];
            }
          }
        }
        console.log(`after enable filter: ${JSON.stringify(algoTableDatas)}`);
        const isAlgoritmServer = sessionStorage.getItem("isAlgoritmServer");
        // reframe the cloudURL structure
        const finalResult = [];
        if (isAlgoritmServer === "false") {
          const cloudURL = data.response.detail[2].CloudURL;
          const cloudURLWithId = [];
          cloudURL.map((item) => {
            const cloudObj = { ...item, id: -1 };
            if (item.name[0] === "Platform") {
              cloudObj.id = 0;
            }
            if (item.name[0] === "Road/Room") {
              cloudObj.id = 1; // or set it to 2, becasue 1,2 will map to road/room
            }
            if (item.name[0] === "WareHouse") {
              cloudObj.id = 3;
            }
            // TODO: Need to add other condition
            if (item.name[0] === "Instruments") {
              cloudObj.id = 7;
            }

            cloudURLWithId.push(cloudObj);
          });

          // add cloud url to the data
          for (let i = 0; i < algoTableDatas.length; i++) {
            const tmpItem = { ...algoTableDatas[i], cloudUrl: "" };
            for (let j = 0; j < cloudURLWithId.length; j++) {
              if (algoTableDatas[i].ID.includes(cloudURLWithId[j].id)) {
                tmpItem.cloudUrl = cloudURLWithId[j].url;
              }
            }
            finalResult.push(tmpItem);
          }
        } else {
          for (let i = 0; i < algoTableDatas.length; i++) {
            finalResult.push(algoTableDatas[i]);
          }
        }
        console.log(
          `final data for algo: ${JSON.stringify(
            finalResult
              .filter((item) => {
                return item.Enable !== "unsupported";
              })
              .sort((i1, i2) => {
                return i1.Enable.length - i2.Enable.length;
              })
          )}`
        );
        this.setState({
          tableData: finalResult
            .filter((item) => {
              return item.Enable !== "unsupported";
            })
            .sort((i1, i2) => {
              return i1.Enable.length - i2.Enable.length;
            })
        });
      }
    });
  }

  addService(record) {
    console.log(`add service : ${JSON.stringify(record)}`);
    const formData = new FormData();
    const isAlgoritmServer = sessionStorage.getItem("isAlgoritmServer");
    let serviceObj = {};
    if (isAlgoritmServer === "true") {
      serviceObj = {
        ID: record.ID,
        GPU: record.GPUMemory,
        Description: record.Description
      };
    } else {
      serviceObj = {
        ID: record.ID,
        CloudURL: record.cloudUrl,
        Description: record.Description
      };
    }
    const obj = {
      type: "SERVICE_ADD",
      serviceindex: serviceObj,
      ctrl_key:
        sessionStorage.getItem("ctrl_key") == null
          ? -1
          : sessionStorage.getItem("ctrl_key")
    };
    formData.append("req", JSON.stringify(obj));
    addService(formData).then(({ data }) => {
      console.log(`get data result after add source.${JSON.stringify(data)}`);
      if (data.response.state === "OK") {
        message.info("新增算法成功，激活成功！");
      } else {
        message.error(`激活算法失败，原因:[${data.response.state}]`);
      }
    });
  }

  delServiceByID(record) {
    console.log(`add service : ${JSON.stringify(record)}`);
    const formData = new FormData();
    const serviceObj = { ID: record.ID };
    const obj = {
      type: "SERVICE_DELETE",
      serviceindex: serviceObj,
      ctrl_key:
        sessionStorage.getItem("ctrl_key") == null
          ? -1
          : sessionStorage.getItem("ctrl_key")
    };
    formData.append("req", JSON.stringify(obj));
    delService(formData).then(({ data }) => {
      console.log(`get data result after DEL source.${JSON.stringify(data)}`);
      if (data.response.state === "OK") {
        message.info("删除算法成功，算法变为未激活状态，可重新激活！");
      } else {
        message.error(
          `删除算法失败，原因:[${data.response.detail || "找不到detail字段"}]`
        );
      }
    });
  }

  render() {
    const { bottom } = this.state;
    const isAlgoritmServer = sessionStorage.getItem("isAlgoritmServer");
    let columns;
    if (isAlgoritmServer === "true") {
      columns = [
        {
          title: "算法场景名称",
          dataIndex: "name",
          key: "name",
          width: "16%",
          render: (name) => {
            if (name[0] === "Platform") {
              return <span className={style.platform}>月台车辆分析</span>;
            }
            if (name[0] === "Road" && name[1] === "Room") {
              return <span className={style.road}>消防通道分析</span>;
            }
            if (name[0] === "WareHouse") {
              return <span className={style.warehouse}>仓库占用分析</span>;
            }
            if (name[0] === "HelmetEntrance") {
              return (
                <span className={style.helmetentrance}>
                  工地进出口安全帽分析
                </span>
              );
            }
            if (name[0] === "HelmetWork") {
              return (
                <span className={style.helmetwork}>工地作业区安全帽分析</span>
              );
            }
            if (name[0] === "LEDSegmentDisplays") {
              return <span className={style.led}>变压器LED分析</span>;
            }
            if (name[0] === "SpinSwitch") {
              return <span className={style.led}>消防轩旋钮分析</span>;
            }
            if (name[0] === "StatusLight") {
              return <span className={style.led}>消防轩状态指示灯分析</span>;
            }

            return <span>{name[0]}</span>;
          }
        },
        {
          title: "算法类型",
          dataIndex: "Type",
          key: "Type",
          width: "10%",
          render: (text) => {
            if (text === "ObjectDetection") {
              return <span className={style.objectDetect}>对象检测</span>;
            }
            if (text === "Classification") {
              return <span className={style.classification}>分类算法</span>;
            }
            return <span className={style.others}>其他</span>;
          }
        },
        {
          title: "GPU需求",
          dataIndex: "GPUMemory",
          key: "GPUMemory",
          width: "8%",
          render: (text) => {
            return <span>{text}G</span>;
          }
        },
        {
          title: "最大负载",
          dataIndex: "MaxLoad",
          key: "MaxLoad",
          width: "8%"
        },
        {
          title: "描述",
          dataIndex: "Description",
          key: "Description",
          ellipsis: true
        },
        {
          title: "运行状态",
          dataIndex: "Enable",
          key: "runningStatus",
          width: "8%",
          render: (text) => {
            if (text === "enabled") {
              return (
                <div className={style.runningBlock}>
                  <div className={style.container}>
                    <span className={style.circle} />
                  </div>
                  <span className={style.running}>running</span>
                </div>
              );
            }
            if (text === "disabled") {
              return (
                <div className={style.disabledBlock}>
                  <div className={style.container}>
                    <span className={style.circle} />
                  </div>
                  <span className={style.running}>disabled</span>
                </div>
              );
            }
            if (text === "enabled") {
              return (
                <div className={style.runningBlock}>
                  <div className={style.container}>
                    <span className={style.circle} />
                  </div>
                  <span className={style.running}>running</span>
                </div>
              );
            }
          }
        },
        {
          title: "操作",
          dataIndex: "Enable",
          key: "operation",
          width: "9%",
          sorter: (a, b) => b.Enable.length - a.Enable.length,
          sortDirections: ["descend"],
          render: (text, record) => {
            if (text === "enabled") {
              return (
                <Button
                  type="primary"
                  onClick={() => {
                    this.delServiceByID(record);
                  }}
                >
                  Deactive
                </Button>
              );
            }
            if (text === "disabled") {
              return (
                <Button
                  type="primary"
                  onClick={() => {
                    this.addService(record);
                  }}
                >
                  Active
                </Button>
              );
            }
            if (text === "unsupported") {
              return (
                <Tooltip
                  placement="topLeft"
                  title="请联系管理员启用该算法"
                  arrowPointAtCenter
                >
                  <Button type="primary" disabled>
                    Unsupported
                  </Button>
                </Tooltip>
              );
            }
          }
        }
      ];
    } else {
      columns = [
        {
          title: "算法场景名称",
          dataIndex: "name",
          key: "name",
          width: "12%",
          ellipsis: true,
          render: (name) => {
            if (name[0] === "Platform") {
              return <span className={style.platform}>月台车辆分析</span>;
            }
            if (name[0] === "Road" && name[1] === "Room") {
              return <span className={style.road}>消防通道分析</span>;
            }
            if (name[0] === "WareHouse") {
              return <span className={style.warehouse}>仓库占用分析</span>;
            }
            if (name[0] === "HelmetEntrance") {
              return (
                <span className={style.helmetentrance}>
                  工地进出口安全帽分析
                </span>
              );
            }
            if (name[0] === "HelmetWork") {
              return (
                <span className={style.helmetwork}>工地作业区安全帽分析</span>
              );
            }
            if (name[0] === "LEDSegmentDisplays") {
              return <span className={style.led}>变压器LED分析</span>;
            }

            if (name[0] === "SpinSwitch") {
              return <span className={style.led}>消防轩旋钮分析</span>;
            }
            if (name[0] === "StatusLight") {
              return <span className={style.led}>消防轩状态指示灯分析</span>;
            }

            return <span>{name[0]}</span>;
          }
        },
        {
          title: "算法类型",
          dataIndex: "Type",
          key: "Type",
          width: "10%",
          render: (text) => {
            if (text === "ObjectDetection") {
              return <span className={style.objectDetect}>对象检测</span>;
            }
            if (text === "Classification") {
              return <span className={style.classification}>分类算法</span>;
            }
            return <span className={style.others}>其他</span>;
          }
        },
        {
          title: "GPU需求",
          dataIndex: "GPUMemory",
          key: "GPUMemory",
          width: "8%",
          render: (text) => {
            return <span>{text}G</span>;
          }
        },
        {
          title: "最大负载",
          dataIndex: "MaxLoad",
          key: "MaxLoad",
          width: "8%"
        },
        {
          title: "描述",
          dataIndex: "Description",
          key: "Description",
          ellipsis: true
        },
        {
          title: "CloudURL",
          dataIndex: "cloudUrl",
          key: "cloudUrl",
          width: "18%",
          ellipsis: false
        },
        {
          title: "运行状态",
          dataIndex: "Enable",
          key: "runningStatus",
          width: "8%",
          render: (text) => {
            if (text === "enabled") {
              return (
                <div className={style.runningBlock}>
                  <div className={style.container}>
                    <span className={style.circle} />
                  </div>
                  <span className={style.running}>running</span>
                </div>
              );
            }
            if (text === "disabled") {
              return (
                <div className={style.disabledBlock}>
                  <div className={style.container}>
                    <span className={style.circle} />
                  </div>
                  <span className={style.running}>disabled</span>
                </div>
              );
            }
            if (text === "enabled") {
              return (
                <div className={style.runningBlock}>
                  <div className={style.container}>
                    <span className={style.circle} />
                  </div>
                  <span className={style.running}>running</span>
                </div>
              );
            }
          }
        },
        {
          title: "操作",
          dataIndex: "Enable",
          key: "operation",
          width: "9%",
          sorter: (a, b) => b.Enable.length - a.Enable.length,
          sortDirections: ["descend"],
          render: (text, record) => {
            if (text === "enabled") {
              return (
                <Button
                  type="primary"
                  onClick={() => {
                    this.delService(record);
                  }}
                >
                  Deactive
                </Button>
              );
            }
            if (text === "disabled") {
              return (
                <Button
                  type="primary"
                  onClick={() => {
                    this.addService(record);
                  }}
                >
                  Active
                </Button>
              );
            }
            if (text === "unsupported") {
              return (
                <Tooltip
                  placement="topLeft"
                  title="请联系管理员启用该算法"
                  arrowPointAtCenter
                >
                  <Button type="primary" disabled>
                    Unsupported
                  </Button>
                </Tooltip>
              );
            }
          }
        }
      ];
    }

    const { tableData } = this.state;
    return (
      <div className={style.mainContent}>
        <div className={style.BreadcrumbPart}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/algorithms">
              <PictureOutlined />
              <span>algorithms</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={style.tableLayer}>
          <Table
            rowKey={(record) => record.name}
            columns={columns}
            pagination={{ position: [bottom] }}
            dataSource={tableData}
          />
        </div>
      </div>
    );
  }
}

export default AlgorithmComponent;
