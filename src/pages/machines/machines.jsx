import React, { Component } from "react";
import { Table, Breadcrumb } from "antd";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";
import LoadingComponent from "../../common/Loading";
import { fetchGardenInfos } from "../../services/login";

import * as style from "../../css/machines.less";

class MachineComponent extends Component {
  constructor() {
    super();
    this.state = {
      bottom: "bottomRight",
      isModalVisible: false,
      isDeleteVisiable: false,
      tableData: [],
      isLoading: false
    };
  }

  componentDidMount() {
    const obj = { type: "SERVER_CONFIG" };
    this.setState({
      isLoading: true
    });
    fetchGardenInfos(obj).then(({ data }) => {
      this.setState({ tableData: data.response.detail ,isLoading: false});
    });
  }

  render() {
    const { bottom, isLoading} = this.state;
    //     DeviceCode: "20:04:0f:ed:7a:a8"
    // DeviceName: "上海南汇算法服务器1"
    // DeviceType: "月台检测"
    // HttpPort: 20077
    // ServerAddress: "cvp.g2link.cn"
    // SiteCode: "21127-01"
    // SiteName: "普洛斯南汇园中物流园1期"
    const columns = [
      {
        title: "园区地址",
        dataIndex: "SiteName",
        key: "SiteName",
        width: "15%",
        ellipsis: true
      },
      {
        title: "机器类型",
        dataIndex: "DeviceName",
        key: "DeviceName",
        width: "10%",
        render: (text) => {
          if (text.indexOf("算法") !== -1) {
            return <span>算法服务器</span>;
          }
          if (text.indexOf("抽帧") !== -1) {
            return <span>抽帧服务器</span>;
          }
          return <span>text</span>;
        }
      },
      {
        title: "设备类型",
        dataIndex: "DeviceType",
        key: "DeviceType",
        width: "15%",
        ellipsis: true
      },
      {
        title: "设备代码",
        dataIndex: "SiteCode",
        key: "SiteCode",
        width: "15%",
        ellipsis: true
      },
      {
        title: "服务器IP",
        dataIndex: "ServerAddress",
        key: "ServerAddress",
        width: "12%"
      },
      {
        title: "服务器端口",
        dataIndex: "HttpPort",
        key: "HttpPort",
        width: "10%"
      },

      {
        title: "部署详情",
        dataIndex: "detail",
        key: "detail",
        width: "8%",
        // eslint-disable-next-line no-unused-vars
        render: (text, record) => {
          return (
            <a href={`http://${record.ServerAddress}:${record.HttpPort}/UI`}>
              <span>查看详情</span>
            </a>
          );
        }
      }
    ];

    const { tableData } = this.state;

  return <div className={style.mainContent}>
      <div className={style.BreadcrumbPart}>
        <Breadcrumb>
          <Breadcrumb.Item href="/dashboard">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/machines">
            <PictureOutlined />
            <span>Machines</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      {isLoading ? 
      <LoadingComponent /> : <div className={style.tableLayer}>
          <Table
            rowKey={(record) => record.SiteCode}
            columns={columns}
            pagination={{ position: [bottom] }}
            dataSource={tableData}
          />
        </div>
      }
    </div>
  }
}

export default MachineComponent;
