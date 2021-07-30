import React, { Component } from "react";
import { Divider, Button, Input, message } from "antd";
import { throttle } from "throttle-debounce";
import * as style from "../../css/rectangle.less";
import APICONST from "../../services/APIConst";

class CanavasRectangleComponet extends Component {
  constructor(props) {
    super(props);

    this.canvas = React.createRef();

    this.saveDetail = this.saveDetail.bind(this);

    this.initilization = this.initilization.bind(this); // set background, draw init rectangles
    this.drawRectangles = this.drawRectangles.bind(this); // init canvas with data.

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseMoveHandler = this.mouseMoveHandler.bind(this);
    this.mouseUpHandler = this.mouseUpHandler.bind(this);

    this.state = {
      recArrays: [],
      monitorImageUrl: "",
      desc: "",
      myCtx: {},
      originLen: 0,
      editMode: false,
      flag: false,
      fillcolor: "yellow",
      startPoint: [0, 0],
      endPoint: [0, 0],
      curSelectId: "",
      curSelectName: "",
      ratioWidth: 2,
      ratioHeight: 2,
      showup: false,
      cssX: 0, // for the css style of showup block
      cssY: 0 // for the css style of showup block
    };
  }

  componentDidMount() {
    const { fillcolor } = this.state;

    const my = this.canvas.current;
    const myCtx = my.getContext("2d");
    // 配置
    myCtx.strokeStyle = fillcolor;
    myCtx.lineWidth = 1;
    // select data via iotcode to get region data
    this.setState(
      {
        myCtx
      },
      () => {
        this.initilization();
        // const { monitorImageUrl } = this.state;
        // if (monitorImageUrl !== "" && monitorImageUrl !== undefined) {
        //   this.getImage(monitorImageUrl)
        //     .then((initImage) => {
        //       const w = initImage.width;
        //       const h = initImage.height;
        //       myCtx.drawImage(initImage, 0, 0, w, h, 0, 0, 960, 540);
        //     })
        //     .then(() => {
        //       this.initilization();
        //     });
        // }
      }
    );
  }

  static getDerivedStateFromProps(prev, next) {
    console.log(`called getDerivedStateFromProps : ${prev.IoTCode}`);
    const { BASE_URL } = APICONST;
    const { IoTCode } = prev;
    const url = `${BASE_URL}/?filename=picture/${IoTCode}.jpg`;
    console.log(`called getDerivedStateFromProps : ${url}`);

    return {
      monitorImageUrl: url,
      recArrays: prev.data,
      originLen: prev.data.length
    };
  }

  componentDidUpdate() {
    // init image and add init points

    console.log(`init update called!`);
    this.initilization();
  }

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
    const { myCtx, monitorImageUrl } = this.state;

    if (monitorImageUrl !== "" && monitorImageUrl.indexOf("undefined") === -1) {
      console.log("******[start]redraw in update*****");
      console.log(`******[url]${monitorImageUrl}`);
      return this.getImage(monitorImageUrl).then((initImage) => {
        const w = initImage.width;
        const h = initImage.height;
        myCtx.drawImage(initImage, 0, 0, w, h, 0, 0, 960, 540);
        console.log("******[end]redraw in update*****");
        // init all the rectangles that from parameter
        this.drawRectangles();
      });
    }
    return "";
    // this.drawRectangles();
  }

  mouseDownHandler(e) {
    if (e.nativeEvent.offsetX || e.nativeEvent.layerX) {
      const offsetX =
        e.nativeEvent.offsetX === undefined
          ? e.nativeEvent.layerX
          : e.nativeEvent.offsetX;
      const offsetY =
        e.nativeEvent.offsetY === undefined
          ? e.nativeEvent.layerY
          : e.nativeEvent.offsetY;
      this.setState({ flag: true, startPoint: [offsetX, offsetY] });
    }
  }

  mouseMoveHandler(e) {
    const { startPoint, recArrays, ratioWidth, ratioHeight, originLen, flag } =
      this.state;
    console.log(
      `[mouse move]: originLen, ${originLen},recArrays len, ${recArrays.length}`
    );
    // if (originLen < recArrays.length) {
    console.log(`before remove item:${recArrays.length}`);
    if (flag) {
      recArrays.pop();

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
          // TODO: check no overlapping.....

          const width = offsetX - startPoint[0];
          const height = offsetY - startPoint[1];
          const addRect = {
            ID: "0000000000",
            region: [
              [startPoint[0] * ratioWidth, startPoint[1] * ratioHeight],
              [
                startPoint[0] * ratioWidth,
                (startPoint[1] - height) * ratioHeight
              ],
              [
                (startPoint[0] + width) * ratioWidth,
                (startPoint[1] - height) * ratioHeight
              ],
              [
                (startPoint[0] + width) * ratioWidth,
                startPoint[1] * ratioHeight
              ]
            ],
            result: { confidence: 1.0, value: 0 }
          };

          if (Array.isArray(recArrays)) {
            recArrays.push(addRect);
            console.log(`add item:${recArrays.length}`);
            this.setState({ recArrays: [...recArrays] });
          }
        }
      }
    }
  }

  mouseUpHandler(e) {
    // e.stopPropagation();
    const { myCtx, startPoint, recArrays, ratioHeight, ratioWidth } =
      this.state;
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
        const width = offsetX - startPoint[0];
        const height = offsetY - startPoint[1];

        const addRect = {
          ID: "0000000000",
          region: [
            [startPoint[0] * ratioWidth, startPoint[1] * ratioHeight],
            [
              startPoint[0] * ratioWidth,
              (startPoint[1] - height) * ratioHeight
            ],
            [
              (startPoint[0] + width) * ratioWidth,
              (startPoint[1] - height) * ratioHeight
            ],
            [(startPoint[0] + width) * ratioWidth, startPoint[1] * ratioHeight]
          ],
          result: { confidence: 1.0, value: 0 }
        };
        console.log(
          `before: mouse up  array:${JSON.stringify(recArrays.length)}`
        );
        console.log(`add： ${JSON.stringify(addRect)}`);
        if (Array.isArray(recArrays)) {
          recArrays.push(addRect);
        }
        console.log(
          `after: mouse up get array:${JSON.stringify(recArrays.length)}`
        );

        this.setState(
          {
            startPoint: [0, 0],
            recArrays,
            originLen: recArrays.length,
            cssX: offsetX,
            cssY: offsetY,
            showup: true,
            flag: false
          },
          () => {
            this.initilization();
          }
        );
      }
    }
  }

  drawRectangles() {
    const { myCtx, ratioWidth, ratioHeight, recArrays } = this.state;
    for (let i = 0; i < recArrays.length; i++) {
      const { region } = recArrays[i];
      myCtx.strokeRect(
        region[0][0] / ratioWidth,
        region[0][1] / ratioHeight,
        Math.abs(region[2][0] - region[0][0]) / ratioWidth,
        Math.abs(region[2][1] - region[0][1]) / ratioHeight
      );
    }
  }

  saveDetail() {}

  render() {
    const { curSelectId, curSelectName, cssX, cssY, showup } = this.state;

    return (
      <div className={style.monitorArea}>
        <div className={style.btnLayer}>
          <Button type="primary" onClick={this.initilization}>
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
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({ showup: false, startPoint: [0, 0] });
                  }}
                  className={style.confirmBtn}
                >
                  确认
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({ showup: false, startPoint: [0, 0] });
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
