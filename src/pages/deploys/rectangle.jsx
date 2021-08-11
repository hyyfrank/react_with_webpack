import React, { Component } from "react";
import { Button, Input, message } from "antd";
import { throttle } from "throttle-debounce";
import * as style from "../../css/rectangle.less";
import APICONST from "../../services/APIConst";
import { fetchAllInsturment } from "../../services/devices";
import saveSourceCanvasDetail from "../../services/rectangle";

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
    this.dobuleClickHandler = this.dobuleClickHandler.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.draw = this.draw.bind(this);
    const { iotCode } = this.props;
    this.state = {
      recArrays: [],
      mouseMoveArrays: [],
      mouseMoveAllArrays: [],
      monitorImageUrl: `${APICONST.BASE_URL}/?filename=picture/${iotCode}.jpg`,
      delItemID: "",
      desc: "",
      myCtx: {},
      mode: "add",
      originLen: 0,
      fillcolor: "red",
      startPoint: [0, 0],
      endPoint: [0, 0],
      ratioWidth: 1,
      ratioHeight: 1,
      showup: false,
      editshowup: false,
      cssX: 0, // for the css style of showup block
      cssY: 0, // for the css style of showup block
      inputID: "",
      inputDesc: "",
      inputEditID: "",
      inputEditDesc: "",
      addRec: {},
      afterDelete: false,
      ismouseDown: false,
      canvasItem: {},
      isMoveAll: false
    };
  }

  async componentDidMount() {
    console.log(this.props);

    console.log("start to call the new region area");
    const { iotCode } = this.props;
    const formData = new FormData();
    const obj = {
      type: "SOURCELIST",
      ctrl_key:
        sessionStorage.getItem("ctrl_key") == null
          ? -1
          : Number(sessionStorage.getItem("ctrl_key"))
    };
    formData.append("req", JSON.stringify(obj));
    const { data } = await fetchAllInsturment(formData);
    if (data.state) {
      // message.info("获取控制柜列表成功")
      if (data.sources.length > 0) {
        const sourceItem = data.sources.filter((item) => {
          return item.cameraID === iotCode;
        })[0];
        sourceItem.originLength = sourceItem.regions.length;
        this.setState({
          recArrays: sourceItem.regions,
          mouseMoveAllArrays: sourceItem.regions,
          originLen: sourceItem.regions.length,
          canvasItem: sourceItem
        });
      }
    } else {
      message.error("获取控制柜失败");
    }

    const { fillcolor } = this.state;

    const my = this.canvas.current;
    const myCtx = my.getContext("2d");
    const { BASE_URL } = APICONST;
    // 配置
    myCtx.strokeStyle = fillcolor;
    myCtx.lineWidth = 1;
    const monitorImageUrl = `${BASE_URL}/?filename=picture/${iotCode}.jpg`;
    console.log(
      `component did mount props in rectangle:${JSON.stringify(this.props)}`
    );
    console.log(`did mount image url in rectangle: ${monitorImageUrl}`);
    await this.getImage(monitorImageUrl).then((initImage) => {
      const w = initImage.width;
      const h = initImage.height;
      this.setState({
        ratioWidth: (w / 960).toFixed(2),
        ratioHeight: (h / 540).toFixed(2),
        myCtx
      });
    });
  }

  componentDidUpdate() {
    this.initilization();
  }

  async onDelete() {
    const { curSelectedRect, recArrays, mouseMoveArrays } = this.state;
    const newArr = recArrays.filter((item) => {
      return item.ID !== curSelectedRect.ID;
    });
    const newMouseArr = mouseMoveArrays.filter((item) => {
      return item.ID !== curSelectedRect.ID;
    });

    this.setState({
      delItemID: curSelectedRect.ID,
      editshowup: false,
      mode: "delete",
      recArrays: [...newArr],
      mouseMoveArrays: [...newMouseArr]
    });
  }

  getImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => {
        resolve(img);
      };
      img.onerror = () => {
        reject(img);
      };
    });
  }

  initilization() {
    const { myCtx, monitorImageUrl } = this.state;
    if (monitorImageUrl !== "" && monitorImageUrl.indexOf("undefined") === -1) {
      return this.getImage(monitorImageUrl).then((initImage) => {
        const w = initImage.width;
        const h = initImage.height;
        if (
          myCtx.drawImage !== "undefined" &&
          typeof myCtx.drawImage === "function"
        ) {
          myCtx.drawImage(initImage, 0, 0, w, h, 0, 0, 960, 540);
          this.drawRectangles();
        }
      });
    }
    return "";
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
      this.setState({
        startPoint: [offsetX, offsetY],
        ismouseDown: true
      });
    }
  }

  mouseMoveHandler(e) {
    const {
      startPoint,
      recArrays,
      ratioWidth,
      ratioHeight,
      ismouseDown,
      mouseMoveArrays,
      isMoveAll,
      mode
    } = this.state;
    if (ismouseDown) {
      console.log(`[mouse move] mode:${mode}`);
      if (mouseMoveArrays.length > 0) {
        mouseMoveArrays.pop();
      }
      console.log(
        `startPoint[0]:${startPoint[0]},startPoint[1]:${startPoint[1]}`
      );
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
          console.log(`width:${width},height:${height}`);
          if (!isMoveAll && mode === "add") {
            console.log("***********[Mouse Move]in add mode************");
            const addRect = {
              ID: "mouseMoveID",
              Desc: "mouseMoveDesc",
              axis: [
                [startPoint[0] * ratioWidth, startPoint[1] * ratioHeight],
                [
                  startPoint[0] * ratioWidth,
                  (startPoint[1] + height) * ratioHeight
                ],
                [
                  (startPoint[0] + width) * ratioWidth,
                  (startPoint[1] + height) * ratioHeight
                ],
                [
                  (startPoint[0] + width) * ratioWidth,
                  startPoint[1] * ratioHeight
                ]
              ]
            };

            console.log("[mouse move] added!");
            mouseMoveArrays.push(addRect);

            this.setState({ mouseMoveArrays: [...mouseMoveArrays] });
          } else if (mode === "moveall") {
            console.log("***********[Mouse Move]in moveall mode************");
            const res = [];
            recArrays.map((item) => {
              res.push({
                ...item,
                axis: [
                  [
                    item.axis[0][0] + width * ratioWidth,
                    item.axis[0][1] + height * ratioHeight
                  ],
                  [
                    item.axis[1][0] + width * ratioWidth,
                    item.axis[1][1] + height * ratioHeight
                  ],
                  [
                    item.axis[2][0] + width * ratioWidth,
                    item.axis[2][1] + height * ratioHeight
                  ],
                  [
                    item.axis[3][0] + width * ratioWidth,
                    item.axis[3][1] + height * ratioHeight
                  ]
                ]
              });
            });
            // console.log(`after move: all rec:${JSON.stringify(res)}`);
            this.setState({
              mouseMoveAllArrays: [...res]
            });
            // TODO: SETSTATE, ADD MODE TO DO UPDATE ON COMPONENT DID UPDATE
          }
        }
      }
    }
  }

  mouseUpHandler(e) {
    // e.stopPropagation();
    const { myCtx, startPoint, recArrays, isMoveAll, mode } = this.state;
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
        if (!isMoveAll) {
          myCtx.strokeRect(
            startPoint[0],
            startPoint[1],
            offsetX - startPoint[0],
            offsetY - startPoint[1]
          );
        }
        const shouldPopup = !(mode === "moveall");
        this.setState(
          {
            startPoint: [0, 0],
            recArrays,
            cssX: offsetX,
            cssY: offsetY,
            showup: shouldPopup,
            inputID: "",
            inputDesc: "",
            ismouseDown: false,
            isMoveAll: false
          },
          () => {
            this.initilization();
          }
        );
      }
    }
  }

  dobuleClickHandler(e) {
    const { recArrays, ratioHeight, ratioWidth } = this.state;
    this.initilization();
    if (e.nativeEvent.offsetX || e.nativeEvent.layerX) {
      const offsetX =
        e.nativeEvent.offsetX === undefined
          ? e.nativeEvent.layerX
          : e.nativeEvent.offsetX;
      const offsetY =
        e.nativeEvent.offsetY === undefined
          ? e.nativeEvent.layerY
          : e.nativeEvent.offsetY;
      console.log(
        `dobule click in [${offsetX * ratioWidth},${offsetY * ratioHeight}]`
      );
      console.log(
        `rationWidth is ${ratioWidth} and rationHeight is ${ratioHeight}`
      );

      // console.log(`dobule click ${JSON.stringify(recArrays)}`);
      const filterItem = recArrays.filter((item) => {
        const minX = Math.min(
          item.axis[0][0],
          item.axis[1][0],
          item.axis[2][0],
          item.axis[3][0]
        );
        const maxX = Math.max(
          item.axis[0][0],
          item.axis[1][0],
          item.axis[2][0],
          item.axis[3][0]
        );

        const minY = Math.min(
          item.axis[0][1],
          item.axis[1][1],
          item.axis[2][1],
          item.axis[3][1]
        );
        const maxY = Math.max(
          item.axis[0][1],
          item.axis[1][1],
          item.axis[2][1],
          item.axis[3][1]
        );

        if (
          offsetX * ratioWidth > minX &&
          offsetX * ratioWidth < maxX &&
          offsetY * ratioHeight > minY &&
          offsetY * ratioHeight < maxY &&
          item.ID !== "000000000"
        ) {
          console.log(`x range: [${item.axis[0][0]},${item.axis[2][0]}]`);
          console.log(`y range: [${item.axis[0][1]},${item.axis[1][1]}]`);
          return true;
        }
        return false;
      });
      if (filterItem.length > 0) {
        console.log(`dobule clicked on item:${JSON.stringify(filterItem)}`);
        this.setState({
          editshowup: true,
          cssX: offsetX,
          cssY: offsetY,
          inputEditID: filterItem[0].ID,
          inputEditDesc: filterItem[0].Desc,
          curSelectedRect: filterItem[0]
        });
      } else {
        console.log("double clicked not matched.");
        this.setState({
          editshowup: false
        });
      }
    }
  }

  draw(arr) {
    const { myCtx, ratioWidth, ratioHeight } = this.state;
    if (arr.length > 0) {
      for (let i = 0; i < arr.length; i++) {
        const { axis } = arr[i];

        myCtx.strokeRect(
          axis[0][0] / ratioWidth,
          axis[0][1] / ratioHeight,
          Math.abs(axis[2][0] - axis[0][0]) / ratioWidth,
          Math.abs(axis[2][1] - axis[0][1]) / ratioHeight
        );
      }
    }
  }

  drawRectangles() {
    const {
      mode,
      recArrays,
      mouseMoveArrays,
      delItemID,
      mouseMoveAllArrays,
      isMoveAll
    } = this.state;
    if (delItemID !== "" && mode === "delete") {
      const newTest = recArrays.filter((item) => {
        return item.ID !== delItemID;
      });
      console.log(
        `in delete mode:${mode},id is:${delItemID}recArray:${JSON.stringify(
          newTest
        )}`
      );
      this.draw(
        recArrays.filter((item) => {
          return item.ID !== delItemID;
        })
      );
      this.draw(
        mouseMoveArrays.filter((item) => {
          return item.ID !== delItemID;
        })
      );

      this.setState({ mode: "", delItemID: "" });
    } else if (mode === "add") {
      this.draw(mouseMoveArrays);
      this.draw(recArrays); // 最后的mouseup会重新跑到这里
    } else if (mode === "moveall") {
      console.log(
        `isMove in component did update:${isMoveAll} and mode is ${mode}`
      );
      this.draw(mouseMoveAllArrays);
    }
  }

  saveDetail() {
    const { canvasItem, recArrays } = this.state;
    console.log(`current page before:${JSON.stringify(canvasItem)}`);
    canvasItem.regions = [...recArrays];
    console.log(`after page before:${JSON.stringify(canvasItem)}`);
    const payload = {
      ...canvasItem
    };

    saveSourceCanvasDetail(payload)
      .then(({ data }) => {
        console.log(`result save:${JSON.stringify(data)}`);
        if (data.state) {
          message.info("保存成功！");
        } else {
          message.info("保存失败！");
        }
      })
      .then(() => {
        this.setState({
          mode: "",
          ismouseDown: false,
          isMoveAll: false
        });
      });
  }

  render() {
    const {
      cssX,
      cssY,
      showup,
      inputID,
      inputDesc,
      editshowup,
      inputEditDesc,
      inputEditID,
      recArrays,
      curSelectedRect,
      mouseMoveArrays,
      mode
    } = this.state;

    return (
      <div className={style.monitorArea}>
        <div className={style.btnLayer}>
          <div>
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  recArrays: [],
                  mouseMoveArrays: [],
                  mouseMoveAllArrays: [],
                  mode: "add",
                  isMoveAll: false,
                  ismouseDown: false
                });
              }}
            >
              全部重画
            </Button>
            <Button
              className={style.moveAllBtn}
              type="primary"
              onClick={() => {
                this.setState({
                  isMoveAll: true,
                  mode: "moveall"
                });
              }}
            >
              全部移动
            </Button>
          </div>
          <div>
            <Button type="primary" onClick={this.saveDetail}>
              保存
            </Button>
          </div>
        </div>

        <div className={style.monitorCanvas} id="canvasArea">
          <canvas
            ref={this.canvas}
            className={style.originalCanvas}
            id="canvas"
            onDoubleClick={this.dobuleClickHandler}
            onMouseDown={this.mouseDownHandler}
            // onMouseMove={throttle(16, this.mouseMoveHandler)}
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
                <Input
                  placeholder="id"
                  value={inputID}
                  onChange={(e) => {
                    console.log(`input id val${e.target.value}`);

                    this.setState({
                      inputID: e.target.value
                    });
                  }}
                  defaultValue={inputID}
                />
              </div>
              <div className={style.txtLayer}>
                <div className={style.label}>Desc:</div>
                <Input
                  placeholder="name"
                  value={inputDesc}
                  onChange={(e) => {
                    console.log(`input desc val${e.target.value}`);
                    this.setState({
                      inputDesc: e.target.value
                    });
                  }}
                  defaultValue={inputDesc}
                />
              </div>
              <div className={style.btnPart}>
                <Button
                  type="primary"
                  onClick={() => {
                    // const {recArrays,inputID,inputDesc,mode,curSelectedRect,mouseMoveArrays} = this.state;

                    const item = mouseMoveArrays[0];
                    item.ID = inputID;
                    item.Desc = inputDesc;
                    recArrays.push(item);
                    console.log(
                      `after the add button is:${JSON.stringify(recArrays)}`
                    );
                    this.setState({
                      showup: false,
                      startPoint: [0, 0],
                      recArrays: [...recArrays]
                    });
                  }}
                  className={style.confirmBtn}
                >
                  新增
                </Button>

                <Button
                  type="primary"
                  onClick={() => {
                    // const {mode,mouseMoveArrays} = this.state;
                    if (mode === "add") {
                      mouseMoveArrays.pop();
                    }
                    this.setState({
                      showup: false,
                      startPoint: [0, 0],
                      afterDelete: true,
                      mouseMoveArrays: [...mouseMoveArrays]
                    });
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

          {editshowup ? (
            <div className={style.mask} style={{ top: cssY, left: cssX }}>
              <div className={style.txtLayer}>
                <div className={style.label}>ID:</div>
                <Input
                  placeholder="id"
                  disabled
                  value={inputEditID}
                  onChange={(e) => {
                    console.log(`input edit id val${e.target.value}`);

                    this.setState({
                      inputEditID: e.target.value
                    });
                  }}
                  defaultValue={inputEditID}
                />
              </div>
              <div className={style.txtLayer}>
                <div className={style.label}>Desc:</div>
                <Input
                  placeholder="name"
                  value={inputEditDesc}
                  onChange={(e) => {
                    console.log(`input edit desc val${e.target.value}`);
                    this.setState({
                      inputEditDesc: e.target.value
                    });
                  }}
                  defaultValue={inputEditDesc}
                />
              </div>
              <div className={style.btnPart}>
                <Button
                  type="primary"
                  onClick={() => {
                    // const {recArrays,inputEditID,inputEditDesc,mode,curSelectedRect,mouseMoveArrays} = this.state;

                    console.log(`更新一个矩形 id:${curSelectedRect.ID}`);

                    const newArr = recArrays.filter((item) => {
                      return item.ID !== curSelectedRect.ID;
                    });
                    curSelectedRect.ID = inputEditID;
                    curSelectedRect.Desc = inputEditDesc;
                    newArr.push(curSelectedRect);

                    console.log(`[button: update]${JSON.stringify(newArr)}`);
                    this.setState({
                      editshowup: false,
                      startPoint: [0, 0],
                      recArrays: [...newArr],
                      mode: ""
                    });
                  }}
                  className={style.confirmBtn}
                >
                  更新
                </Button>
                <Button
                  type="primary"
                  className={style.cancelBtn}
                  onClick={this.onDelete}
                >
                  删除
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    this.setState({ editshowup: false, mode: "" });
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
