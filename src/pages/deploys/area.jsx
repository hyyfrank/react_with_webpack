import React, { Component } from "react";
import * as style from "../../css/area.less";
import { Divider, Button } from "antd";
class CanavasComponet extends Component {
  constructor() {
    super();

    this.canvas = React.createRef();
    this.canvasSave = React.createRef();

    this.saveDetail = this.saveDetail.bind(this);
    this.clearMonitorArea = this.clearMonitorArea.bind(this);
    this.initCanvasImage = this.initCanvasImage.bind(this);
    this.initCanvasWithPloygon = this.initCanvasWithPloygon.bind(this); 

    this.clickCanvas = this.clickCanvas.bind(this);
    this.mouseMoveInCanvas = this.mouseMoveInCanvas.bind(this);
    this.makearc = this.makearc.bind(this);
    this.getRandomNum = this.getRandomNum.bind(this);
    this.saveCanvas = this.saveCanvas.bind(this);
    this.syncCanvas = this.syncCanvas.bind(this);

    this.state = {
      pointArr: [],
      pointX: 0,
      pointY: 0,
      myCtx: {},
      myCtxSave: {},
      editMode:false,
      flag: false,
      fillcolor: "rgba(165,246,247,0.5)"
    };
  }

  componentDidMount() {
    console.log("did mount on area page")
    const {fillcolor} = this.state;
    const can = this.canvas.current;
    const canSave = this.canvasSave.current;
    const canCtx = can.getContext("2d");
    const canSaveCtx = canSave.getContext("2d");
    // 配置
    canCtx.strokeStyle = fillcolor;
    canCtx.lineWidth = 1;
    canSaveCtx.strokeStyle = fillcolor;
    canSaveCtx.lineWidth = 1;

    this.setState({
      myCtx: canCtx,
      myCtxSave: canSaveCtx
    });
  }
  
  componentDidUpdate() {
    // init image and add init points
    const { myCtx, myCtxSave,flag } = this.state;
    const { imageUrl,monitorArea } = this.props;
    console.log("did update on area page,image url is:"+imageUrl)
    if(!flag){
    const initImage = new Image();
    initImage.src = imageUrl;
    initImage.onload = () => {
        const w = initImage.width;
        const h = initImage.height;
        this.initCanvasWithPloygon(w,h,initImage,monitorArea,myCtx);
        this.initCanvasWithPloygon(w,h,initImage,monitorArea,myCtxSave)
        this.setState({flag:!flag})
    }
  }
}
  
  saveDetail(){
    console.log("start to save detail informations.")
  }
  initCanvasWithPloygon(w,h,initImage,monitorArea,ctx){
    const { fillcolor } = this.state;
    const ratioWidth = w/960;
    const ratioHeight = h/540;
    ctx.drawImage(initImage, 0, 0, w, h, 0, 0, 960, 540);
    ctx.beginPath();
    ctx.strokeStyle = "red";
    ctx.fillStyle = fillcolor;
    if (monitorArea.length > 0) {
      console.log(`init area: ${JSON.stringify(monitorArea)}`);
      ctx.moveTo(
        (monitorArea[0][0])/ratioWidth,
        (monitorArea[0][1])/ratioHeight
      );
      for(let i=1;i<monitorArea.length;i++){
        ctx.lineTo(
          (monitorArea[i][0])/ratioWidth,
          (monitorArea[i][1])/ratioHeight
        );
      }
      ctx.lineTo(
        (monitorArea[0][0])/ratioWidth,
        (monitorArea[0][1])/ratioHeight
      );
      ctx.fill()
      ctx.stroke();
    }
  }

  initCanvasImage(myCtx, myCtxSave,imageUrl){
    const initImage = new Image();
    initImage.src = imageUrl;
    initImage.onload = () => {
      const w = initImage.width;
      const h = initImage.height;
      myCtx.drawImage(initImage, 0, 0, w, h, 0, 0, 960, 540);
      myCtxSave.drawImage(initImage, 0, 0, w, h, 0, 0, 960, 540);
    }
  }
  clearMonitorArea(){
    const { myCtx, myCtxSave } = this.state;
    const { imageUrl } = this.props;

    this.initCanvasImage(myCtx, myCtxSave,imageUrl); 
    this.setState({
      editMode: true,
      pointArr: []
    })
  }

