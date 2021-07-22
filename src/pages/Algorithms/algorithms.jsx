import React, { Component } from "react";
import { Table, Breadcrumb, Tooltip, Button, message, Modal } from "antd";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
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

        const supportDatas = algoTableDatas.filter((item) => {
          for (let i = 0; i < supportedAlgoIds.length; i++) {
            if (supportedAlgoIds[i].length === 1) {
              if (item.ID.includes(supportedAlgoIds[i][0])) {
                return item;
              }
            }
            if (supportedAlgoIds[i].length === 2 && item.ID.length === 2) {
              if (
                supportedAlgoIds[i][0] === item.ID[0] &&
                supportedAlgoIds[i][1] === item.ID[1]
              )
                return item;
            }
          }
          return null;
        });
        // flatten the array
        const flatternArray = [];
        supportDatas.map((item) => {
          if (Array.isArray(item.ID)) {
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
        const isAlgoritmServer = sessionStorage.getItem("isAlgoritmServer");
        // reframe the cloudURL structure
        let afterTuozhen = [];
        if (isAlgoritmServer === "false") {
          const cloudURL = data.response.detail[2].CloudURL;
          const cloudURLWithId = [];
          cloudURL.map((item) => {
            const cloudObj = { ...item, id: -1, itemName: "" };
            if (item.name[0] === "Platform") {
              cloudObj.id = 0;
              cloudObj.itemName = "Platform";
              cloudURLWithId.push(cloudObj);
              return;
            }
            if (item.name[0] === "WareHouse") {
              cloudObj.id = 3;
              cloudObj.itemName = "WareHouse";
              cloudURLWithId.push(cloudObj);
              return;
            }
            // TODO: Need to add other condition
            if (item.name[0] === "Instruments") {
              cloudObj.id = 7;
              cloudObj.itemName = "Instruments";
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
          });

          console.log(`cloudurl with id: ${JSON.stringify(cloudURLWithId)}`);
          // add cloud url to the data
          supportDataList.map((item) => {
            for (let i = 0; i < cloudURLWithId.length; i++) {
              if (item.ID === cloudURLWithId[i].id) {
                const it = {
                  ...item,
                  cloudUrl: cloudURLWithId[i].url
                };
                afterTuozhen.push(it);
              }
            }
          });
        } else {
          afterTuozhen = [...supportDataList];
        }

        console.log(`after tuozhen:${JSON.stringify(afterTuozhen)}`);

        // enable id setting

        const allEnabledServices = data.response.detail[1].WorkCFG.services;
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
                  <Link to="/deploys">Detail</Link>
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
