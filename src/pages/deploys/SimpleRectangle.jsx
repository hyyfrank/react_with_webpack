import React from "react";
// import R from 'ramda';
import Konva from "konva";
import { Rect } from "react-konva";

class SimpleRectangle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: "transparent"
    };
    this.handleSubClick = this.handleSubClick.bind(this);
  }

  handleSubClick = (e) => {
    const { isDrawingMode, onClick } = this.props;
    if (!isDrawingMode) {
      e.evt.stopPropagation();
      console.log(`on sub page props: ${JSON.stringify(this.props)}`);
      onClick(this.props);
    }
  };

  render() {
    const { x, y, width, height, drag, rectId, uuid, desc, onDragEnd } =
      this.props;
    return (
      <Rect
        key={uuid}
        uuid={uuid}
        x={x}
        y={y}
        width={width}
        height={height}
        rectId={rectId}
        desc={desc}
        strokeWidth={1}
        stroke="red"
        draggable={drag === "true"}
        onClick={this.handleSubClick}
        onDragEnd={onDragEnd}
      />
    );
  }
}
export default SimpleRectangle;
