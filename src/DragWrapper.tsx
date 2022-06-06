import { Drag } from "./dragger";
import React, { MouseEvent, useRef, useState } from "react";
/**
 * I want a component that wraps a n-draggable elements
 */

 interface IElement {
  id?: string;
  position?: {
    x?: number;
    y?: number;
  }
}

interface IDraggable {
  onDrag: (e: MouseEvent<any>) => any,
  onDragEnd: (e: MouseEvent<any>, ...args: any) => any,
  onDragStart?: (e: MouseEvent<any>, ...args: any) => any,
  ref: React.Ref<any>
  children: React.ReactNode
  id: string
}

const Draggable: React.FC<IDraggable> = React.forwardRef(({ children, onDrag, onDragEnd, onDragStart, id }, ref) => {
  const [dragging, setDragging] = useState(false);

  const handleDragStart = (e:any) => {
    setDragging(true);
    onDragStart(e);
  };
  const handleDrag = (e:any) => {
    if (dragging) {
      onDrag(e);
    }
  };
  const handleDragEnd = (e:any) => {
    console.log("drag end", e);
    setDragging(false);
    onDragEnd(e);
  };
  return (
    <div
      id={id}
      style={{ position: 'relative', backgroundColor: 'red', width: '100%', height: '3rem', margin: '1rem' }}
      ref={ref}
      onMouseDown={handleDragStart}
      onMouseMove={handleDrag}
      onMouseUp={handleDragEnd}
    >
      {children}
    </div>
  );
})

export const DragWrapper: React.FC<any> = ({ children }) => {
  const childRef = useRef<HTMLElement[]>([])
  const setChildRef = (index:number) => (el:React.ReactElement) => childRef[index] = el as React.ReactElement

  const handleElements = (e: MouseEvent<HTMLDivElement>,ind:number) => {
    console.log(childRef[0], ind)
    const element: HTMLDivElement = childRef[ind]
    const elementPosition = element.getBoundingClientRect()
    const { x, y } = elementPosition
    console.log(x, y)
  }

  return (
    <div className="drag-container">
      {children.map((child:any, index:any) => (
        <Draggable
          ref={setChildRef(index)}
          id={index}
          onDrag={() => console.log('hi')}
          onDragEnd={(e:MouseEvent<HTMLDivElement>) => handleElements(e,index)}
          onDragStart={() => console.log('nothing at the moment')}
          key={index+75}>{child}
        </Draggable>
        ))}
    </div>
  )
}