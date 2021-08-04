import React, { Component } from "react";
import { Table, Breadcrumb, Button, Select, Divider } from "antd";
import { HomeOutlined, PictureOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import StepsComponent from "./steps";
import {
  fetchServiceList,
  fetchSourceList,
  fetchServiceSupportList
} from "../../services/deploys";
import * as style from "../../css/deploys.less";

const { Option } = Select;

class DeploysComponent extends Component {
  constructor() {
    super();
    this.fetchData = this.fetchData.bind(this);
    this.addNewDeploy = this.addNewDeploy.bind(this);
    this.filterCurrentTable = this.filterCurrentTable.bind(this);
    this.createOkHandler = this.createOkHandler.bind(this);
    this.createCancelHandler = this.createCancelHandler.bind(this);
    this.onAlgorithmChange = this.onAlgorithmChange.bind(this);
    this.onCaremaChange = this.onCaremaChange.bind(this);
    this.resetTableData = this.resetTableData.bind(this);

    this.state = {
      isModalVisible: false,
      isDeleteVisiable: false,
      tableData: [],
      filterData: [],
      showStepPage: false,
      algoIdNameMapping: [],
      caremaList: [],
      bottom: "bottomRight",
      caremaSelected: "",
      algoSelected: ""
    };
  }

  componentDidMount() {
    this.fetchData();
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

  fetchData() {
    // step 1: load service support data to get all algorithms list from servicesCFG
    // step 2: load all service list data to get all the algorithms supported in this garden
    // step 3: load all the source list to get the all carema list
    // step 4: combine carema list with enabled algorithm mapping list to get the table data
    // step 5: filter page data via computerDidUpdate.
    const fetchAlgorithmPromise = fetchServiceSupportList();
    const fetchServicesPromise = fetchServiceList();
    const fetchSourcePromise = fetchSourceList();
    Promise.all([
      fetchAlgorithmPromise,
      fetchServicesPromise,
      fetchSourcePromise
    ])
      .then((values) => {
        const algorithmsList = values[0].data;
        const serviceList = values[1].data;
        const sourceList = values[2].data;
        // step 1: load service support data to get all algorithms list from servicesCFG
        const algoFieldIdMapping = [];
        const details = algorithmsList.response.detail;
        const isAlgoritmServer = sessionStorage.getItem("isAlgoritmServer");
        console.log(`isAlgo:${isAlgoritmServer}`);
        let serviceCFGList;
        if (isAlgoritmServer === "true") {
          serviceCFGList = details.servicesCFG;
        } else {
          serviceCFGList = details[0].servicesCFG;
        }
        serviceCFGList.map((item) => {
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
        console.log(`获取所有算法映射:${JSON.stringify(algoFieldIdMapping)}`);
        // step 2: load all service list data to get all the algorithms supported in this garden
        console.log(
          `获取service-list里支持的service：${JSON.stringify(
            serviceList.response.detail
          )}`
        );
        const enableIds = serviceList.response.detail.map((item) => item.ID);
        if (enableIds.includes(1) && !enableIds.includes(2)) {
          enableIds.push(2);
        }
        if (enableIds.includes(2) && !enableIds.includes(1)) {
          enableIds.push(1);
        }
        console.log(
          `从service list里找出可用的算法IDs:${JSON.stringify(enableIds)}`
        );
        const allEnabledAlgos = algoFieldIdMapping.filter((item) => {
          return enableIds.includes(item.ID);
        });
        console.log(`过滤后可用的算法列表: ${JSON.stringify(allEnabledAlgos)}`);
        this.setState({
          algoIdNameMapping: allEnabledAlgos
        });
        // step 3: load all the source list to get the all carema list
        console.log(
          ` 获取当前所有照相机列表：${JSON.stringify(
            sourceList.response.detail
          )}`
        );
        const tableData = [];
        sourceList.response.detail.map((item) => {
          for (let i = 0; i < allEnabledAlgos.length; i++) {
            if (item.serviceID === allEnabledAlgos[i].ID) {
              tableData.push({
                ...item,
                ...allEnabledAlgos[i]
              });
            }
          }
        });

        console.log(`通过ID关联后的表格数据: ${JSON.stringify(tableData)}`);
        this.setState({
          tableData,
          filterData: tableData,
          caremaList: tableData.map((item) => item.IoTCode)
        });
      })
      .catch((e) => {
        console.error(`promise all throws:${e}`);
      });
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
      caremaList,
      showStepPage,
      algoSelected,
      caremaSelected,
      filterData
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
          return <span>{text}</span>;
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
          if (
            record.algoName === "SpinSwitch" ||
            record.algoName === "LEDSegmentDisplays" ||
            record.algoName === "StatusLight"
          ) {
            return (
              <div>
                <Link to={`/deploys/instrument/${record.IoTCode}`}>
                  <span>编辑 </span>
                </Link>
              </div>
            );
          }
          return (
            <div>
              <Link to={`/deploys/detail/${record.IoTCode}`}>
                <span>编辑 </span>
              </Link>
            </div>
          );
        }
      }
    ];
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
          </div>
          <Table
            rowKey={(record) => record.IoTCode}
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
