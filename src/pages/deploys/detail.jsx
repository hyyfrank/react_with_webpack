import React, { Component } from "react";
import { Breadcrumb, Divider, Select, Button } from "antd";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";

import fetchAllDevices from "../../services/devices";
import CanavasComponet from "./area";
import * as style from "../../css/deploys.less";

const { Option } = Select;
class DeployDetailComponent extends Component {
  constructor() {
    super();
    this.onChouzhenTimeChange = this.onChouzhenTimeChange.bind(this);
    this.onDetectTimeChange = this.onDetectTimeChange.bind(this);
    this.onActiveStatusChange = this.onActiveStatusChange.bind(this);
    this.clearMonitorArea = this.clearMonitorArea.bind(this);

    this.state = {
      basicInfo: {},
      detailCarema: {},
      monitorArea: []
    };
  }

  componentDidMount() {
    console.log("i am in detail didmount");
    const BASE_URL = "http://cvp.g2link.cn:20065"; // TODO: update to real base url.
    const { iotCode, algoName, gpu } = this.props;
    console.log(`detail iotCode get: ${iotCode}`);
    console.log(`detail algoName get: ${algoName}`);
    console.log(`detail gpu get: ${gpu}`);
    let algoDesc = "";
    if (algoName === "Platform") {
      algoDesc = "月台车辆分析";
    }
    if (algoName === "Road" || algoName === "Room") {
      algoDesc = "消防通道分析";
    }
    if (algoName === "WareHouse") {
      algoDesc = "仓库占用分析";
    }
    if (algoName === "HelmetEntrance") {
      algoDesc = "工地进出口安全帽分析";
    }
    if (algoName === "HelmetWork") {
      algoDesc = "工地作业区安全帽分析";
    }
    if (algoName === "StatusLight") {
      algoDesc = "状态灯检测";
    }
    this.setState({
      basicInfo: {
        IotCode: iotCode,
        algorithmName: algoDesc,
        GPU: gpu,
        monitorImageUrl: `${BASE_URL}/?filename=picture/${iotCode}.jpg`
      }
    });
    console.log(`${BASE_URL}/?filename=picture/${iotCode}.jpg`);
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

        const caremaDetailInfo = mockdata.response.detail.filter((item) => {
          return item.IoTCode === iotCode;
        });

        this.setState({
          detailCarema: caremaDetailInfo[0]
        });
        console.log(`filter carema:${JSON.stringify(caremaDetailInfo)}`);
        this.setState({ monitorArea: [...caremaDetailInfo[0].region] });
        // this.setState({ tableData: data.response.detail });
      }
    });
  }

  onChouzhenTimeChange(val) {
    console.log(`chouzhen select${val}`);
  }

  onDetectTimeChange(val) {
    console.log(`detect time select${val}`);
  }

  onActiveStatusChange(val) {
    console.log(`detect time select${val}`);
  }

  clearMonitorArea() {
    console.log("重新绘制");
  }

  render() {
    const { basicInfo, monitorArea } = this.state;
    const imageInfos = {
      imageUrl: basicInfo.monitorImageUrl,
      monitorArea
    };
    return (
      <div className={style.mainContent}>
        <div className={style.BreadcrumbPart}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/deploys">
              <PictureOutlined />
              <span>部署列表</span>
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/detail">
              <PictureOutlined />
              <span>详情</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={style.tableLayer}>
          <Divider orientation="left">基本信息</Divider>
          <div className={style.basicInfo}>
            <div className={style.basicInfoLayout}>
              <div>
                <span className={style.basicSubTitle}>园区：</span>
                <span className={style.basicSubContent}>北京-GTX1080Ti</span>
              </div>
              <div>
                <span className={style.basicSubTitle}>算法场景：</span>
                <span className={style.basicSubContent}>
                  {basicInfo.algorithmName}
                </span>
              </div>
              <div>
                <span className={style.basicSubTitle}>显存:</span>
                <span className={style.basicSubContent}>{basicInfo.GPU}G</span>
              </div>
            </div>
          </div>
          <Divider orientation="left">摄像机信息</Divider>
          <div className={style.IOTInfo}>
            <div className={style.iotInfoLayout}>
              <div className={style.editItemLayout}>
                <span className={style.basicSubTitle}>抽帧间隔：</span>
                <Select
                  defaultValue="5"
                  style={{ width: 120 }}
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
              <div className={style.editItemLayout}>
                <span className={style.basicSubTitleWithMargin}>
                  检测时间：
                </span>
                <Select
                  defaultValue="600"
                  style={{ width: 120 }}
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
              <div className={style.editItemLayout}>
                <span className={style.basicSubTitleWithMargin}>
                  激活状态：
                </span>
                <Select
                  defaultValue="false"
                  style={{ width: 120 }}
                  onChange={this.onActiveStatusChange}
                >
                  <Option value="true">true</Option>
                  <Option value="false">false</Option>
                </Select>
              </div>
            </div>
          </div>
          <Divider orientation="left">监控区域</Divider>
          <div className={style.monitorArea}>
            <div className={style.btnLayer}>
              <Button type="primary" onClick={this.clearMonitorArea}>
                重画
              </Button>
              <Divider type="vertical" />
              <Button type="primary" onClick={this.clearMonitorArea}>
                保存所有
              </Button>
            </div>
            <CanavasComponet {...imageInfos} />
          </div>
        </div>
      </div>
    );
  }
}

export default DeployDetailComponent;
