import React, { useEffect } from "react";
import { Stage, Layer, Rect, Transformer } from "react-konva";

const Rectangle = ({ shapeProps, onSelect, onChange }) => {
  const shapeRef = React.useRef();

  return (
    <Rect
      onClick={() => onSelect(shapeRef)}
      onTap={() => onSelect(shapeRef)}
      ref={shapeRef}
      x={shapeProps.x}
      y={shapeProps.y}
      width={shapeProps.width}
      height={shapeProps.height}
      id={shapeProps.uuid}
      stroke={shapeProps.stroke}
      strokeWidth={shapeProps.strokeWidth}
      draggable
      onDragEnd={(e) => {
        onChange({
          ...shapeProps,
          x: e.target.x(),
          y: e.target.y()
        });
      }}
      onTransformEnd={() => {
        const node = shapeRef.current;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();

        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);
        onChange({
          ...shapeProps,
          x: node.x(),
          y: node.y(),
          // set minimal value
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(node.height() * scaleY)
        });
      }}
    />
  );
};

const KonvaComponent = ({
  rectangles: initRectangle,
  fillPatternImage,
  ratioHeight,
  ratioWidth
}) => {
  const [rectangles, setRectangles] = React.useState([]);
  useEffect(() => {
    setRectangles(initRectangle);
  }, [initRectangle]);

  const [selectedId, selectShape] = React.useState(null);
  const [nodesArray, setNodes] = React.useState([]);

  const trRef = React.useRef();
  const layerRef = React.useRef();
  const { Konva } = window;

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
      trRef.current.nodes([]);
      setNodes([]);
      // layerRef.current.remove(selectionRectangle);
    }
  };

  const selectionRectRef = React.useRef();
  const selection = React.useRef({
    visible: false,
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
  });

  const updateSelectionRect = () => {
    const node = selectionRectRef.current;
    node.setAttrs({
      visible: selection.current.visible,
      x: Math.min(selection.current.x1, selection.current.x2),
      y: Math.min(selection.current.y1, selection.current.y2),
      width: Math.abs(selection.current.x1 - selection.current.x2),
      height: Math.abs(selection.current.y1 - selection.current.y2),
      fill: "rgba(0, 161, 255, 0.3)"
    });
    node.getLayer().batchDraw();
  };

  const oldPos = React.useRef(null);
  const onMouseDown = (e) => {
    const isElement = e.target.findAncestor(".elements-container");
    const isTransformer = e.target.findAncestor("Transformer");
    if (isElement || isTransformer) {
      return;
    }

    const pos = e.target.getStage().getPointerPosition();
    selection.current.visible = true;
    selection.current.x1 = pos.x;
    selection.current.y1 = pos.y;
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;
    updateSelectionRect();
  };

  const onMouseMove = (e) => {
    if (!selection.current.visible) {
      return;
    }
    const pos = e.target.getStage().getPointerPosition();
    selection.current.x2 = pos.x;
    selection.current.y2 = pos.y;
    updateSelectionRect();
  };

  const onMouseUp = () => {
    oldPos.current = null;
    if (!selection.current.visible) {
      return;
    }
    const selBox = selectionRectRef.current.getClientRect();

    const elements = [];
    layerRef.current.find(".rectangle").forEach((elementNode) => {
      const elBox = elementNode.getClientRect();
      if (Konva.Util.haveIntersection(selBox, elBox)) {
        elements.push(elementNode);
      }
    });
    trRef.current.nodes(elements);
    selection.current.visible = false;
    // disable click event
    Konva.listenClickTap = false;
    updateSelectionRect();
  };

  const onClickTap = (e) => {
    // if we are selecting with rect, do nothing
    // if (selectionRectangle.visible()) {
    //   return;
    // }
    const stage = e.target.getStage();
    const layer = layerRef.current;
    const tr = trRef.current;
    // if click on empty area - remove all selections
    if (e.target === stage) {
      selectShape(null);
      setNodes([]);
      tr.nodes([]);
      layer.draw();
      return;
    }

    // do nothing if clicked NOT on our rectangles
    if (!e.target.hasName(".rect")) {
      return;
    }

    // do we pressed shift or ctrl?
    const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
    const isSelected = tr.nodes().indexOf(e.target) >= 0;

    if (!metaPressed && !isSelected) {
      // if no key pressed and the node is not selected
      // select just one
      tr.nodes([e.target]);
    } else if (metaPressed && isSelected) {
      // if we pressed keys and node was selected
      // we need to remove it from selection:
      const nodes = tr.nodes().slice(); // use slice to have new copy of array
      // remove node from array
      nodes.splice(nodes.indexOf(e.target), 1);
      tr.nodes(nodes);
    } else if (metaPressed && !isSelected) {
      // add the node into selection
      const nodes = tr.nodes().concat([e.target]);
      tr.nodes(nodes);
    }
    layer.draw();
  };

  return (
    <Stage
      width={960}
      height={540}
      key="onlyStageHere"
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onMouseMove={onMouseMove}
      onTouchStart={checkDeselect}
      onClick={onClickTap}
    >
      <Layer ref={layerRef}>
        <Rect
          x={0}
          y={0}
          width={960}
          height={540}
          fillPatternImage={fillPatternImage}
          fillPatternScaleX={1 / parseInt(ratioWidth, 10)}
          fillPatternScaleY={1 / parseInt(ratioHeight, 10)}
        />
        {rectangles.map((rect, i) => {
          return (
            <Rectangle
              key={rect.uuid}
              getKey={rect.uuid}
              shapeProps={rect}
              isSelected={rect.uuid === selectedId}
              getLength={rectangles.length}
              onSelect={(e) => {
                if (e.current !== undefined) {
                  const temp = nodesArray;
                  if (!nodesArray.includes(e.current)) temp.push(e.current);
                  setNodes(temp);
                  trRef.current.nodes(nodesArray);
                  trRef.current.nodes(nodesArray);
                  trRef.current.getLayer().batchDraw();
                }
                selectShape(rect.uuid);
              }}
              onChange={(newAttrs) => {
                const rects = rectangles.slice();
                rects[i] = newAttrs;
                setRectangles(rects);
                // console.log(rects)
              }}
            />
          );
        })}

        <Transformer
          // ref={trRef.current[getKey]}
          ref={trRef}
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (newBox.width < 5 || newBox.height < 5) {
              return oldBox;
            }
            return newBox;
          }}
        />
        <Rect fill="rgba(0,0,255,0.5)" ref={selectionRectRef} />
      </Layer>
    </Stage>
  );
};

export default KonvaComponent;
