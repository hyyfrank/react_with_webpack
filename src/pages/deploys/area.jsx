import React, { Component } from "react";
import * as style from "../../css/area.less";

class CanavasComponet extends Component {
  constructor() {
    super();

    this.canvas = React.createRef();
    this.canvasSave = React.createRef();

    this.state = {
      pointArr: [],
      pointX: 0,
      pointY: 0,
      myCtx: {},
      myCtxSave: {},
      oIndex: -1
    };
  }

  componentDidMount() {
    const can = this.canvas.current;
    const canSave = this.canvasSave.current;
    const canCtx = can.getContext("2d");
    const canSaveCtx = canSave.getContext("2d");
    // 配置
    canCtx.strokeStyle = "rgba(102,168,255,1)";
    canCtx.lineWidth = 4;
    canSaveCtx.strokeStyle = "rgba(102,168,255,1)";
    canSaveCtx.lineWidth = 4;

    this.setState({
      myCtx: canCtx,
      myCtxSave: canSaveCtx
    });
  }

  componentDidUpdate() {
    const { imageUrl, monitorArea } = this.props;

    const { myCtx, myCtxSave } = this.state;
    // init image to canvas
    const initImage = new Image();
    initImage.onload = () => {
      console.log("onload image ..........");
      const w = initImage.width;
      const h = initImage.height;

      const ratioWidth = w / 960;
      const ratioHeight = h / 540;

      console.log(`rationWidth:${ratioWidth}`);
      console.log(`ratioHeight:${ratioHeight}`);

      const parentElement = document.getElementById("canvasArea");
      const topGap = parentElement.offsetTop;
      const leftGap = parentElement.offsetLeft;

      myCtx.drawImage(initImage, 0, 0, w, h, 0, 0, 960, 540);
      myCtx.strokeStyle = "red";
      if (monitorArea.length > 0) {
        console.log(`init area: ${JSON.stringify(monitorArea)}`);
        myCtx.moveTo(
          leftGap + monitorArea[0][0] / ratioWidth,
          topGap + monitorArea[0][1] / ratioHeight
        );
        myCtx.lineTo(
          leftGap + monitorArea[1][0] / ratioWidth,
          topGap + monitorArea[1][1] / ratioHeight
        );
        myCtx.lineTo(
          leftGap + monitorArea[2][0] / ratioWidth,
          topGap + monitorArea[2][1] / ratioHeight
        );
        myCtx.lineTo(
          leftGap + monitorArea[3][0] / ratioWidth,
          topGap + monitorArea[3][1] / ratioHeight
        );
        myCtx.lineTo(
          leftGap + monitorArea[0][0] / ratioWidth,
          topGap + monitorArea[0][1] / ratioHeight
        );
        myCtx.stroke();
      }
      myCtxSave.drawImage(initImage, 0, 0, w, h, 0, 0, 960, 540);
      myCtxSave.strokeStyle = "red";
      if (monitorArea.length > 0) {
        console.log(`init2 area: ${JSON.stringify(monitorArea)}`);

        myCtxSave.moveTo(
          leftGap + monitorArea[0][0] / ratioWidth,
          topGap + monitorArea[0][1] / ratioHeight
        );
        myCtxSave.lineTo(
          leftGap + monitorArea[1][0] / ratioWidth,
          topGap + monitorArea[1][1] / ratioHeight
        );
        myCtxSave.lineTo(
          leftGap + monitorArea[2][0] / ratioWidth,
          topGap + monitorArea[2][1] / ratioHeight
        );
        myCtxSave.lineTo(
          leftGap + monitorArea[3][0] / ratioWidth,
          topGap + monitorArea[3][1] / ratioHeight
        );
        myCtxSave.lineTo(
          leftGap + monitorArea[0][0] / ratioWidth,
          topGap + monitorArea[0][1] / ratioHeight
        );
        myCtxSave.stroke();
      }
    };
    initImage.src = imageUrl;
  }

  render() {
    const { imageUrl, monitorArea } = this.props;
    console.log(`image url: ${imageUrl}`);
    console.log(`monitorArea url: ${JSON.stringify(monitorArea[0])}`);
    return (
      <div className={style.monitorCanvas} id="canvasArea">
        <canvas
          ref={this.canvas}
          className={style.originalCanvas}
          id="canvas"
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
    );
  }
}
export default CanavasComponet;
