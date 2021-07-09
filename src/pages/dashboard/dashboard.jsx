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
    this.getImageFullAddress = this.getImageFullAddress.bind(this);
    this.getImageInfos = this.getImageInfos.bind(this);
    this.updateIotTableData = this.updateIotTableData.bind(this);
    this.state={
      talbeData: [], // 某一天的channel的图片的数据信息，用于加载和分页
      channels: [], // 下拉框的iot 相机列表
      current:'', // 当前相机
      day: 0,  // 哪一天
     
    }
  }
  
  getImageFullAddress(day,imgSrc){
    const baseUrl = "http://cvp.g2link.cn:20065"
    if(day==0){
      return `${baseUrl}/?filename=${imgSrc}`;
    }else{
      return `${baseUrl}/?filename=./${day}/${imgSrc}`;
    }
  }
  getImageInfos(obj){
    // possible need different description for different type.
    let plateClassDesc = '';
    let len = obj["result"].length;
    for(var i=0;i<len;i++){
      if (obj["result"][i]["class"]=="plate"){
        if(len == 1){
          plateClassDesc+=`${obj["result"][i]["license"]["license_s"]}`
        }else{
          plateClassDesc+=`,${obj["result"][i]["license"]["license_s"]}`
        }
      }
    }
    return `[${obj['eventserial']}],${obj['event']},${obj['time']}${plateClassDesc}`;
  }
  getFreeImageByEventSerial(datas,serialId){
    let jpgs = []
    let { day } = this.state;
    datas.filter(item=>{
      if(item['eventserial'] == serialId && item['event'] == 'FREE'){
        if(item.hasOwnProperty('jpgs') && item['jpgs'].length>0){
          let imgs = [].concat(item['jpgs']);
          for(let i=0;i<imgs.length;i++){
            jpgs.push({
              'img': this.getImageFullAddress(day,imgs[i]),
              'info': this.getImageInfos(item)
            })
          }
        }else{
          jpgs.push({
            'img': this.getImageFullAddress(day,item('jpg')),
            'info': this.getImageInfos(item)
          })
        }
      }
    })
   
    console.log(`getFreeImageByEventSerial ${serialId} is: ${JSON.stringify(jpgs)}`)

    return jpgs;
  }
  updateIotTableData(iotTableData){
    let { day } = this.state;
    let newTableData =[];
    iotTableData.map(item=>{
      if(item['event']==='TAKEUP'){
        newTableData.push({
          "eventserial": item["eventserial"],
          "src":this.getImageFullAddress(day,item["jpg"]),
          "infos": this.getImageInfos(item),
          "color":  "red",
          "related": this.getFreeImageByEventSerial(iotTableData,item["eventserial"])
        })
      }
    })
    console.log(`get filtered table data ${JSON.stringify(newTableData)}`)
    this.setState({talbeData:newTableData})
  }

  componentDidMount(){
    let { day } = this.state;
    fetchDashboardList(day).then(({data})=>{
      const dayOneData = data.filter((item)=>{
        return item.event!="DISCONNECTED"
      })
      const tmpChannels =[]
      // init the dropdown list of IoT
      dayOneData.map((item)=>{
        if(item.hasOwnProperty("config")){
          if(!tmpChannels.includes(item["config"]["IoTCode"])){
            tmpChannels.push(item["config"]["IoTCode"]);
          }
        }
      })
      this.setState({channels: tmpChannels});
      this.setState({current: tmpChannels[0]});

      //filter result via defult IoT Channel
      const iotRawTableData = [];
      dayOneData.map(item=>{
        if(item.hasOwnProperty("config")){
          if(item['config']['IoTCode']==tmpChannels[0]){
            iotRawTableData.push(item);
          }
        }
      })
  
      // add releated image for each TAKEUP image
      
      this.updateIotTableData(iotRawTableData);

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
    let { 
      talbeData,
      channels,
      day,
      current
    } = this.state;
    console.log("当前选择的相机是："+current)
    const images = [];
    if(channels.length>0){
      for(let i=0;i<channels.length;i++){
        channelList.push(<Option key={channels[i]} value={channels[i]}>{channels[i]}</Option>);
      }
    }
    
    
    for(let i=0;i<talbeData.length;i++){
      images.push(
        <Row>
          <Col key={'col1'+i} span={6} >
            <div className={style.takeColor}>
              <Image
                src={`${talbeData[i]['src']}`}
              />
              <span>{talbeData[i]['infos']}</span>
            </div>
          
          </Col>
          <Col key={'col2'+i} span={6} >
            {
              talbeData[i]['related'].length > 0 ? 
              <div className={style.freeColor}>
                  <Image src={`${talbeData[i]['related'][0]['img']}`} /> 
                  <span>{talbeData[i]['related'][0]['info']}</span>
              </div>
              : <span></span>
            }
          </Col>
          <Col key={'col3'+i} span={6} >
            {
              talbeData[i]['related'].length > 1 ? 
              <div className={style.freeColor}>
                  <Image src={`${talbeData[i]['related'][1]['img']}`} /> 
                  <span>{talbeData[i]['related'][1]['info']}</span>
              </div>
              : <span></span>
            }
          </Col>
          <Col key={'col4'+i} span={6} >
            {
              talbeData[i]['related'].length > 2 ? 
              <div className={style.freeColor}>
                  <Image src={`${talbeData[i]['related'][2]['img']}`} /> 
                  <span>{talbeData[i]['related'][1]['info']}</span>
              </div>
              : <span></span>
            }
          </Col>
        </Row>
        
      )
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
              value={current}
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
