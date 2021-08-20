import React, { Component } from "react";
import { Button, message, Radio, Input, Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Stage, Layer, Rect, Group } from "react-konva";
// eslint-disable-next-line no-unused-vars
import Konva from "konva";
import { v4 as uuidv4 } from "uuid";
import * as style from "../../css/rectangle.less";
import APICONST from "../../services/APIConst";
import { fetchAllInsturment } from "../../services/devices";
import saveSourceCanvasDetail from "../../services/rectangle";
import Rectangle from "./konvarectangle";

class CanavasRectangleComponet2 extends Component {
  constructor(props) {
    super(props);
    this.selectionRectRef = React.createRef();

    this.getImage = this.getImage.bind(this);
    this.deleteRectangle = this.deleteRectangle.bind(this);
    this.getInfoFromAxis = this.getInfoFromAxis.bind(this);
    this.onModeChange = this.onModeChange.bind(this);

    this.dragAllEnd = this.dragAllEnd.bind(this);

    this.saveDetail = this.saveDetail.bind(this);
    this.checkDeselect = this.checkDeselect.bind(this);

    this.selectAllRectangle = this.selectAllRectangle.bind(this);
    this.selectAllPosition = this.selectAllPosition.bind(this);

    this.onMouseEnter = this.onMouseEnter.bind(this);

    this.state = {
      recArrays: [], // store real data
      ratioWidth: 1,
      ratioHeight: 1,
      fillPatternImage: null,
      mode: "edit",
      isDrawing: false,
      isDrawingMode: false,
      selected: {
        uuid: "",
        id: "",
        desc: ""
      },
      selectedId: null,
      shapeRefArray: [],
      trsfomerRef: null
    };
  }

  async componentDidMount() {
    console.log("******************in konva component******************");
    console.log("start to call the new region area");
    const { iotCode } = this.props;
    let ratioWidth;
    let ratioHeight;
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
    const monitorImageUrl = `${APICONST.BASE_URL}/?filename=picture/${iotCode}.jpg`;
    await this.getImage(monitorImageUrl).then((initImage) => {
      const w = initImage.width;
      const h = initImage.height;
      console.log(`first mount get width and height:${w},${h}`);
      ratioWidth = (w / 960).toFixed(2);
      ratioHeight = (h / 540).toFixed(2);
      this.setState({
        ratioWidth,
        ratioHeight,
        fillPatternImage: initImage
      });
    });

    if (data.state) {
      // message.info("获取控制柜列表成功")
      if (data.sources.length > 0) {
        const sourceItem = data.sources.filter((item) => {
          return item.cameraID === iotCode;
        })[0];
        sourceItem.originLength = sourceItem.regions.length;

        const res = [];
        sourceItem.regions.map((item) => {
          const [x0, y0, w, h] = this.getInfoFromAxis(
            item.axis,
            ratioWidth,
            ratioHeight
          );
          const uuid = uuidv4();
          res.push({
            id: `${item.ID}`,
            x: x0,
            y: y0,
            width: w,
            height: h,
            name: item.Desc,
            stroke: "yellow",
            strokeWidth: 1,
            uuid: `${uuid}`
          });
        });

        this.setState({
          recArrays: [...res],
          canvasItem: sourceItem
        });
      }
    } else {
      message.error("获取控制柜失败");
    }
  }

  onModeChange(e) {
    console.log(`mode change to : ${e.target.value}`);
    if (e.target.value === "moveall") {
      console.log("i am in setting the transformer");
      const { shapeRefArray, trsfomerRef } = this.state;
      if (trsfomerRef !== undefined && trsfomerRef !== null) {
        trsfomerRef.nodes(shapeRefArray);
        trsfomerRef.getLayer().batchDraw();
      }
    }
    this.setState({
      mode: e.target.value,
      selectedId: null,
      selected: {
        uuid: "",
        id: "",
        desc: ""
      }
    });
  }

