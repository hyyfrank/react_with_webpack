import React, { Component } from "react";
import { Table, Breadcrumb } from "antd";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";

import fetchDeployedAlgorithm from "../../services/algorithm";
import * as style from "../../css/algorithm.less";

class AlgorithmComponent extends Component {
  constructor() {
    super();
    this.state = {
      bottom: "bottomRight",
      isModalVisible: false,
      isDeleteVisiable: false,
      tableData: [],
    };
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.showDeleteModal = this.showDeleteModal.bind(this);
    this.handleOkDelete = this.handleOkDelete.bind(this);
    this.handleCancelDelete = this.handleCancelDelete.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }

  componentDidMount() {
    const formData = new FormData();
    const obj = {
      type: "SERVICE_SUPPORT",
      ctrl_key: -1,
    };
    formData.append("req", JSON.stringify(obj));
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    fetchDeployedAlgorithm(formData, config).then(({ data }) => {
      console.log(`service list is:`);
      const res = data.response.detail.servicesCFG;
      console.log(res);
      this.setState({ tableData: res });
    });
  }

  handleOk() {
    this.setState({ isModalVisible: false });
  }

  handleCancel() {
    this.setState({ isModalVisible: false });
  }

  handleOkDelete(record) {
    console.log(`delete record${record}`);
    this.setState({ isDeleteVisiable: false });
  }

  handleCancelDelete() {
    this.setState({ isDeleteVisiable: false });
  }

  // eslint-disable-next-line class-methods-use-this
  onFinish() {
    console.log("record on finish.");
  }

  showDeleteModal(text, record) {
    console.log(`clicked${text},record is:${record}`);
    this.setState({ isDeleteVisiable: true });
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  render() {
    const { bottom } = this.state;
    const columns = [
      {
        title: "算法场景名称",
        dataIndex: "name",
        key: "name",
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
              <span className={style.helmetentrance}>工地进出口安全帽分析</span>
            );
          }
          if (name[0] === "HelmetWork") {
            return (
              <span className={style.helmetwork}>工地作业区安全帽分析</span>
            );
          }
          return <span>name</span>;
        },
      },
      {
        title: "算法类型",
        dataIndex: "Type",
        key: "Type",
        render: (text) => {
          if (text === "ObjectDetection") {
            return <span className={style.objectDetect}>对象检测</span>;
          }
          if (text === "Classification") {
            return <span className={style.classification}>分类算法</span>;
          }
          return <span className={style.others}>其他</span>;
        },
      },
      {
        title: "GPU需求",
        dataIndex: "GPUMemory",
        key: "GPUMemory",
        render: (text) => {
          return <span>{text}G</span>;
        },
      },
      {
        title: "最大负载",
        dataIndex: "MaxLoad",
        key: "MaxLoad",
      },
      {
        title: "描述",
        dataIndex: "Description",
        key: "Description",
      },
      {
        title: "启用状态",
        dataIndex: "Enable",
        key: "Enable",
        render: (text) => {
          if (text) {
            return <span className={style.enableAlgo}>已启用</span>;
          }
          return <span className={style.disableAlgo}>未启用</span>;
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
            <Breadcrumb.Item href="/algorithms">
              <PictureOutlined />
              <span>algorithms</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={style.tableLayer}>
          <Table
            columns={columns}
            // eslint-disable-next-line react/destructuring-assignment
            pagination={{ position: [bottom] }}
            dataSource={tableData}
          />
        </div>
      </div>
    );
  }
}

export default AlgorithmComponent;
