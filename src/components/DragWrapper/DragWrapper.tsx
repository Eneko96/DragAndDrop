import React, { Children, cloneElement, ReactElement, useEffect, useRef, useState } from "react"
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
  const [jIndex, setJIndex] = useState<number>(0)
  // const dragOverItem = useRef<number>()

  useEffect(() => {
    if (parentRef.current) {
      const parentRight = parentRef.current.offsetLeft + parentRef.current.offsetWidth
      let isJump = null
      let accBox = 0
      let count = 0
      while (!isJump) {
        accBox += (boxSize + 10) * count
        if (accBox >= parentRight) isJump = count
        else ++count
      }
      if (isJump) setJIndex(isJump)
      console.log(isJump, count)
    }
  }, [])

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
      jump: jIndex,
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