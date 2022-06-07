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
  ref: React.Ref<any>
  children: React.ReactNode
  id: string
}

const Draggable: React.FC<IDraggable> = React.forwardRef(({ children, id }, ref) => {
  return (
    <div
      id={id}
      style={{ position: 'relative', backgroundColor: 'red', padding: '1rem', height: '3rem', margin: '1rem', display: 'inline-block' }}
      ref={ref}
    >
      {children}
    </div>
  );
})

export const DragWrapper: React.FC<any> = ({ children }) => {
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [dragElement, setDragElement] = useState<number|null>(null)
  const childRef = useRef(null)
  const parentRef = useRef(null);
  const setChildRef = (index:number) => (el:React.ReactElement) => childRef[index] = el

  const handleMouseDown = (e: MouseEvent<HTMLElement>) => {
    console.log(e)
    console.warn('mouse down')
    const inElement = () => {
      console.log(childRef, Object.keys(childRef))
      for (let i = 0; i < Object.keys(childRef).length-1; i++) {
        const element = childRef[i] as HTMLElement
        const elementPosition = element.getBoundingClientRect()
        const { clientX: x, clientY: y } = e
        const { bottom: parentBottom, top: parentTop, left: parentLeft, right: parentRight } = elementPosition
        if (x > parentLeft && x < parentRight && y > parentTop && y < parentBottom) {
          console.log(x, y)
          console.log('in element')
          setDragElement(i)
          setIsDragging(true)
        }
      }
    }
    inElement()
  }

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (isDragging) {
      console.warn('moving')
      const { clientX: x, clientY: y } = e
      // console.log('antique position', )
      console.log('actual position', x, y)
    }
  }

  const handleMouseUp = (e: MouseEvent<HTMLElement>) => {
    console.warn('mouse up')
    if (isDragging) {
      console.log(childRef[dragElement].offsetWidth)
      childRef[dragElement].style.left = e.clientX - childRef[dragElement].offsetWidth / 2 +'px'
      childRef[dragElement].style.top = e.clientY+'px'
    }
    setIsDragging(false)
  }

  return (
    <div
      className="drag-container"
      ref={parentRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ backgroundColor: '#00f0ff'}}
    >
      {children.map((child:any, index:any) => (
        <Draggable
          ref={setChildRef(index)}
          id={index}
          key={index+75}>{child}
        </Draggable>
        ))}
    </div>
  )
}