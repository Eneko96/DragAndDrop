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
      className="draggable"
      id={id}
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
      const element = childRef[dragElement]
      element.style.left = e.clientX - element.offsetWidth +'px'
      element.style.top = e.clientY - element.offsetHeight +'px'
      const isTouching = Object.entries(childRef).find(([key, value]) => {
        if (key !== 'current' && key !== (dragElement as number).toString()) {
          const elementPosition = value.getBoundingClientRect() as DOMRect
          const { bottom: parentBottom, top: parentTop, left: parentLeft, right: parentRight } = elementPosition
          const { clientX: x, clientY: y } = e
          return x > parentLeft && x < parentRight && y > parentTop && y < parentBottom
        }
      })
      if (isTouching?.length > 0) {
        console.log('touching')
        const [,value] = isTouching
        value.style.left = '0px'
        value.style.top = '0px'
        value.style.transition = 'left 0.2s, top 0.2s';
        value.addEventListener('transitionend', () => {
          value.style.transition = ''
        })
      }
    }
  }

  const handleMouseUp = (e: MouseEvent<HTMLElement>) => {
    console.warn('mouse up')
    if (isDragging) {
      const element = childRef[dragElement]
      console.log(element.style.left, element.offsetWidth)
      element.style.left = e.clientX - element.clientWidth +'px'
      element.style.top = e.clientY - element.clientHeight +'px'
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