  onMouseEnter(e) {
    e.target.container().style.cursor = "grab";
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

  getInfoFromAxis(axis, rationWidth, rationHeight) {
    let xmin = Math.min(axis[0][0], axis[1][0], axis[2][0], axis[3][0]);
    const xmax = Math.max(axis[0][0], axis[1][0], axis[2][0], axis[3][0]);
    let ymin = Math.min(axis[0][1], axis[1][1], axis[2][1], axis[3][1]);
    const ymax = Math.max(axis[0][1], axis[1][1], axis[2][1], axis[3][1]);

    const width = ((xmax - xmin) / rationWidth).toFixed(2);
    const height = ((ymax - ymin) / rationHeight).toFixed(2);
    xmin = (xmin / rationWidth).toFixed(2);
    ymin = (ymin / rationHeight).toFixed(2);
    return [
      parseFloat(xmin),
      parseFloat(ymin),
      parseFloat(width),
      parseFloat(height)
    ];
  }

  checkDeselect(e) {
    const { recArrays } = this.state;
    let clickedOnEmpty = true;
    console.log(
      `deselect : ${JSON.stringify(e.target)}, e.getStage:${JSON.stringify(
        e.target.getStage()
      )}`
    );
    const allIds = recArrays.map((item) => {
      return item.id;
    });
    if (e.target.attrs.hasOwnProperty("uuid")) {
      if (!allIds.includes(e.target.attrs.uuid)) {
        clickedOnEmpty = false;
      }
    }

    if (clickedOnEmpty) {
      this.setState({ selectedId: null });
    } else {
      this.setState({ selectedId: e.target.attrs.uuid });
    }
  }

  selectAllRectangle() {
    const node = this.selectionRectRef.current;
    // disable click event
    Konva.listenClickTap = false;
    const [x, y, width, height] = this.selectAllPosition();
    console.log(`get x, y , width,height is: [${x},${y},${width},${height}]`);
    node.setAttrs({
      visible: true,
      x,
      y,
      width,
      height,
      fill: "rgba(0, 161, 255, 0.3)",
      stroke: "lightblue",
      strokeWidth: 1
    });
    // document.getElementsById("canvasArea").style.cursor = "grabbing";
    node.getLayer().batchDraw();
  }

  selectAllPosition() {
    const { recArrays } = this.state;
    let minx = 980;
    let miny = 540;
    let maxx = 0;
    let maxy = 0;
    recArrays.map((item) => {
      if (item.x < minx) {
        minx = item.x;
      }
      if (item.y < miny) {
        miny = item.y;
      }
      if (item.x > maxx) {
        maxx = item.x;
      }
      if (item.y > maxy) {
        maxy = item.y;
      }
    });
    const lastElement = recArrays.filter((item) => {
      return item.x === maxx;
    })[0];
    return [
      minx - 10 < 0 ? minx : minx - 10,
      miny - 10 < 0 ? miny : miny - 10,
      minx + maxx - minx + lastElement.width > 980
        ? 980
        : maxx - minx + lastElement.width + 20,
      miny + maxy - miny + lastElement.height > 540
        ? 980
        : maxy - miny + lastElement.height + 20
    ];
  }

  dragAllEnd(e) {
    const { mode } = this.state;

    if (mode === "moveall") {
      const node = this.selectionRectRef.current;
      node.setAttrs({
        visible: false
      });
      console.log(`draw all, mode is ${mode}`);
      const groupPos = e.target.getAbsolutePosition();
      console.log(`Group position before all: x:${groupPos.x},y:${groupPos.y}`);

      e.target.absolutePosition({
        x: 0,
        y: 0
      });
      const groupPosNew = e.target.getAbsolutePosition();

      console.log(`Group position all: x:${groupPosNew.x},y:${groupPosNew.y}`);

      // console.log(`drag with all node end： ${JSON.stringify(e.target)}`);
      // console.log(`before drag all:${JSON.stringify(recArrays)}`);

      // const { x, y } = e.target.attrs;
      const { children } = e.target;
      console.log(`children is:${JSON.stringify(children)}`);
      const newArr = [];
      children.map((item) => {
        newArr.push(item.attrs);
      });
      console.log(`x, y is :[${groupPos.x},${groupPos.y}]`);

      const afterMoveArr = [];
      newArr.map((item) => {
        if (item.hasOwnProperty("uuid")) {
          afterMoveArr.push({
            ...item,
            x: item.x + groupPos.x,
            y: item.y + groupPos.y
          });
        }
      });

      console.log(`draw after:${JSON.stringify(afterMoveArr)}`);

      this.setState({
        recArrays: [...afterMoveArr]
      });
    }
  }

  deleteRectangle() {
    console.log("delete");
    const { selected, recArrays, mode } = this.state;
    console.log(`start to delete this;${JSON.stringify(selected)}`);
    const { uuid } = selected;
    if (mode !== "edit") {
      message.info("请切换到编辑模式，再进行删除！");
      return;
    }
    const newArr = recArrays.filter((item) => {
      return item.uuid !== uuid;
    });
    console.log(`NEW ARR: ${JSON.stringify(newArr)}`);
    this.setState(
      {
        recArrays: [...newArr],
        selected: {
          id: "",
          desc: "",
          uuid: ""
        }
      },
      () => {
        message.info("删除成功！");
      }
    );
  }

  saveDetail() {
    const { canvasItem, recArrays } = this.state;
    console.log(`current page before:${JSON.stringify(canvasItem)}`);
    const regionData = recArrays.map((item) => {
      return [
        [item.x, item.y],
        [item.x + item.width, item.y],
        [item.x, item.y + item.height],
        [item.x + item.width, item.y + item.height]
      ];
    });

    canvasItem.regions = [...regionData];
    // TODO： check desc and uuid
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
      fillPatternImage,
      ratioWidth,
      ratioHeight,
      recArrays,
      mode,
      selected,
      selectedId
    } = this.state;
    console.log(`re render mode get : ${mode}`);
    return (
      <div className={style.monitorArea}>
        <div className={style.btnLayer}>
          <div className={style.modepart}>
            <div className={style.editlabel}>编辑模式:</div>
            <Radio.Group onChange={this.onModeChange} value={mode}>
              <Radio value="edit">编辑</Radio>
              <Radio value="moveall">
                <Tooltip title="点击-->按住鼠标移动-->放开鼠标结束移动">
                  <span>
                    全部移动
                    <ExclamationCircleOutlined />
                  </span>
                </Tooltip>
              </Radio>
            </Radio.Group>
          </div>
          <Button
            type="primary"
            onClick={() => {
              console.log("good to create");
              const newItem = {
                uuid: uuidv4(),
                id: "newId",
                x: 10,
                y: 10,
                width: 100,
                height: 100,
                name: "default",
                stroke: "yellow",
                strokeWidth: 1
              };
              recArrays.push(newItem);
              this.setState({
                recArrays: [...recArrays]
              });
            }}
          >
            新建
          </Button>
        </div>

        <div className={style.monitorCanvas} id="canvasArea">
          <Stage
            width={960}
            height={540}
            onMouseDown={this.checkDeselect}
            onTouchStart={this.checkDeselect}
            onMouseEnter={this.onMouseEnter}
            key="onlyStageHere"
          >
            <Layer key="onlyLayerHere">
              <Group key="backgroundGroup">
                <Rect
                  x={0}
                  y={0}
                  width={960}
                  height={540}
                  fillPatternImage={fillPatternImage}
                  fillPatternScaleX={1 / parseInt(ratioWidth, 10)}
                  fillPatternScaleY={1 / parseInt(ratioHeight, 10)}
                />
              </Group>
              <Group key="onlyGroup" onDragEnd={this.dragAllEnd} draggable>
                {recArrays.map((rect, i) => {
                  return (
                    <Rectangle
                      key={rect.uuid}
                      shapeProps={rect}
                      isSelected={rect.uuid === selected.uuid}
                      dragMode={mode}
                      onSelect={() => {
                        console.log(
                          `on select rec is ${selectedId} and rect id is: ${rect.id}`
                        );
                        if (mode === "moveall") {
                          this.selectAllRectangle();
                        } else {
                          this.setState({
                            selected: {
                              uuid: rect.uuid,
                              id: rect.id,
                              desc: rect.name
                            }
                          });
                        }
                      }}
                      onChange={(newAttrs) => {
                        const rects = recArrays.slice();
                        rects[i] = newAttrs;
                        this.setState({
                          recArrays: [...rects]
                        });
                      }}
                    />
                  );
                })}
                <Rect
                  id={`selectall${uuidv4()}`}
                  uuid={`selectall${uuidv4()}`}
                  name="selectall"
                  stroke="stroke"
                  strokeWidth={1}
                  draggable={false}
                  key="onlySelectAll"
                  fill="rgba(0,0,255,0.5)"
                  ref={this.selectionRectRef}
                />
              </Group>
            </Layer>
          </Stage>
        </div>
        <div className={style.propInfo}>
          <div className={style.labelFont}>ID:</div>
          <Input
            defaultValue=""
            className={style.inputFirst}
            size="small"
            placeholder="ID"
            value={selected.id}
            onChange={(e) => {
              const res = [];
              recArrays.map((item) => {
                if (item.uuid === selected.uuid) {
                  res.push({
                    ...item,
                    id: `${e.target.value}`
                  });
                } else {
                  res.push(item);
                }
              });

              this.setState({
                recArrays: [...res],
                selected: { ...selected, id: e.target.value }
              });
            }}
          />
          <div className={style.labelFont}>描述:</div>
          <Input
            className={style.inputSecond}
            defaultValue=""
            size="small"
            placeholder="Description"
            value={selected.desc}
            onChange={(e) => {
              const res = [];
              recArrays.map((item) => {
                if (item.uuid === selected.uuid) {
                  res.push({
                    ...item,
                    name: e.target.value
                  });
                } else {
                  res.push(item);
                }
              });

              this.setState({
                recArrays: [...res],
                selected: { ...selected, desc: e.target.value }
              });
            }}
          />

          <Button
            type="link"
            onClick={this.deleteRectangle}
            disabled={mode !== "edit"}
          >
            删除
          </Button>
          <Button type="primary" onClick={this.saveDetail}>
            保存
          </Button>
        </div>
      </div>
    );
  }
}
export default CanavasRectangleComponet2;
