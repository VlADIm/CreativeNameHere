import React, { useCallback, useState } from 'react';
import { LinePath } from '@visx/shape';
import { useDrag } from '@visx/drag';
import { curveBasis } from '@visx/curve';
import { LinearGradient } from '@visx/gradient';
import './DrawNum.css';

type Line = { x: number; y: number }[];
type Lines = Line[];
type Num = number[][];
type AddLine = (lines: Lines)=>Lines;

export type DragIIProps = {
    width: number;
    height: number;
    formatted_data: number[][];
    transferData:  (currLines: Lines) => void;
    data?: Lines;

};

export default function DragII({ data = [], width, height, formatted_data, transferData
}: DragIIProps) {

    const [lines, setLines] = useState<Lines>(data);
    const [drawn,setDrawn] =useState<number[][]>(formatted_data);
    const onDragStart = useCallback(
      currDrag => {
        // add the new line with the starting point
        const temp = (currLines: Lines) => {
            return [...currLines, [{ x: currDrag.x, y: currDrag.y }]]
        }
        transferData(temp(data));
        setDrawn(currDraw => {
            const newPoint = { x: currDrag.x, y: currDrag.y};
            currDraw[Math.trunc(newPoint.y/10)][Math.trunc(newPoint.x/10)]=1;
            return currDraw;
        });
      },
      [transferData, setDrawn],
    );
    const onDragMove = useCallback(
      currDrag => {
        // add the new point to the current line
        const temp = (currLines: Lines) => {
            const nextLines = [...currLines];
            const newPoint = { x: currDrag.x + currDrag.dx, y: currDrag.y + currDrag.dy };
            const lastIndex = nextLines.length - 1;
            nextLines[lastIndex] = [...(nextLines[lastIndex] || []), newPoint];
            return nextLines;
        }

        transferData(temp(data));
        setDrawn(currDraw => {
            const newPoint = { x: currDrag.x + currDrag.dx, y: currDrag.y + currDrag.dy };
            const lastLine = data[data.length-1];
            const lastPoint = lastLine[lastLine.length-1];
            for(var x = Math.trunc(Math.min(lastPoint.x,newPoint.x)/10); x<= Math.trunc(Math.max(lastPoint.x,newPoint.x)/10);x++){
                for(var y = Math.trunc(Math.min(lastPoint.y,newPoint.y)/10); y<= Math.trunc(Math.max(lastPoint.y,newPoint.y)/10);y++){
                    currDraw[y][x]=1;
                }
            }
            return currDraw;
        });
      },
      [transferData,setDrawn],
    );

  const { x = 0, y = 0, dx, dy, isDragging, dragStart, dragEnd, dragMove } = useDrag({
    onDragStart,
    onDragMove,
    resetOnStart: true,
  });

  return width < 10 ? null : (
    <div className="DragII" style={{ touchAction: 'none' }}>
      <svg width={width} height={height}>
        <LinearGradient id="stroke" from="#ff614e" to="#ffdc64" />
        <rect fill="#04002b" width={width} height={height} rx={14} />
        {data.map((line, i) => (
          <LinePath
            key={`line-${i}`}
            fill="transparent"
            stroke="url(#stroke)"
            strokeWidth={10}
            data={line}
            curve={curveBasis}
            x={d => d.x}
            y={d => d.y}
          />
        ))}

        <g>
          {isDragging && (
            /* capture mouse events (note: <Drag /> does this for you) */
            <rect
              width={width}
              height={height}
              onMouseMove={dragMove}
              onMouseUp={dragEnd}
              fill="transparent"
            />
          )}
          {/* decorate the currently drawing line */}
          {isDragging && (
            <g>
              <rect
                fill="white"
                width={8}
                height={8}
                x={x + dx - 4}
                y={y + dy - 4}
                pointerEvents="none"
              />
              <circle cx={x} cy={y} r={4} fill="transparent" stroke="white" pointerEvents="none" />
            </g>
          )}
          {/* create the drawing area */}
          <rect
            fill="transparent"
            width={width}
            height={height}
            onMouseDown={dragStart}
            onMouseUp={isDragging ? dragEnd : undefined}
            onMouseMove={isDragging ? dragMove : undefined}
            onTouchStart={dragStart}
            onTouchEnd={isDragging ? dragEnd : undefined}
            onTouchMove={isDragging ? dragMove : undefined}
          />
        </g>
      </svg>
    </div>
  );
}
