import React, { PureComponent } from 'react';
import { Image, Row, Col, Pagination, PageHeader, Select, TimePicker, Button, Breadcrumb } from 'antd';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import * as style from '../../css/dashboard.less'
import DashboardService from '../../services/dashboard';
import { data } from 'autoprefixer';
const { Option } = Select;

class DashboardComponent extends PureComponent {
  constructor(){
    super()
    this.onPageChange = this.onPageChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }
  componentDidMount(){
    // const data = DashboardService.fetchAllServiceData();
  }
  onPageChange(){
    console.log("change page!!")
  }
  onChange(){

  }
  onFocus(){
    
  }
  onBlur(){
    
  }
  onSearch(){
    
  }
  
  render() {
    const images = [];
    
    for(let i=0;i<9;i++){
      images.push(<Col key={'col'+i} span={8} >
        <Image
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
      </Col>)
    }
    return (<div className={style.dashboard}>
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
          <div className={style.firstFilter}>
            <span>选择时间:</span> 
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a timeperiod"
              optionFilterProp="children"
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option key="1" value="1">最近1天</Option>
              <Option key="2" value="2">最近2天</Option>
              <Option key="3" value="3">最近3天</Option>
              <Option key="4" value="4">最近4天</Option>
              <Option key="5" value="5">最近5天</Option>
              <Option key="6" value="6">最近6天</Option>
              <Option key="7" value="7">最近7天</Option>
              <Option key="8" value="8">最近8天</Option>
              <Option key="9" value="9">最近9天</Option>
              <Option key="10" value="10">最近10天</Option>
              <Option key="11" value="11">最近11天</Option>
              <Option key="12" value="12">最近12天</Option>
              <Option key="13" value="13">最近13天</Option>
              <Option key="14" value="14">最近14天</Option>
              <Option key="15" value="15">最近15天</Option>
            </Select>
          </div> 
          <div className={style.secondBlock}>
            <TimePicker.RangePicker />
          </div>
          <div className={style.firstFilter}>
            <span>相机:</span> 
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a carema"
              optionFilterProp="children"
              onChange={this.onChange}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onSearch={this.onSearch}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option key="1" value="1">21097000648</Option>
              <Option key="2" value="2">21097000661</Option>
              <Option key="3" value="3">21097000651</Option>
              <Option key="4" value="4">21097000654</Option>
            </Select>
          </div> 
          <div>
            <Button type="link">确定</Button>
          </div>
        </div>
        <div className={style.imagesPart}>
          <Row gutter={[8, 8]}>
            {images}
          </Row>
        </div>
        <div className={style.rightPosition}>
          <Pagination defaultCurrent={1} pageSize={9} total={50} onChange={this.onPageChange}/>
        </div>
      </div>);
  }
}
export default DashboardComponent;
