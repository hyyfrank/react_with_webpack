import React, { PureComponent } from "react";

import { Steps, Modal, Divider, Select } from "antd";

import * as style from "../../css/steps.less";

const { Step } = Steps;
const { Option } = Select;
class StepsComponent extends PureComponent {
  constructor() {
    super();
    this.onCompleted = this.onCompleted.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.next = this.next.bind(this);
    this.onAlgorithmChange = this.onAlgorithmChange.bind(this);
    this.onCaremaChange = this.onCaremaChange.bind(this);
    this.state = {
      current: 2
    };
  }

  onCompleted() {
    console.log("start to send to parent page info....");
    const { createOkHandler } = this.props;

    createOkHandler("abcd");
  }

  onCancel() {
    console.log("handle cancel");
    this.setState({
      showFlag: false
    });
  }

  onAlgorithmChange() {
    const { current } = this.state;
    this.setState({
      current: current + 1
    });
  }

  onCaremaChange() {
    const { current } = this.state;
    this.setState({
      current: current + 1
    });
  }

  next() {
    const { current } = this.state;
    this.setState({
      current: current + 1
    });
  }

  render() {
    const { isModalVisible, algoMapping, caremaMapping } = this.props;
    const { current } = this.state;
    const steps = [
      {
        title: "选择园区",
        content: "园区下拉框"
      },
      {
        title: "选择机器",
        content: "机器下拉框"
      },
      {
        title: "选择算法",
        content: "算法下拉框"
      },
      {
        title: "选择相机",
        content: "相机下拉框"
      },
      {
        title: "完成",
        content: ""
      }
    ];
    const caremaOptions = [];
    const algorithmsOptions = [];
    caremaMapping.map((item) => {
      caremaOptions.push(
        <Option key={item} value={item}>
          {item}
        </Option>
      );
    });

    algoMapping.map((item) => {
      algorithmsOptions.push(
        <Option key={item.ID} value={item.ID}>
          {item.algoName}
        </Option>
      );
    });
    console.log(`modal status from props: ${isModalVisible}`);
    return (
      <div>
        <Modal
          title="部署新的算法服务"
          visible={isModalVisible}
          onOk={this.onCompleted}
          onCancel={this.onCancel}
          width={900}
        >
          <div className={style.modalLayout}>
            <div className={style.leftSteps}>
              <Steps direction="vertical" current={current}>
                {steps.map((item) => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
            </div>

            <div className={style.rightContent}>
              <div className={style.modalItem}>
                <Divider orientation="left">选择园区</Divider>
                <div className={style.selectArea}>
                  <span className={style.itemLabel}>园区:</span>
                  <Select
                    defaultValue="北京-GTX1080Ti"
                    value="北京-GTX1080Ti"
                    style={{ width: 240 }}
                    disabled
                  >
                    <Option value="北京-GTX1080Ti">北京-GTX1080Ti</Option>
                  </Select>
                </div>
              </div>
              <div className={style.modalItem}>
                <Divider orientation="left">选择机器</Divider>
                <div className={style.selectArea}>
                  <span className={style.itemLabel}>机器:</span>
                  <Select
                    value="124.204.79.221"
                    style={{ width: 240 }}
                    disabled
                  >
                    <Option value="1">124.204.79.221</Option>
                  </Select>
                </div>
              </div>
              <div className={style.modalItem}>
                <Divider orientation="left">选择算法</Divider>
                <div className={style.selectArea}>
                  <span className={style.itemLabel}>算法:</span>
                  <Select
                    showSearch
                    defaultValue=""
                    style={{ width: 240 }}
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
              <div className={style.modalItem}>
                <Divider orientation="left">选择相机</Divider>
                <div className={style.selectArea}>
                  <span className={style.itemLabel}>相机:</span>
                  <Select
                    showSearch
                    defaultValue=""
                    style={{ width: 240 }}
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
              <div className={style.modalItem}>
                <Divider orientation="left">完成</Divider>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
export default StepsComponent;
