import React, { Children, cloneElement, createRef, ReactElement, RefObject, useEffect, useRef, useState } from "react"
import { _inBoundaries } from "./utils"
import { pConsole } from '@lib'

interface IDragWrapper {
  children: React.ReactNode | React.ReactNode[]
}
type SafeClone = ReactElement<any, string | React.JSXElementConstructor<any>>

export const DragWrapper: React.FC<IDragWrapper> = ({children}) => {
  const arrayChildren = Children.toArray(children)
  const refs = useRef(arrayChildren.map(createRef))
  const parentRef = useRef<HTMLDivElement>(null)
  const currentChild = useRef<React.RefObject<unknown>|null>(null)

  useEffect(() => {
    if (refs.current[0]) {
      console.log(refs.current[0])
    }
  }, [refs])

  const handleMouseDown = (mouse: React.MouseEvent<HTMLDivElement>) => {
    refs.current.map((child, idx) => {
      const safe = child as React.RefObject<HTMLElement>
      if (_inBoundaries({child: safe, mouse})) {
        pConsole(`in element ${idx}`)
        currentChild.current = child.current as React.RefObject<unknown>
      }
    })
  }

  const handleMouseMove = (mouse: React.MouseEvent<HTMLDivElement>) => {
    if (currentChild.current) {
      console.log(currentChild.current)
      const child: HTMLElement = currentChild.current as unknown as HTMLElement
      child.style.left = mouse.clientX + 'px'
      child.style.top = mouse.clientY + 'px'
    }
  }

  const handleMouseUp = (mouse: React.MouseEvent<HTMLDivElement>) => {
    if (currentChild.current) {
      currentChild.current = null
    }
  }

  return (
    <div ref={parentRef}
      style={{ width: '40rem', height: '40rem', backgroundColor: 'blue', display: 'flex' }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {arrayChildren.map((child, idx:number) => {
        return cloneElement((child as SafeClone), { ref: refs.current[idx]})
      })}
    </div>
  )
}