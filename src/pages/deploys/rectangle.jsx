import React, { Component } from "react";
import { Divider, Button, Input } from "antd";
import * as style from "../../css/rectangle.less";

class CanavasRectangleComponet extends Component {
  constructor() {
    super();

    this.canvas = React.createRef();

    this.saveDetail = this.saveDetail.bind(this);
    this.clearMonitorArea = this.clearMonitorArea.bind(this);

    this.initilization = this.initilization.bind(this); // set background, draw init rectangles
    this.drawRectangles = this.drawRectangles.bind(this); // init canvas with data.

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);

    this.state = {
      recArrays: [],
      desc: "",
      myCtx: {},
      editMode: false,
      flag: false,
      fillcolor: "red",
      startPoint: [0, 0],
      endPoint: [0, 0],
      curSelectId: "",
      curSelectName: "",
      ratioWidth: 1,
      ratioHeight: 1,
      mouseMoveFlag: false,
      showup: false,
      cssX: 0, // for the css style of showup block
      cssY: 0 // for the css style of showup block
    };
  }

  componentDidMount() {
    console.log("did mount on rectangle page");
    const { fillcolor } = this.state;
    const my = this.canvas.current;
    const myCtx = my.getContext("2d");
    // 配置
    myCtx.strokeStyle = fillcolor;
    myCtx.lineWidth = 1;

    this.setState({
      myCtx
    });
  }

  componentDidUpdate() {
    // init image and add init points
    const { flag } = this.state;
    console.log("call the did update....");
    if (!flag) {
      this.initilization().then(() => {
        this.setState({ flag: !flag });
      });
    }
  }

  // shouldComponentUpdate(prev, next) {
  //   console.log(`SHOULD PREV:${JSON.stringify(prev)}`);
  //   console.log(`SHOULD NEXT:${JSON.stringify(next)}`);
  //   return true;
  // }

  getImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(img);
      };
      img.src = url;
    });
  }

  initilization() {
    const { myCtx } = this.state;
    const { monitorImageUrl } = this.props;
    return this.getImage(monitorImageUrl).then((initImage) => {
      const w = initImage.width;
      const h = initImage.height;
      const ratioWidth = w / 960;
      const ratioHeight = h / 540;
      this.setState({
        ratioWidth,
        ratioHeight
      });
      // draw the image as background of canvas
      myCtx.drawImage(initImage, 0, 0, w, h, 0, 0, 960, 540);
      // init all the rectangles that from parameter
      this.drawRectangles();
    });
  }

  mouseMoveHandler(e) {
    const { startPoint, myCtx } = this.state;

    if (startPoint[0] !== 0 || startPoint[1] !== 0) {
      if (e.nativeEvent.offsetX || e.nativeEvent.layerX) {
        const offsetX =
          e.nativeEvent.offsetX === undefined
            ? e.nativeEvent.layerX
            : e.nativeEvent.offsetX;
        const offsetY =
          e.nativeEvent.offsetY === undefined
            ? e.nativeEvent.layerY
            : e.nativeEvent.offsetY;
        // TODO: check no overlapping.....\
        console.log(
          `start drawing:${startPoint[0]},${startPoint[1]},${offsetX},${offsetY}`
        );
        this.clearMonitorArea();
        myCtx.strokeRect(
          startPoint[0],
          startPoint[1],
          Math.abs(offsetX - startPoint[0]),
          Math.abs(offsetY - startPoint[1])
        );
      }
    }
  }

  mouseDownHandler(e) {
    if (e.nativeEvent.offsetX || e.nativeEvent.layerX) {
      const pointX =
        e.nativeEvent.offsetX === undefined
          ? e.nativeEvent.layerX
          : e.nativeEvent.offsetX;
      const pointY =
        e.nativeEvent.offsetY === undefined
          ? e.nativeEvent.layerY
          : e.nativeEvent.offsetY;
      console.log(`mouse down on dot:[${pointX},${pointY}]`);
      this.setState({ startPoint: [pointX, pointY] });
    }
  }

  mouseUpHandler(e) {
    e.stopPropagation();
    const { myCtx, startPoint } = this.state;
    if (e.nativeEvent.offsetX || e.nativeEvent.layerX) {
      const offsetX =
        e.nativeEvent.offsetX === undefined
          ? e.nativeEvent.layerX
          : e.nativeEvent.offsetX;
      const offsetY =
        e.nativeEvent.offsetY === undefined
          ? e.nativeEvent.layerY
          : e.nativeEvent.offsetY;
      if (startPoint[0] !== offsetX && startPoint[1] !== offsetY) {
        myCtx.strokeRect(
          startPoint[0],
          startPoint[1],
          offsetX - startPoint[0],
          offsetY - startPoint[1]
        );

        this.setState({
          startPoint: [0, 0],
          cssX: offsetX,
          cssY: offsetY,
          showup: true
        });
      }
    }
  }

  clearMonitorArea() {
    this.initilization();
    this.setState({
      editMode: true,
      recArrays: []
    });
  }

  drawRectangles() {
    console.log("start to draw multiple rectangle");
    const { myCtx, ratioWidth, ratioHeight } = this.state;
    const { data } = this.props;
    const recArrays = data;
    this.setState({ recArrays: [...data] }); // TODO: check the data from props.
    console.log(`redraw with rec LENGTH:${recArrays.length}`);
    for (let i = 0; i < recArrays.length; i++) {
      console.log(`point:${recArrays[i].point}`);
      const { region } = recArrays[i];
      myCtx.strokeRect(
        region[0][0] / ratioWidth,
        region[0][1] / ratioHeight,
        Math.abs(region[2][0] - region[0][0]) / ratioWidth,
        Math.abs(region[2][1] - region[0][1]) / ratioHeight
      );
    }
    console.log("end to init multiple rectangle");
  }

  saveDetail() {
    console.log("start to save detail informations.");
  }

  render() {
    const { curSelectId, curSelectName, cssX, cssY, showup } = this.state;
    console.log(
      `[area page]get props from detail page: ${JSON.stringify(this.props)}`
    );

    return (
      <div className={style.monitorArea}>
        <div className={style.btnLayer}>
          <Button type="primary" onClick={this.clearMonitorArea}>
            编辑矩形
          </Button>
          <Divider type="vertical" />
          <Button type="primary" onClick={this.saveDetail}>
            保存
          </Button>
        </div>

        <div className={style.monitorCanvas} id="canvasArea">
          <canvas
            ref={this.canvas}
            className={style.originalCanvas}
            id="canvas"
            onMouseDown={this.mouseDownHandler}
            onMouseMove={this.mouseMoveHandler}
            onMouseUp={this.mouseUpHandler}
            width={960}
            height={540}
          >
            Your browser does not support the canvas element.
          </canvas>
          {showup ? (
            <div className={style.mask} style={{ top: cssY, left: cssX }}>
              <div className={style.txtLayer}>
                <div className={style.label}>ID:</div>
                <Input placeholder="id" defaultValue={curSelectId} />
              </div>
              <div className={style.txtLayer}>
                <div className={style.label}>Name:</div>
                <Input placeholder="name" defaultValue={curSelectName} />
              </div>
              <div className={style.btnPart}>
                <Button type="primary" className={style.confirmBtn}>
                  确认
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({ showup: false, startPoint: [0, 0] });
                    // this.initilization();
                  }}
                  className={style.cancelBtn}
                >
                  取消
                </Button>
              </div>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}
export default CanavasRectangleComponet;