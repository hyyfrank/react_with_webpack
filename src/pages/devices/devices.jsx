import React, { Component } from "react";
import { Table, Breadcrumb, Button, Modal, Input, Select } from "antd";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import fetchAllDevices from "../../services/devices";
import * as style from "../../css/devices.less";

const { Option } = Select;
class DevicesComponent extends Component {
  constructor() {
    super();
    this.addNewCarema = this.addNewCarema.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onChouzhenTimeChange = this.onChouzhenTimeChange.bind(this);
    this.onDetectTimeChange = this.onDetectTimeChange.bind(this);
    this.state = {
      bottom: "bottomRight",
      isModalVisible: false,
      isDeleteVisiable: false,
      tableData: [],
      isCreateModalVisible: false,
      algoMapping: []
    };
  }

  componentDidMount() {
    const formData = new FormData();
    const obj = {
      type: "SOURCE_LIST",
      ctrl_key:
        sessionStorage.getItem("ctrl_key") == null
          ? -1
          : Number(sessionStorage.getItem("ctrl_key"))
    };
    formData.append("req", JSON.stringify(obj));

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
        this.setState({ tableData: mockdata.response.detail });
        // this.setState({ tableData: data.response.detail });
      }
    });
  }

  onCompleted() {
    console.log("create new carema.");
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
  }

  onDetectTimeChange(val) {
    console.log(`detect time change ${val}`);
  }

  addNewCarema() {
    console.log("add new carema...");
    this.setState({
      isModalVisible: true
    });
  }

  render() {
    const { bottom, isModalVisible, algoMapping } = this.state;
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
          if (name === "Road" || name === "Room") {
            return <span className={style.road}>消防通道分析</span>;
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
          if (name === "StatusLight") {
            return <span className={style.helmetwork}>状态灯检测</span>;
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
        render: (text) => {
          return (
            <Link to="#">
              <span>查看详情</span>
            </Link>
          );
        }
      }
    ];

    const { tableData } = this.state;
    const algorithmsOptions = [];
    algoMapping.map((item) => {
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
          >
            <div className={style.items}>
              <div className={style.item}>
                <div className={style.labelName}>Video:</div>
                <Input
                  className={style.inputStyle}
                  placeholder="rtsp://user:pass@ip"
                />
              </div>
              <div className={style.item}>
                <div className={style.labelName}>IoTCode:</div>
                <Input className={style.inputStyle} placeholder="XXXXXXXX" />
              </div>
              <div className={style.item}>
                <div className={style.labelName}>Algorithm:</div>
                <Select
                  showSearch
                  defaultValue=""
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
              <div className={style.item}>
                <div className={style.labelName}>Interval:</div>
                <Select
                  defaultValue="5"
                  style={{ width: 200 }}
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
                  style={{ width: 200 }}
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