  clickCanvas(e){
    let {pointX,pointY,pointArr,editMode} = this.state;
    console.log("click canvas, editMode: "+editMode+"offsetX is:"+e.nativeEvent.offsetX+",layX is:"+e.nativeEvent.layerX)

    let {myCtx,fillcolor} = this.state;
    if (e.nativeEvent.offsetX || e.nativeEvent.layerX) {
      pointX = e.nativeEvent.offsetX == undefined ? e.nativeEvent.layerX : e.nativeEvent.offsetX;
      pointY = e.nativeEvent.offsetY == undefined ? e.nativeEvent.layerY : e.nativeEvent.offsetY;
      let piX,piY;
      if(!editMode && pointArr.length > 0){
          piX = pointArr[0].x;
          piY = pointArr[0].y;
          //画点
          this.makearc(myCtx, piX, piY, this.getRandomNum(2, 2), 0, 180, fillcolor);
          pointArr.push({x: piX, y: piY});
          this.syncCanvas(pointArr);//保存点线同步到另一个canvas
          this.saveCanvas();//生成画布
      }else {
          piX = pointX;
          piY = pointY;
          this.makearc(myCtx, piX, piY, this.getRandomNum(2, 2), 0, 180, fillcolor);
          pointArr.push({x: piX, y: piY});
          this.syncCanvas(pointArr);//保存点线同步到另一个canvas
      }
      this.setState({pointArr:[...pointArr]})
    }
  }
  mouseMoveInCanvas(e){
    let {pointX,pointY,pointArr, editMode} = this.state;
    console.log("mouse move canvas, offsetX is:"+e.nativeEvent.offsetX+",layX is:"+e.nativeEvent.layerX+",edit mode is:"+editMode)

    
    let {myCtx,fillcolor} = this.state;
    if(editMode){
      console.log("pointArr is:"+JSON.stringify(pointArr));
      if (e.nativeEvent.offsetX || e.nativeEvent.layerX) {
        pointX = e.nativeEvent.offsetX == undefined ? e.nativeEvent.layerX : e.nativeEvent.offsetX;
        pointY = e.nativeEvent.offsetY == undefined ? e.nativeEvent.layerY : e.nativeEvent.offsetY;
        var piX,piY;
        /*清空画布*/
        myCtx.clearRect(0, 0, 960,540);
        /*鼠标下跟随的圆点*/
        this.makearc(myCtx, pointX, pointY, this.getRandomNum(4, 4), 0, 180, fillcolor);
  
        if (pointArr.length > 0) {
            if((pointX > pointArr[0].x-15 && pointX < pointArr[0].x+15) && (pointY > pointArr[0].y-15 && pointY < pointArr[0].y+15)){
                if(pointArr.length>1){
                    piX = pointArr[0].x;
                    piY = pointArr[0].y;
                    myCtx.clearRect(0, 0,960,540);
                    this.makearc(myCtx, piX, piY, this.getRandomNum(4, 4), 0, 180, fillcolor);
                    this.setState({editMode: false})
                }
            }else {
                piX = pointX;
                piY = pointY;
                this.setState({editMode: true})
            }
            /*开始绘制*/
            myCtx.beginPath();
            myCtx.moveTo(pointArr[0].x, pointArr[0].y);
            if (pointArr.length > 1){
                for (var i = 1; i < pointArr.length; i++){
                  myCtx.lineTo(pointArr[i].x, pointArr[i].y);
                }
            }
            myCtx.lineTo(piX, piY);
            myCtx.fillStyle = fillcolor;//填充颜色
            myCtx.fill();//填充
            myCtx.stroke();//绘制
        }
      }

    }
    

  }






  /*canvas生成圆点*/
  getRandomNum(Min, Max) {
    let range = Max - Min;
    let rand = Math.random();
    return (Min + Math.round(rand * range));
  }
  makearc(ctx, x, y, r, s, e, color) {
      ctx.clearRect(0, 0, 199, 202);//清空画布
      ctx.beginPath();
      ctx.fillStyle = color;
      ctx.arc(x, y, r, s, e);
      ctx.fill();
  }
  saveCanvas() {
    console.log("[Saving]unable to edit, saving........")
    const {myCtx,myCtxSave,pointArr} = this.state;
    console.log("saving points is: "+JSON.stringify(pointArr));
    myCtx.clearRect(0, 0, 960, 540);
    myCtxSave.closePath();//结束路径状态，结束当前路径，如果是一个未封闭的图形，会自动将首尾相连封闭起来
    myCtxSave.fill();//填充
    myCtxSave.stroke();//绘制
    this.setState({
      pointArr: [],
    })
  }
  // 存储已生成的点线
  syncCanvas(pointArr){
    const {myCtxSave,fillcolor} = this.state;
    myCtxSave.clearRect(0, 0, myCtxSave.width, myCtxSave.height);
    myCtxSave.beginPath();
    if (pointArr.length > 1){
      myCtxSave.moveTo (pointArr[0].x, pointArr[0].y);
        for (var i = 1; i < pointArr.length; i++){
          myCtxSave.lineTo(pointArr[i].x, pointArr[i].y);
          myCtxSave.fillStyle = fillcolor;//填充颜色
          // myCtxSave.fill();
          myCtxSave.stroke();//绘制
        }
        myCtxSave.closePath();
        //是否存储pointArr
    }
}

  render() {
    const { imageUrl, monitorArea } = this.props;
    console.log(`image url: ${imageUrl}`);
    console.log(`monitorArea url: ${JSON.stringify(monitorArea[0])}`);
    return (
      <div className={style.monitorArea}>
            <div className={style.btnLayer}>
              <Button type="primary" onClick={this.clearMonitorArea}>
                重绘
              </Button>
              <Divider type="vertical" />
              <Button type="primary" onClick={this.saveDetail}>
                保存所有
              </Button>
            </div>
      <div className={style.monitorCanvas} id="canvasArea">
        <canvas
          ref={this.canvas}
          className={style.originalCanvas}
          id="canvas"
          onClick={this.clickCanvas}
          onMouseMove={this.mouseMoveInCanvas}
          width={960}
          height={540}
        >
          Your browser does not support the canvas element.
        </canvas>
        <canvas
          ref={this.canvasSave}
          className={style.newCanvas}
          id="canvasSave"
          width={960}
          height={540}
        >
          Your browser does not support the canvas element.
        </canvas>
      </div>
      </div>
    );
  }
}
export default CanavasComponet;
