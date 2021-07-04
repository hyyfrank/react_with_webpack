/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
  Form, Input, InputNumber, Table, Tag, Space, Button, Modal,
} from 'antd';
import {
  InfoCircleOutlined,
} from '@ant-design/icons';
import * as style from '../../css/algorithm.less';

class AlgorithmComponent extends React.Component {
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
        title: '服务名称',
        dataIndex: 'name',
        key: 'name',
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        render: (text) => <a>{text}</a>,
      },
      {
        title: '监控种类',
        dataIndex: 'type',
        key: 'type',
      },
      {
        title: '监控地址',
        dataIndex: 'url',
        key: 'url',
      },
      {
        title: '监控内容',
        dataIndex: 'monitor',
        key: 'monitor',
      },
      {
        title: '显存',
        dataIndex: 'gpu',
        key: 'gpu',
      },
      {
        title: '标签',
        key: 'tags',
        dataIndex: 'tags',
        render: (tags) => (
          <span>
            {tags.map((tag) => {
              let color = tag.length > 5 ? 'geekblue' : 'green';
              if (tag === '月台') {
                color = 'volcano';
              }
              if (tag === '视频') {
                color = 'geekblue';
              }
              return (
                <Tag color={color} key={tag}>
                  {tag.toUpperCase()}
                </Tag>
              );
            })}
          </span>
        ),
      },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          // eslint-disable-next-line react/jsx-no-comment-textnodes
          <Space size="middle">
            // eslint-disable-next-line
            // eslint-disable-next-line arrow-spacing
            // eslint-disable-next-line jsx-a11y/no-static-element-interactions
            <span onClick={() => { this.showDeleteModal(text, record); }}>删除</span>
          </Space>
        ),
      },
    ];

    const data = [
      {
        key: '1',
        name: '消防轩状态',
        type: '图像',
        url: 'http://124.204.79.2/upload',
        monitor: '监控区域内的状态指示灯亮暗',
        gpu: '5G',
        tags: ['月台', '分析服务'],
      },
      {
        key: '2',
        name: '消防通道',
        type: '视频',
        url: 'http://124.204.79.2/reference',
        monitor: '监控区域内的状态指示灯亮暗',
        gpu: '4G',
        tags: ['视频', '分析服务'],
      },
      {
        key: '3',
        name: '消防轩状态指示灯',
        type: '图像',
        url: 'http://124.204.79.2/upload',
        monitor: '监控区域内的状态指示灯亮暗',
        gpu: '5G',
        tags: ['月台', '分析服务'],
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
        <Modal title="新增算法服务" mask visible={this.state.isModalVisible} onOk={this.handleOk} onCancel={this.handleCancel}>
          <Form {...layout} name="nest-messages" onFinish={this.onFinish} validateMessages={validateMessages}>
            <Form.Item
              name={['user', 'name']}
              label="Name"
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
              label="Email"
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
              label="Age"
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
            <Form.Item name={['user', 'website']} label="Website">
              <Input />
            </Form.Item>
            <Form.Item name={['user', 'introduction']} label="Introduction">
              <Input.TextArea />
            </Form.Item>
          </Form>
        </Modal>
        <Modal title="删除" mask visible={this.state.isDeleteVisiable} onOk={this.handleOkDelete} onCancel={this.handleCancelDelete}>
          <p>
            <InfoCircleOutlined />
            确认要删除该算法服务？
          </p>
        </Modal>
      </div>
    );
  }
}

export default AlgorithmComponent;
