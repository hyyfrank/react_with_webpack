import React, { PureComponent } from 'react';
import { Image, Row, Col, Pagination, PageHeader, Select, TimePicker, Button, Breadcrumb } from 'antd';
import { DatabaseOutlined, HomeOutlined, UserOutlined } from '@ant-design/icons';
import * as style from '../../css/dashboard.less'
import fetchDashboardList from '../../services/dashboard'
const { Option } = Select;

class DashboardComponent extends PureComponent {
  constructor(){
    super()
    this.onPageChange = this.onPageChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.onBlur = this.onBlur.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.state={
      imageLists: [],
      channels: [],
      day: 0,
      start: 0,
      end: 24
    }
  }
  
  componentDidMount(){
    fetchDashboardList(0).then(({data})=>{
      const dayOneData = data.filter((item)=>{
        return item.event!="DISCONNECTED"
      })
      const tmpChannels =[]
      dayOneData.map((item)=>{
        if(item.hasOwnProperty("config")){
          if(!tmpChannels.includes(item["config"]["IoTCode"])){
            tmpChannels.push(item["config"]["IoTCode"]);
          }
        }
      })
      this.setState({channels: tmpChannels});
      
      // console.log("one data:"+JSON.stringify(dayOneData));

      let imgSrcList = [];
      let typeOfKey = 'jpgs';
      dayOneData.map(item=>{
          if(item.hasOwnProperty("jpg_D")){
            typeOfKey='jpg_D'
          }
          let allImages = item[typeOfKey]||[];
          console.log("before images:"+allImages)
          const LEN = 3;
          const tmpArr = new Array(LEN).fill("");
          if(allImages.length==3){
            imgSrcList.concat(allImages)
          } else {
            for(let i = 0;i<allImages.length;i++){
              tmpArr[i] = allImages[i];
            }
            imgSrcList.concat(tmpArr)
          }
      })
      console.log("imgSrcList:"+JSON.stringify(imgSrcList))

      this.setState({
        imageLists: imgSrcList
      })

      console.log("channels"+JSON.stringify(this.channels))
      sessionStorage.setItem(1,dayOneData)
    })
    
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
    // channel list init
    const channelList = [];
    let { channels } = this.state;
    const images = [];
    if(channels.length>0){
      channelList.push(<Option key='all' value='all'>All</Option>);
      for(let i=0;i<channels.length;i++){
        channelList.push(<Option key={channels[i]} value={channels[i]}>{channels[i]}</Option>);
      }
    }
    
    
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
          <div className={style.filterblock}>
            <span className={style.selectTimeText}>选择时间:</span> 
            <Select
              showSearch
              defaultValue={"0"}
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
              <Option key="0" value="0">今天</Option>
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
          
          <div className={style.filterblock}>
            <span className={style.selectTimeText}>相机:</span> 
            <Select
              showSearch
              defaultValue={'all'}
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
              {channelList}
            </Select>
          </div> 

          <div className={style.filterblock}>
            <span className={style.selectTimeText}>类型:</span>
            <Select
                showSearch
                defaultValue={"0"}
                style={{ width: 200 }}
                placeholder="选择类型"
                optionFilterProp="children"
                onChange={this.onChange}
                onFocus={this.onFocus}
                onBlur={this.onBlur}
                onSearch={this.onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option key="0" value="0">图像</Option>
                <Option key="1" value="1">视频</Option>
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
