/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Form, Input, InputNumber, Tag, Space, Button, Modal, Breadcrumb,
  Table, Popconfirm, Typography
} from 'antd';
import { HomeOutlined, VideoCameraAddOutlined } from '@ant-design/icons';
import {
  InfoCircleOutlined,
} from '@ant-design/icons';
import * as style from '../../css/algorithm.less';

  const VideoComponent = () =>{ 
    const [IsModalVisible,setIsModalVisible] = useState(false);
    const [IsDeleteVisiable,setIsDeleteVisiable] = useState(false);


    const showModal = () => {
      setIsModalVisible(true);
    }
  
    // eslint-disable-next-line class-methods-use-this
    const onFinish = () => {
      console.log('record on finish.');
    }
  
    const AddBtn = () => {
      
      return (<Button type="primary" className={style.addBtn} onClick={()=>{setIsModalVisible(true)}}>新增</Button>);
    }
    const AddBtnModal = () => {
      return (<Modal title="新增视频" mask visible={IsModalVisible} onOk={()=>{setIsModalVisible(false)}} onCancel={()=>{setIsModalVisible(false)}}>
      <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
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
    </Modal>);
    }
    const DelBtnModal =() => {
      return (<Modal title="删除" mask visible={IsDeleteVisiable} onOk={()=>{setIsDeleteVisiable(false);}} onCancel={()=>{setIsDeleteVisiable(false);}}>
      <p>
        <InfoCircleOutlined />
        <span className={style.delInfo}>确认要删除该视频？</span>
      </p>
    </Modal>);
      
    }
    //edit form start
    const EditableCell = ({
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    }) => {
      const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
    const originData = [
      {
        key: '1',
        address: 'rtsp://user:pass@ip',
        iotcode: '21097000661',
        interval: '5',
        detect: '600',
        algorithm: 'Room'
      },
      {
        key: '2',
        address: 'rtsp://user:pass@ip',
        iotcode: '21097000661',
        interval: '5',
        detect: '600',
        algorithm: 'StatusLight'
      },
      {
        key: '3',
        address: 'rtsp://user:pass@ip',
        iotcode: '21097000661',
        interval: '5',
        detect: '600',
        algorithm: 'SpinSwitch'
      },
    ];
    const EditableTable = () => {
      const [form] = Form.useForm();
      const [data, setData] = useState(originData);


      const [editingKey, setEditingKey] = useState('');

      const isEditing = (record) => record.key === editingKey;

      const edit = (record) => {
        form.setFieldsValue({
          address: '',
          iotcode: '',
          interval: '',
          detect:'',
          algorithm:'',
          ...record,
        });
        setEditingKey(record.key);
      };

      const cancel = () => {
        setEditingKey('');
      };

      const save = async (key) => {
        try {
          const row = await form.validateFields();
          const newData = [...data];
          const index = newData.findIndex((item) => key === item.key);

          if (index > -1) {
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            setData(newData);
            setEditingKey('');
          } else {
            newData.push(row);
            setData(newData);
            setEditingKey('');
          }
        } catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      };
      //end of edit form
    const columns = [
      {
        title: '流地址',
        dataIndex: 'address',
        key: 'address',
        editable: true,
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'IoT代码',
        dataIndex: 'iotcode',
        key: 'iotcode',
        editable: true,
      },
      {
        title: '抽帧间隔',
        dataIndex: 'interval',
        key: 'interval',
        editable: true,
      },
      {
        title: '检测时间',
        dataIndex: 'detect',
        key: 'detect',
        editable: true,
      },
      {
        title: '算法服务',
        dataIndex: 'algorithm',
        key: 'algorithm',
        editable: true,
      },
      {
        title: '操作',
        key: 'action',
        width: '25%',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <a
                href="javascript:;"
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                保存
              </a>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>取消</a>
              </Popconfirm>
            </span>
          ) : (
            <Space size="middle">
              
              <Link to={`/videos/monitorarea/1`} activeClassName="active">修改监控区域</Link>|
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
              修改配置
              </Typography.Link>|
              <Typography.Link disabled={editingKey !== ''} onClick={()=>{setIsDeleteVisiable(true)}}>删除</Typography.Link>
            </Space>
          );
      },
    }
    ];

    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
  
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: (col.dataIndex === 'interval'||col.dataIndex === 'detect') ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    return (
      <Form form={form} component={false}>
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    );
  };


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
          <AddBtn />
        </div>
        <div className={style.tableLayer}>
          <EditableTable />
        </div>

        <AddBtnModal />
        <DelBtnModal />
        
      </div>
    );
  }



export default VideoComponent;
