/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
  Form, Input, InputNumber, Table, Tag, Space, Button, Modal, Breadcrumb
} from 'antd';
import { HomeOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import {
  InfoCircleOutlined,
} from '@ant-design/icons';
import * as style from '../../css/algorithm.less';

class VideoComponent extends React.Component {
  constructor() {
    super();
    this.state = {
      bottom: 'bottomRight',
      isModalVisible: false,
      isDeleteVisiable: false,
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
    // console.log("---------yahoo---------");
    // axios.get("https://weather-ydn-yql.media.yahoo.com/forecastrss?location=sunnyvale,ca&format=json").then((data)=>{
    //   console.log("data:"+data)
    // })
    // console.log("---------yahoo---------");
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
    console.log('record on finish.');
  }

  showDeleteModal(text, record) {
    console.log(`clicked${text},record is:${record}`);
    this.setState({ isDeleteVisiable: true });
  }

  showModal() {
    this.setState({ isModalVisible: true });
  }

  render() {
    const columns = [
      {
        title: '流地址',
        dataIndex: 'address',
        key: 'address',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'IoT代码',
        dataIndex: 'iotcode',
        key: 'iotcode',
      },
      {
        title: '抽帧间隔',
        dataIndex: 'interval',
        key: 'interval',
      },
      {
        title: '检测时间',
        dataIndex: 'detect',
        key: 'detect',
      },
      {
        title: '算法服务',
        dataIndex: 'algorithm',
        key: 'algorithm',
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <Space size="middle">
            <a>修改监控区域 </a>|<a>修改配置</a>|<a onClick={()=>{this.showDeleteModal(text, record);}}>删除</a>
          </Space>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        address: 'rtsp://user:pass@ip',
        iotcode: '21097000661',
        interval: '5',
        detect: '600s',
        algorithm: 'Room'
      },
      {
        key: '2',
        address: 'rtsp://user:pass@ip',
        iotcode: '21097000661',
        interval: '5',
        detect: '600s',
        algorithm: 'StatusLight'
      },
      {
        key: '3',
        address: 'rtsp://user:pass@ip',
        iotcode: '21097000661',
        interval: '5',
        detect: '600s',
        algorithm: 'SpinSwitch'
      },
      
    ];

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
      /* eslint-disable no-template-curly-in-string */
    const validateMessages = {
      required: '${label} is required!',
      types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
      },
      number: {
        range: '${label} must be between ${min} and ${max}',
      },
    };
    return (
      <div className={style.mainContent}>
         <div className={style.BreadcrumbPart}>
          <Breadcrumb>
            <Breadcrumb.Item href="/">
              <HomeOutlined />
            </Breadcrumb.Item>
            <Breadcrumb.Item href="/videos">
              <VideoCameraAddOutlined />
              <span>videos</span>
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <div className={style.btnLayer}>
          <Button type="primary" className={style.addBtn} onClick={this.showModal}>新增</Button>
        </div>
        <div className={style.tableLayer}>
          <Table
            columns={columns}
            // eslint-disable-next-line react/destructuring-assignment
            pagination={{ position: [this.state.bottom] }}
            dataSource={data}
          />
        </div>
        <Modal title="新增视频" mask visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
            <Form.Item
              name={['user', 'name']}
              label="流地址"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'email']}
              label="IoT地址 "
              rules={[
                {
                  type: 'email',
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={['user', 'age']}
              label="抽帧间隔"
              rules={[
                {
                  type: 'number',
                  min: 0,
                  max: 99,
                },
              ]}
            >
              <InputNumber />
            </Form.Item>
            <Form.Item name={['user', 'website']} label="检测时间">
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="算法服务">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
        <Modal title="删除" mask visible={this.state.isDeleteVisiable} onOk={this.handleOkDelete} onCancel={this.handleCancelDelete}>
          <p>
            <InfoCircleOutlined />
            <span className={style.delInfo}>确认要删除该视频？</span>
          </p>
        </Modal>
      </div>
    );
  }
}


export default VideoComponent;
