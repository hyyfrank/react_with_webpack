import React, { Component } from "react";
import { Table, Tag, Space, Button } from 'antd';
import * as style from "../../css/algorithm.less"

const columns = [
  {
    title: '服务名称',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
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
    render: tags => (
      <span>
        {tags.map(tag => {
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
      <Space size="middle">
        <a>删除</a>
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
    monitor:'监控区域内的状态指示灯亮暗',
    gpu: '5G',
    tags: ['月台', '分析服务'],
  },
  {
    key: '2',
    name: '消防通道',
    type: '视频',
    url: 'http://124.204.79.2/reference',
    monitor:'监控区域内的状态指示灯亮暗',
    gpu: '4G',
    tags: ['视频', '分析服务'],
  },
  {
    key: '3',
    name: '消防轩状态指示灯',
    type: '图像',
    url: 'http://124.204.79.2/upload',
    monitor:'监控区域内的状态指示灯亮暗',
    gpu: '5G',
    tags: ['月台', '分析服务'],
  },
  
];

class AlgorithmComponent extends React.Component {
  state = {
    top: 'topLeft',
    bottom: 'bottomRight',
  };

  render() {
    return (
      <div className={style.mainContent}>
        <div className={style.btnLayer}>
          <Button type="primary" className={style.addBtn}>新增</Button>
        </div>
        <div className={style.tableLayer}>
          <Table
            columns={columns}
            pagination={{ position: [this.state.bottom] }}
            dataSource={data}
          />
        </div>
      </div>
    );
  }
}







export default AlgorithmComponent;
