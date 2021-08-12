import React, { Component } from "react";
import { Button, message, Radio, Input, Tooltip } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { Stage, Layer, Rect, Group } from "react-konva";
// eslint-disable-next-line no-unused-vars
import Konva from "konva";
import * as style from "../../css/rectangle.less";
import APICONST from "../../services/APIConst";
import { fetchAllInsturment } from "../../services/devices";
// import Rectangle from "./konva-rectangle";
import SimpleRectangle from "./SimpleRectangle";

class CanavasRectangleComponet2 extends Component {
  constructor(props) {
    super(props);
    this.getImage = this.getImage.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.createRectangles = this.createRectangles.bind(this);
    this.deleteRectangle = this.deleteRectangle.bind(this);
    this.getInfoFromAxis = this.getInfoFromAxis.bind(this);
    this.checkDeselect = this.checkDeselect.bind(this);
    this.onModeChange = this.onModeChange.bind(this);

    this.dragAllEnd = this.dragAllEnd.bind(this);
    this.state = {
      recArrays: [],
      ratioWidth: 1,
      ratioHeight: 1,
      fillPatternImage: null,
      mode: "edit",
      isDrawing: false,
      selectedId: null,
      selected: {
        id: "",
        desc: ""
      }
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
          res.push({
            x: x0,
            y: y0,
            width: w,
            height: h,
            id: item.ID,
            desc: item.Desc
          });
        });

        this.setState({
          recArrays: [...res]
        });
      }
    } else {
      message.error("获取控制柜失败");
    }
  }

  componentDidUpdate() {
    const { recArrays } = this.state;
    console.log(`updated : ${JSON.stringify(recArrays)}`);
  }

  handleClick(e) {
    console.log(`click rect${JSON.stringify(e)}`);
    this.setState({
      selected: {
        id: e.rectId,
        desc: e.desc
      }
    });
  }

  handleDragStart(e) {
    const { selected } = this.state;
    console.log(`start drag get selected: ${JSON.stringify(selected)}`);
  }

  //
  handleDragEnd(e) {
    // const target = JSON.parse(e.target);
    console.log(
      `handle drag in parent rect end${JSON.stringify(e.target.attrs)}`
    );
    const { rectId, x, y } = e.target.attrs;
    const { recArrays } = this.state;
    const res = [];
    recArrays.map((item) => {
      if (item.id === rectId) {
        res.push({
          ...item,
          x,
          y
        });
      } else {
        res.push(item);
      }
    });
    console.log(`after drag end : res is:${JSON.stringify(res)}`);
    this.setState({
      recArrays: [...res]
    });
  }

  onModeChange(e) {
    this.setState({
      mode: e.target.value
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

  dragAllEnd(e) {
    const { recArrays, mode, ratioWidth, ratioHeight } = this.state;
    if (mode === "moveall") {
      console.log(`drag with all node end： ${JSON.stringify(e.target)}`);
      console.log(`before drag all:${JSON.stringify(recArrays)}`);

      const { x, y } = e.target.attrs;
      const { children } = e.target;
      const newArr = [];
      children.map((item) => {
        newArr.push(item.attrs);
      });
      console.log(`ration is :${ratioWidth},${ratioHeight}`);
      const res = newArr.map((item) => {
        return {
          ...item,
          x: item.x + x,
          y: item.y + y,
          id: item.rectId
        };
      });
      console.log(`after drag all:${JSON.stringify(res)}`);

      this.setState({
        recArrays: [...res]
      });
    }
  }

  checkDeselect(e) {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      this.setState({ selectedId: null });
    }
  }

  createRectangles(recArray, mode) {
    const rectangles = [];
    const { isDrawingMode } = this.state;
    if (recArray.length > 0) {
      if (mode === "edit" || mode === "new") {
        recArray.map((item) => {
          rectangles.push(
            <SimpleRectangle
              key={item.id}
              rectId={item.id}
              desc={item.desc}
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.height}
              isDrawingMode={isDrawingMode}
              onClick={(e) => {
                this.handleClick(e);
              }}
              onDragStart={(e) => {
                this.handleDragStart(e);
              }}
              onDragEnd={(e) => {
                this.handleDragEnd(e);
              }}
              drag="true"
            />
          );
        });
      } else if (mode === "moveall") {
        recArray.map((item) => {
          rectangles.push(
            <SimpleRectangle
              key={item.id}
              rectId={item.id}
              desc={item.desc}
              x={item.x}
              y={item.y}
              width={item.width}
              height={item.height}
              isDrawingMode={isDrawingMode}
              onClick={this.handleClick}
              onDragStart={this.handleDragStart}
              onDragEnd={this.handleDragEnd}
              drag="false"
            />
          );
        });
      }
    }

    return rectangles;
  }

  deleteRectangle() {
    console.log("delete");
    const { selected, recArrays } = this.state;
    const { id } = selected;
    const newArr = recArrays.filter((item) => {
      return item.id !== id;
    });
    console.log(`NEW ARR: ${JSON.stringify(newArr)}`);
    this.setState(
      {
        recArrays: [...newArr],
        selected: {
          id: "",
          desc: ""
        }
      },
      () => {
        message.info("删除成功！");
      }
    );
  }

  saveDetail() {
    // const { canvasItem, recArrays } = this.state;
    // console.log(`current page before:${JSON.stringify(canvasItem)}`);
    // canvasItem.regions = [...recArrays];
    // console.log(`after page before:${JSON.stringify(canvasItem)}`);
    // const payload = {
    //   ...canvasItem
    // };
    // saveSourceCanvasDetail(payload)
    //   .then(({ data }) => {
    //     console.log(`result save:${JSON.stringify(data)}`);
    //     if (data.state) {
    //       message.info("保存成功！");
    //     } else {
    //       message.info("保存失败！");
    //     }
    //   })
    //   .then(() => {
    //     this.setState({
    //       mode: "",
    //       ismouseDown: false,
    //       isMoveAll: false
    //     });
    //   });
  }

  render() {
    const {
      fillPatternImage,
      ratioWidth,
      ratioHeight,
      recArrays,
      mode,
      selected
    } = this.state;
    // const rectangleImages = [];
    const rectangleImages = this.createRectangles(recArrays, mode);
    return (
      <div className={style.monitorArea}>
        <div className={style.btnLayer}>
          <div className={style.modepart}>
            <div className={style.editlabel}>编辑模式:</div>
            <Radio.Group onChange={this.onModeChange} value={mode}>
              <Radio value="new">
                <Tooltip title="点击-->移动-->点击结束创建">
                  <span>
                    新建
                    <ExclamationCircleOutlined />
                  </span>
                </Tooltip>
              </Radio>
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
        </div>

        <div className={style.monitorCanvas} id="canvasArea">
          <Stage
            width={960}
            height={540}
            onMouseDown={this.checkDeselect}
            onTouchStart={this.checkDeselect}
          >
            <Layer>
              <Group>
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
              <Group onDragEnd={this.dragAllEnd} draggable>
                {rectangleImages}
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
            disabled
          />
          <div className={style.labelFont}>描述:</div>
          <Input
            className={style.inputSecond}
            defaultValue=""
            size="small"
            placeholder="Description"
            value={selected.desc}
            onChange={(e) => {
              if (selected.id === "" || selected.desc === "") {
                return;
              }
              const res = [];
              recArrays.map((item) => {
                if (item.id === selected.id) {
                  res.push({
                    ...item,
                    desc: e.target.value
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

          <Button type="link" onClick={this.deleteRectangle}>
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
