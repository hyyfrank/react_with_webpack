import React, { Component } from "react";
import { Button, Input, message } from "antd";
import { throttle } from "throttle-debounce";
import { Stage, Layer, Rect, Text } from "react-konva";
import Konva from "konva";
import * as style from "../../css/rectangle.less";
import APICONST from "../../services/APIConst";
import { fetchAllInsturment } from "../../services/devices";
import saveSourceCanvasDetail from "../../services/rectangle";

class CanavasRectangleComponet2 extends Component {
  constructor(props) {
    super(props);
    const { iotCode } = this.props;
    this.getImage = this.getImage.bind(this);
    this.handleDragStart = this.handleDragStart.bind(this);
    this.handleDragEnd = this.handleDragEnd.bind(this);
    this.createRectangles = this.createRectangles.bind(this);
    this.getInfoFromAxis = this.getInfoFromAxis.bind(this);
    this.state = {
      recArrays: [],
      ratioWidth: 1,
      ratioHeight: 1,
      fillPatternImage: null
    };
  }

  async componentDidMount() {
    console.log("******************in konva component******************");
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
    const monitorImageUrl = `${APICONST.BASE_URL}/?filename=picture/${iotCode}.jpg`;
    await this.getImage(monitorImageUrl).then((initImage) => {
      const w = initImage.width;
      const h = initImage.height;
      this.setState({
        ratioWidth: (w / 960).toFixed(2),
        ratioHeight: (h / 540).toFixed(2),
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
        this.setState({
          recArrays: sourceItem.regions
        });
      }
    } else {
      message.error("获取控制柜失败");
    }
  }

  handleDragStart() {
    console.log("handle drag rect");
  }

  handleDragEnd() {
    console.log("handle drag rect end");
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
    return [xmin, ymin, width, height];
  }

  createRectangles(arr, ratioWidth, rationHeight) {
    console.log(`recArr is :${JSON.stringify(arr)}`);
    const res = [];
    const rectangles = [];
    arr.map((item) => {
      const [x0, y0, w, h] = this.getInfoFromAxis(
        item.axis,
        ratioWidth,
        rationHeight
      );
      res.push({
        x: x0,
        y: y0,
        width: w,
        height: h
      });
    });
    res.map((item) => {
      rectangles.push(
        <Rect
          key={`${item.x}key${item.y}`}
          x={parseFloat(item.x)}
          y={parseFloat(item.y)}
          width={parseFloat(item.width)}
          height={parseFloat(item.height)}
          fill="rgba(165,246,247,0.5)"
          draggable
          strokeWidth={1}
          stroke="red"
          onDragStart={this.handleDragStart}
          onDragEnd={this.handleDragEnd}
        />
      );
    });
    return rectangles;
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
    const { fillPatternImage, ratioWidth, ratioHeight, recArrays } = this.state;
    const rectangleImages = this.createRectangles(
      recArrays,
      ratioWidth,
      ratioHeight
    );
    return (
      <div className={style.monitorArea}>
        <div className={style.btnLayer}>
          <div>
            <Button type="primary" onClick={this.saveDetail}>
              保存
            </Button>
          </div>
        </div>

        <div className={style.monitorCanvas} id="canvasArea">
          <Stage width={window.innerWidth} height={window.innerHeight}>
            <Layer>
              <Rect
                x={0}
                y={0}
                width={960}
                height={540}
                fillPatternImage={fillPatternImage}
                fillPatternScaleX={1 / parseInt(ratioWidth, 10)}
                fillPatternScaleY={1 / parseInt(ratioHeight, 10)}
              />
              {rectangleImages}
            </Layer>
          </Stage>
        </div>
      </div>
    );
  }
}
export default CanavasRectangleComponet2;
