import React, { Component } from "react";
import { Table, Breadcrumb } from "antd";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import MachineList from "./list";

import * as style from "../../css/machines.less";

class MachineComponent extends Component {
  constructor() {
    super();
    this.state = {
      bottom: "bottomRight",
      isModalVisible: false,
      isDeleteVisiable: false,
      tableData: [],
    };
  }

  componentDidMount() {
    this.setState({ tableData: MachineList });
  }

  render() {
    const { bottom } = this.state;
    const columns = [
      {
        title: "机器地址",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "机器IP",
        dataIndex: "ip",
        key: "ip",
      },
      {
        title: "机器端口",
        dataIndex: "port",
        key: "port",
      },
      {
        title: "机器账户",
        dataIndex: "account",
        key: "account",
      },
      {
        title: "备注",
        dataIndex: "note",
        key: "note",
      },
      {
        title: "部署详情",
        dataIndex: "detail",
        key: "detail",
        // eslint-disable-next-line no-unused-vars
        render: (text) => {
          return (
            <Link to="#">
              <span>查看详情</span>
            </Link>
          );
        },
      },
    ];

    const { tableData } = this.state;
    return (
      <div className={style.mainContent}>
        <div className={style.BreadcrumbPart}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/machines">
              <PictureOutlined />
              <span>Machines</span>
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

export default MachineComponent;
