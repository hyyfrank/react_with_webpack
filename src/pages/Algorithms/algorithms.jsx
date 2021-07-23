import React, { Component } from "react";
import { Table, Breadcrumb, Tooltip, Button, message, Modal } from "antd";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";

import {
  fetchServiceList,
  fetchServiceSupportList
} from "../../services/deploys";
import { addService, delService } from "../../services/algorithm";
import * as style from "../../css/algorithm.less";
import AlgorithmList from "./list";

class AlgorithmComponent extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.addService = this.addService.bind(this);
    this.delServiceByID = this.delServiceByID.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
    this.state = {
      bottom: "bottomRight",
      isModalVisible: false,
      isDeleteVisiable: false,
      tableData: [],
      addDataSource: []
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  onCancel() {
    this.setState({
      isModalVisible: false
    });
  }

  onCompleted() {
    this.setState({
      isModalVisible: false
    });
  }

  fetchData() {
    const fetchAlgorithmPromise = fetchServiceSupportList();
    const fetchServicesPromise = fetchServiceList();

    Promise.all([fetchAlgorithmPromise, fetchServicesPromise])
      .then((values) => {
        const mockServiceList = {
          type: "SERVICE_LIST",
          ctrl_key: 1626941320,
          response: {
            state: "OK",
            detail: [
              {
                ID: 4,
                GPU: 0,
                Description:
                  "未戴安全帽/人员聚集（图像）分析服务，输出监控区域没戴安全帽以及聚集情况[占用显存：2G]"
              },
              {
                ID: 5,
                GPU: 0,
                Description:
                  "工地作业区未戴安全帽（图像）分析服务，输出监控区域没戴安全帽情况[占用显存：2G]"
              }
            ]
          }
        };
        const mockServiceSupport = {
          type: "SERVICE_SUPPORT",
          ctrl_key: 1626941320,
          response: {
            state: "OK",
            detail: {
              servicesCFG: [
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
                  Enable: true
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
                    A1: ["DNVehiclePersonV4", "modules.DN_V4_VehiclePerson.API"]
                  },
                  CheckOBJS: [
                    ["car", "truck", "minibus", "forklift"],
                    ["person"]
                  ],
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
                  Algorithm: { A1: ["WareHouse", "modules.TF_WareHouse.API"] },
                  Enable: true
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
                  Enable: true
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
                  Enable: true
                }
              ],
              GPUInfo: [
                {
                  GPU: 0,
                  Memory: { TOTAL: 10.9114990234375, USED: 1.82537841796875 }
                }
              ]
            }
          }
        };
        // const algorithmResultData = mockServiceSupport;
        // const serviceListResult = mockServiceList;
        const algorithmResultData = values[0].data;
        const serviceListResult = values[1].data;
        // handle algorithms list result
        let afterTuozhen = [];
        if (algorithmResultData.response.state === "error") {
          console.log("state error, please retry.");
          this.setState({ tableData: [] });
        } else {
          const algoTableDatas = AlgorithmList;

          let allSupportedService;
          const isAlgoritmServer = sessionStorage.getItem("isAlgoritmServer");
          console.log(`isAlgo:${isAlgoritmServer}`);
          if (isAlgoritmServer === "true") {
            allSupportedService =
              algorithmResultData.response.detail.servicesCFG;
          } else {
            allSupportedService =
              algorithmResultData.response.detail[0].servicesCFG;
          }

          const supportedAlgoIds = allSupportedService
            .map((item) => item.ID)
            .flat()
            .filter((item) => {
              return item !== 2;
            });
          console.log(
            `before support algorithms ids: ${JSON.stringify(supportedAlgoIds)}`
          );
          console.log(`before filter: ${JSON.stringify(algoTableDatas)}`);
          const supportDatas = algoTableDatas.filter((item) => {
            for (let i = 0; i < supportedAlgoIds.length; i++) {
              if (item.ID[0] === supportedAlgoIds[i]) {
                return item;
              }
            }
            return null;
          });
          console.log(`step1:${JSON.stringify(supportDatas)}`);
          // flatten the array
          const flatternArray = [];
          supportDatas.map((item) => {
            if (Array.isArray(item.ID) && item.ID.length === 2) {
              flatternArray.push({
                ...item,
                ID: item.ID[0],
                name: item.name[0]
              });
              flatternArray.push({
                ...item,
                ID: item.ID[1],
                name: item.name[1]
              });
            } else {
              flatternArray.push({
                ...item,
                ID: item.ID[0]
              });
            }
          });

          const supportDataList = flatternArray.map((item) => {
            return {
              ...item,
              Enable: "disabled",
              cloudUrl: ""
            };
          });
          console.log(
            `after support algorithms ids: ${JSON.stringify(supportDataList)}`
          );

          // 根据当前是不是脱帧服务器，来处理是不是要显示cloudURL
          // const isAlgoritmServer = sessionStorage.getItem("isAlgoritmServer");
          // console.log(`isAlgo:${isAlgoritmServer}`);
          // reframe the cloudURL structure

          if (
            isAlgoritmServer === "false" &&
            algorithmResultData.response.detail.length > 2
          ) {
            console.log(
              `check cloudURL is existed?${
                algorithmResultData.response.detail.length > 2
              }`
            );
            const cloudURL =
              algorithmResultData.response.detail[2].CloudURL || [];
            console.log(`cloudURL existed?${JSON.stringify(cloudURL)}`);
            const cloudURLWithId = [];
            cloudURL.map((item) => {
              const cloudObj = { ...item, id: -1, itemName: "" };
              if (item.name[0] === "Platform") {
                cloudObj.id = 0;
                cloudObj.itemName = "Platform";
                cloudURLWithId.push(cloudObj);
                return;
              }
              if (item.name[0] === "Road/Room") {
                cloudObj.id = 1;
                cloudObj.itemName = "Road";
                cloudURLWithId.push(cloudObj);
                const cloudObjTmp = { ...item, id: -1, itemName: "" };
                cloudObjTmp.id = 2;
                cloudObjTmp.itemName = "Room";
                cloudURLWithId.push(cloudObjTmp);
              }
              if (item.name[0] === "WareHouse") {
                cloudObj.id = 3;
                cloudObj.itemName = "WareHouse";
                cloudURLWithId.push(cloudObj);
                return;
              }

              // if (item.name[0] === "HelmetEntrance") {
              //   cloudObj.id = 4;
              //   cloudObj.itemName = "HelmetEntrance";
              //   cloudURLWithId.push(cloudObj);
              //   return;
              // }
              if (item.name[0] === "HelmetWork") {
                cloudObj.id = 5;
                cloudObj.itemName = "HelmetWork";
                cloudURLWithId.push(cloudObj);
                return;
              }

              if (item.name[0] === "Instruments") {
                cloudObj.id = 6;
                cloudObj.itemName = "SpinSwitch";
                cloudURLWithId.push(cloudObj);

                const cloudObjLED = { ...item, id: -1, itemName: "" };
                cloudObjLED.id = 7;
                cloudObjLED.itemName = "LEDSegmentDisplays";
                cloudURLWithId.push(cloudObjLED);
                const cloudObjStatus = { ...item, id: -1, itemName: "" };
                cloudObjStatus.id = 8;
                cloudObjStatus.itemName = "StatusLight";
                cloudURLWithId.push(cloudObjStatus);
              }
            });
            // Below is the special case, because we current do not have the url for HelmetWork
            const cloudObjHelmetEntrance = {
              name: ["HelmetWork"],
              url: "",
              id: 4,
              itemName: "HelmetWork"
            };
            cloudURLWithId.push(cloudObjHelmetEntrance);

            console.log(`cloudurl with id: ${JSON.stringify(cloudURLWithId)}`);
            // add cloud url to the data
            supportDataList.map((item) => {
              for (let i = 0; i < cloudURLWithId.length; i++) {
                if (item.ID === cloudURLWithId[i].id) {
                  const it = {
                    ...item,
                    cloudUrl: cloudURLWithId[i].url,
                    name: Array.isArray(item.name) ? item.name[0] : item.name
                  };
                  afterTuozhen.push(it);
                }
              }
            });
          } else {
            afterTuozhen = [...supportDataList];
          }

          console.log(`after tuozhen:${JSON.stringify(afterTuozhen)}`);
        }
        // end of handle algorithms list

        // handle enable id setting
        const allEnabledServices = serviceListResult.response.detail;
        const enableIds = allEnabledServices.map((item) => item.ID);
        console.log(`enabled ids: ${JSON.stringify(enableIds)}`);

        const enabledDataList = afterTuozhen.map((item) => {
          for (let i = 0; i < enableIds.length; i++) {
            if (item.ID === enableIds[i]) {
              return {
                ...item,
                Enable: "enabled"
              };
            }
          }
          return item;
        });

        const enabledNewDataList = enabledDataList.filter((item) => {
          if (item.ID === 2) {
            return item.Enable !== "disabled";
          }
          return true;
        });
        console.log(`去掉重复：${JSON.stringify(enabledNewDataList)}`);
        // end of enable id setting

        console.log(
          `final data for algo: ${JSON.stringify(
            enabledNewDataList.sort((i1, i2) => {
              return i1.Enable.length - i2.Enable.length;
            })
          )}`
        );
        this.setState({
          tableData: enabledNewDataList.sort((i1, i2) => {
            return i1.Enable.length - i2.Enable.length;
          })
        });
        // end of handle
      })
      .catch((e) => {
        console.log(`promise all error:${e}`);
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
    addService(formData)
      .then(({ data }) => {
        console.log(`get data result after add source.${JSON.stringify(data)}`);
        if (data.response.state === "OK" && data.response.detail === "OK") {
          message.info("新增算法成功，激活成功！");
          this.fetchData();
        } else if (data.response.detail.indexOf("Exist") !== -1) {
          message.error("服务已经存在！激活失败，请联系管理员！");
        } else {
          message.error(`激活算法失败，原因:[${data.response.state}]`);
        }
      })
      .catch((e) => {
        console.log(`add service catch error:${JSON.stringify(e)}`);
        message.error(e.message);
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
    delService(formData)
      .then(({ data }) => {
        console.log(`get data result after DEL source.${JSON.stringify(data)}`);
        if (data.response.state === "OK" && data.response.detail === "OK") {
          message.info("删除算法成功，算法变为未激活状态，可重新激活！");
          this.fetchData();
        } else if (
          data.response.detail === "Please Delete the Video Source First"
        ) {
          message.error(data.response.detail);
        } else {
          message.error(
            `删除算法失败，原因:[${data.response.detail || "找不到detail字段"}]`
          );
        }
      })
      .catch((e) => {
        console.log(`del service catch error:${JSON.stringify(e)}`);
        message.error(e.message);
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
          width: "12%",
          ellipsis: true,
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
                <span className={style.helmetentrance}>
                  工地进出口安全帽分析
                </span>
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
            return null;
          }
        },
        {
          title: "操作",
          dataIndex: "Enable",
          key: "operation",
          width: "12%",
          sorter: (a, b) => b.Enable.length - a.Enable.length,
          sortDirections: ["descend"],
          render: (text, record) => {
            if (text === "enabled") {
              return (
                <div>
                  <Button
                    type="link"
                    onClick={() => {
                      this.delServiceByID(record);
                    }}
                  >
                    Deactive
                  </Button>
                </div>
              );
            }
            if (text === "disabled") {
              return (
                <Button
                  type="link"
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
                  <Button type="link" disabled>
                    Unsupported
                  </Button>
                </Tooltip>
              );
            }
            return null;
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
                <span className={style.helmetentrance}>
                  工地进出口安全帽分析
                </span>
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
            return null;
          }
        },
        {
          title: "操作",
          dataIndex: "Enable",
          key: "operation",
          width: "12%",
          sorter: (a, b) => b.Enable.length - a.Enable.length,
          sortDirections: ["descend"],
          render: (text, record) => {
            if (text === "enabled") {
              return (
                <Button
                  type="link"
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
                  type="link"
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
            return null;
          }
        }
      ];
    }

    const { tableData, isModalVisible } = this.state;
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
          <div className={style.addBtnLayer}>
            <Button
              type="primary"
              className={style.btnStyle}
              onClick={() => {
                this.setState({
                  isModalVisible: true
                });
              }}
            >
              新增
            </Button>
          </div>
          <Table
            rowKey={(record) => record.name}
            columns={columns}
            pagination={{ position: [bottom] }}
            dataSource={tableData}
          />
          <Modal
            title="新增算法(激活)"
            visible={isModalVisible}
            onOk={this.onCompleted}
            onCancel={this.onCancel}
          >
            激活算法
          </Modal>
        </div>
      </div>
    );
  }
}

export default AlgorithmComponent;
