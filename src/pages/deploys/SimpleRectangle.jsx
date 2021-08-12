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

  handleSubClick() {
    const { isDrawingMode, onClick } = this.props;
    if (!isDrawingMode) {
      onClick(this.props);
    }
  }

  render() {
    const { x, y, width, height, drag, rectId, desc, onDragStart, onDragEnd } =
      this.props;
    return (
      <Rect
        key={rectId}
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
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      />
    );
  }
}
export default SimpleRectangle;
