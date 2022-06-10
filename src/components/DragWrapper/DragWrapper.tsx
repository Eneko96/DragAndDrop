import React, { Children, cloneElement, ReactElement, useRef, useState } from "react"
import { _inBoundaries } from "./utils"
import { pConsole } from '@lib'

interface IDragWrapper {
  boxSize: number,
  children: ReactElement | ReactElement[]
}

export const DragWrapper: React.FC<IDragWrapper> = ({children, boxSize}) => {
  const childrenArr = Children.toArray(children)
  const dragItem = useRef<HTMLDivElement|null>(null)
  const parentRef = useRef<HTMLDivElement|null>(null)
  // const dragOverItem = useRef<number>()

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (parentRef.current) {
      dragItem.current = e.currentTarget
    }
  }

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    dragItem.current = null
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLInputElement>) => {
    if (dragItem.current) {
      pConsole('on move')
      console.log(e.clientX, e.clientY)
      dragItem.current.style.left = e.clientX - dragItem.current.offsetWidth + 'px'
      dragItem.current.style.top = e.clientY - dragItem.current.offsetHeight + 'px'
    }
  }

  const handleMouseEnter = (e: any) => {}

  const handleMouseOver = (e: any) => {}

  const ClonedArray = ({child, idx}: {child: ReactElement, idx:number}) => (
    cloneElement((child), {
      parentRef,
      id: idx,
      onMouseDown: handleMouseDown,
      onMouseOver: handleMouseOver,
      boxSize
    })
  )

  return (
    <div 
      style={{ width: '40rem', height: '40rem', backgroundColor: 'blue', display: 'flex', gap: '2rem', position:'relative' }}
      ref={parentRef}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      {childrenArr.map((child: any, idx:number) => <ClonedArray key={idx} child={child} idx={idx}/>
      )}
    </div>
  )
}