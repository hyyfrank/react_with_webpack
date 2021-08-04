import React, { PureComponent } from "react";
import {
  Row,
  Col,
  Pagination,
  Select,
  Button,
  Breadcrumb,
  Image as AntdImage,
  message
} from "antd";
import { DownOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import * as style from "../../css/dashboard.less";
import fetchDashboardList from "../../services/dashboard";
import APICONST from "../../services/APIConst";

const { Option } = Select;
const { BASE_URL } = APICONST;

class DashboardComponent extends PureComponent {
  constructor() {
    super();
    this.onPageChange = this.onPageChange.bind(this);
    this.onTimeChange = this.onTimeChange.bind(this);
    this.onCaremaChange = this.onCaremaChange.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.loadCertainDayData = this.loadCertainDayData.bind(this);
    this.confirmFilter = this.confirmFilter.bind(this);
    this.getImageFullAddress = this.getImageFullAddress.bind(this);
    this.getImageInfos = this.getImageInfos.bind(this);
    this.updateIotTableData = this.updateIotTableData.bind(this);
    this.loadMore = this.loadMore.bind(this);
    this.fetchDataAndFilter = this.fetchDataAndFilter.bind(this);
    this.state = {
      rawData: [], // 过滤前的数据，单纯从day请求来的数据
      caremaStatus: false, // 默认相机下拉框可选
      tableData: [], // 过滤后数据，某一天的carema的图片的数据信息，用于加载和分页
      channels: [], // 下拉框的iot 相机列表
      current: "", // 当前相机
      day: 0, // 哪一天
      paginationData: [], // 当前分页的数据
      PAGE_SIZE: 3, // 每一页几个，一行表示一个
      page: 1, // 默认页
      loadmorePage: 1, // 加载更多的默认页
      shouldLoadMore: true, // 是否到了最后一页，不能加载更多
      type: "img" // 加载类型，图片或者视频
    };
  }

  componentDidMount() {
    this.loadCertainDayData(0).then(() => {
      const { current } = this.state;
      this.fetchDataAndFilter(current, "img");
    });
  }

  onPageChange(pageNumber) {
    this.setState({ page: pageNumber });
    const { tableData, PAGE_SIZE } = this.state;
    const lastIndex =
      PAGE_SIZE * pageNumber > tableData.length
        ? tableData.length
        : PAGE_SIZE * pageNumber;
    if (lastIndex === tableData.length) {
      this.setState({ shouldLoadMore: false });
    } else {
      this.setState({ shouldLoadMore: true });
    }
    const tmp = tableData.slice(PAGE_SIZE * (pageNumber - 1), lastIndex);
    this.setState({ paginationData: [...tmp] });
    this.setState({ loadmorePage: pageNumber });
  }

  onTimeChange(newDay) {
    this.loadCertainDayData(newDay);
  }

  onCaremaChange(value) {
    this.setState({ current: value });
  }

  onTypeChange(value) {
    this.setState({ type: value });
  }

  getImageFullAddress(day, item, type) {
    let mkey = "";
    if (type === "img") {
      mkey = "jpg";
    }
    // eslint-disable-next-line no-prototype-builtins
    if (item.hasOwnProperty("jpg_D")) {
      mkey = "jpg_D";
    }
    if (type === "video") {
      mkey = "mp4";
    }
    if (parseInt(day, 10) === 0) {
      return `${BASE_URL}/?filename=${item[mkey]}`;
    }
    return `${BASE_URL}/?filename=./${day}/${item[mkey]}`;
  }

  // eslint-disable-next-line no-unused-vars
  getFreeImageFullAddress(day, imageSrc, type) {
    // console.log(`type could be ${type}`);
    if (parseInt(day, 10) === 0) {
      return `${BASE_URL}/?filename=${imageSrc}`;
    }
    return `${BASE_URL}/?filename=./${day}/${imageSrc}`;
  }

  getImageInfos(obj) {
    // possible need different description for different type.
    let plateClassDesc = "";
    const len = obj.result.length;
    for (let i = 0; i < len; i++) {
      if (obj.result[i].class === "plate") {
        if (len === 1) {
          plateClassDesc += `${obj.result[i].license.license_s}`;
        } else {
          plateClassDesc += `,${obj.result[i].license.license_s}`;
        }
      }
    }
    return `[${obj.eventserial}],${obj.event},${obj.time}${plateClassDesc}`;
  }

  getFreeImageByEventSerial(datas, serialId, type) {
    const jpgs = [];
    const { day } = this.state;
    datas.filter((item) => {
      if (item.eventserial === serialId && item.event === "FREE") {
        if (item.hasOwnProperty("jpgs") && item.jpgs.length > 0) {
          const imgs = [].concat(item.jpgs);
          for (let i = 0; i < imgs.length; i++) {
            const imageSrc = this.getFreeImageFullAddress(day, imgs[i], type);
            new Image().src = imageSrc;
            jpgs.push({
              img: imageSrc,
              info: this.getImageInfos(item)
            });
          }
        } else {
          const imgSrc = this.getFreeImageFullAddress(day, item.jpg, type);
          new Image().src = imgSrc;
          jpgs.push({
            img: imgSrc,
            info: this.getImageInfos(item)
          });
        }
      }
    });
    return jpgs;
  }

  updateIotTableData(iotTableData, type) {
    const { day, PAGE_SIZE } = this.state;
    const newTableData = [];
    iotTableData.map((item) => {
      if (item.event === "TAKEUP") {
        const tmpImage = new Image();
        tmpImage.src = this.getImageFullAddress(day, item, type);
        newTableData.push({
          eventserial: item.eventserial,
          src: this.getImageFullAddress(day, item, type),
          infos: this.getImageInfos(item),
          color: "red",
          imgElement: tmpImage,
          related: this.getFreeImageByEventSerial(
            iotTableData,
            item.eventserial,
            type
          )
        });
      }
    });
    newTableData.reverse();

    this.setState({
      tableData: newTableData,
      paginationData: newTableData.slice(0, PAGE_SIZE)
    });
  }

  fetchDataAndFilter(carema, type) {
    const { rawData } = this.state;
    // 3. filter the data via carema
    const iotRawTableData = [];
    rawData.map((item) => {
      if (item.hasOwnProperty("config")) {
        if (item.config.IoTCode === carema) {
          iotRawTableData.push(item);
        }
      }
    });
    // 4. filter the data via type and reframe the data to new structure
    this.updateIotTableData(iotRawTableData, type);
    // sessionStorage.setItem(1,rawData)
  }

  loadMore() {
    const {
      paginationData,
      PAGE_SIZE,
      tableData,
      shouldLoadMore,
      loadmorePage
    } = this.state;
    const nextPageNum = loadmorePage + 1;

    const lastIndex =
      PAGE_SIZE * nextPageNum > tableData.length
        ? tableData.length
        : PAGE_SIZE * nextPageNum;
    if (shouldLoadMore) {
      const nextPageData = tableData.slice(
        PAGE_SIZE * (nextPageNum - 1),
        lastIndex
      );
      const tmp = paginationData.concat(nextPageData);

      this.setState({ paginationData: [...tmp] });
    }

    if (lastIndex === tableData.length) {
      message.info("提示:最后一页已加载,不能再下拉了！");
      this.setState({ shouldLoadMore: false });
    }
    this.setState({ loadmorePage: nextPageNum });
  }

  loadCertainDayData(newDay) {
    this.setState({ day: newDay });
    // 0. disabled carema droplist
    this.setState({ caremaStatus: true });
    // let isInCache = sessionStorage.getItem(newDay) == null ? false : true;

    // if(isInCache){
    //   this.setState({
    //     tableData: sessionStorage.getItem(newDay)
    //   })
    // }
    // 1. didn't find in cache, so we request via ajax
    return fetchDashboardList(newDay).then(({ data }) => {
      const arrData = [];
      data
        .trim()
        .split("\n")
        .forEach((v) => {
          if (v.length > 0) {
            arrData.push(JSON.parse(v));
          }
        });
      const newOneDayRawData = arrData.filter((item) => {
        return item.event !== "DISCONNECTED";
      });
      const tmpChannels = [];
      // 2. fill the carema list
      newOneDayRawData.map((item) => {
        if (Object.prototype.hasOwnProperty.call(item, "config")) {
          if (!tmpChannels.includes(item.config.IoTCode)) {
            tmpChannels.push(item.config.IoTCode);
          }
        }
      });
      // 3. fill the carema dropdown list
      this.setState({ channels: tmpChannels });
      this.setState({ current: tmpChannels[0] });

      // 4. didn't find in cache, so we request via ajax
      this.setState({
        rawData: [...newOneDayRawData]
      });

      // enable carema droplist and set default value.
      this.setState({
        channels: tmpChannels,
        current: tmpChannels[0],
        caremaStatus: false
      });
    });
  }

  confirmFilter() {
    const { current, type } = this.state;
    this.setState({
      page: 1,
      loadmorePage: 1,
      shouldLoadMore: true
    });
    this.fetchDataAndFilter(current, type);
  }

  render() {
    // channel list init
    const channelList = [];
    const {
      page,
      tableData,
      channels,
      type,
      current,
      PAGE_SIZE,
      paginationData,
      caremaStatus
    } = this.state;
    const images = [];
    const videos = [];
    if (channels.length > 0) {
      for (let i = 0; i < channels.length; i++) {
        channelList.push(
          <Option key={channels[i]} value={channels[i]}>
            {channels[i]}
          </Option>
        );
      }
    }
    if (type === "img") {
      for (let i = 0; i < paginationData.length; i++) {
        images.push(
          <Row key={`rowkey${i}`}>
            <Col key={`col1${i}`} span={6}>
              <div className={style.takeColor}>
                <AntdImage src={`${paginationData[i].src}`} />
                <span>{paginationData[i].infos}</span>
              </div>
            </Col>
            <Col key={`col2${i}`} span={6}>
              {paginationData[i].related.length > 0 ? (
                <div className={style.freeColor}>
                  <AntdImage src={`${paginationData[i].related[0].img}`} />
                  <span>{paginationData[i].related[0].info}</span>
                </div>
              ) : (
                <span />
              )}
            </Col>
            <Col key={`col3${i}`} span={6}>
              {paginationData[i].related.length > 1 ? (
                <div className={style.freeColor}>
                  <AntdImage src={`${paginationData[i].related[1].img}`} />
                  <span>{paginationData[i].related[1].info}</span>
                </div>
              ) : (
                <span />
              )}
            </Col>
            <Col key={`col4${i}`} span={6}>
              {paginationData[i].related.length > 2 ? (
                <div className={style.freeColor}>
                  <AntdImage src={`${paginationData[i].related[2].img}`} />
                  <span>{paginationData[i].related[1].info}</span>
                </div>
              ) : (
                <span />
              )}
            </Col>
          </Row>
        );
      }
    } else {
      for (let i = 0; i < paginationData.length; i++) {
        videos.push(
          <Row key={`rowkey${i}`}>
            <Col key={`col${i}`} span={6}>
              <div className={style.takeColor}>
                <video src={`${paginationData[i].src}`}>
                  <track kind="captions" />
                </video>
                <span>{paginationData[i].infos}</span>
              </div>
            </Col>
            <Col key={`col${i}`} span={6}>
              {paginationData[i].related.length > 0 ? (
                <div className={style.freeColor}>
                  <video src={`${paginationData[i].related[0].img}`}>
                    <track kind="captions" />
                  </video>
                  <span>{paginationData[i].related[0].info}</span>
                </div>
              ) : (
                <span />
              )}
            </Col>
            <Col key={`col${i}`} span={6}>
              {paginationData[i].related.length > 1 ? (
                <div className={style.freeColor}>
                  <video src={`${paginationData[i].related[1].img}`}>
                    <track kind="captions" />
                  </video>
                  <span>{paginationData[i].related[1].info}</span>
                </div>
              ) : (
                <span />
              )}
            </Col>
            <Col key={`col${i}`} span={6}>
              {paginationData[i].related.length > 2 ? (
                <div className={style.freeColor}>
                  <video src={`${paginationData[i].related[2].img}`}>
                    <track kind="captions" />
                  </video>
                  <span>{paginationData[i].related[1].info}</span>
                </div>
              ) : (
                <span />
              )}
            </Col>
          </Row>
        );
      }
    }

    return (
      <div className={style.dashboard}>
        <div className={style.BreadcrumbPart}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/dashboard">
              <UserOutlined />
              <span>dashboard</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={style.filterBlock}>
          <div className={style.filterblock}>
            <span className={style.selectTimeText}>选择时间:</span>
            <Select
              showSearch
              defaultValue="0"
              style={{ width: 200 }}
              placeholder="Select a timeperiod"
              optionFilterProp="children"
              onChange={this.onTimeChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option key="0" value="0">
                今天
              </Option>
              <Option key="1" value="1">
                最近1天
              </Option>
              <Option key="2" value="2">
                最近2天
              </Option>
              <Option key="3" value="3">
                最近3天
              </Option>
              <Option key="4" value="4">
                最近4天
              </Option>
              <Option key="5" value="5">
                最近5天
              </Option>
              <Option key="6" value="6">
                最近6天
              </Option>
              <Option key="7" value="7">
                最近7天
              </Option>
              <Option key="8" value="8">
                最近8天
              </Option>
              <Option key="9" value="9">
                最近9天
              </Option>
              <Option key="10" value="10">
                最近10天
              </Option>
              <Option key="11" value="11">
                最近11天
              </Option>
              <Option key="12" value="12">
                最近12天
              </Option>
              <Option key="13" value="13">
                最近13天
              </Option>
              <Option key="14" value="14">
                最近14天
              </Option>
              <Option key="15" value="15">
                最近15天
              </Option>
            </Select>
          </div>

          <div className={style.filterblock}>
            <span className={style.selectTimeText}>相机:</span>
            <Select
              showSearch
              value={current}
              disabled={caremaStatus}
              style={{ width: 200 }}
              placeholder="Select a carema"
              optionFilterProp="children"
              onChange={this.onCaremaChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {channelList}
            </Select>
          </div>

          <div className={style.filterblock}>
            <span className={style.selectTimeText}>类型:</span>
            <Select
              showSearch
              defaultValue="img"
              style={{ width: 200 }}
              placeholder="选择类型"
              optionFilterProp="children"
              onChange={this.onTypeChange}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option key="0" value="img">
                图像
              </Option>
              <Option key="1" value="video" disabled>
                视频
              </Option>
            </Select>
          </div>

          <div>
            <Button type="link" onClick={this.confirmFilter}>
              确定
            </Button>
          </div>
        </div>
        <div className={style.imagesPart}>
          <Row gutter={[8, 8]}>{type === "img" ? images : videos}</Row>
        </div>
        <div className={style.rightPosition}>
          <span className={style.downoutline}>
            <a href="#" onClick={this.loadMore}>
              <DownOutlined />
            </a>
          </span>
          <Pagination
            defaultCurrent={page}
            pageSize={PAGE_SIZE}
            total={tableData.length}
            onChange={this.onPageChange}
          />
        </div>
      </div>
    );
  }
}

export default DashboardComponent;
