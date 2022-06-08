import React, { Children, cloneElement, ReactElement, useRef, useState } from "react"
import { _inBoundaries } from "./utils"
import { pConsole } from '@lib'

interface IDragWrapper {
  children: ReactElement | ReactElement[]
}

export const DragWrapper: React.FC<IDragWrapper> = ({children}) => {
  const childrenArr = Children.toArray(children)
  const dragItem = useRef<number>()
  const dragOverItem = useRef<number>()
  const [list, setList] = useState((children as React.ReactNode[]).map(e => e))

  const handleDragEnd = (_e: React.DragEvent<HTMLDivElement>) => {
    const copyList = [...list]
    let numberDrag = dragItem.current as number
    let numberDragOver = dragOverItem.current as number
    const dragItemContent = copyList[numberDrag]
    copyList.splice(numberDrag, 1);
    copyList.splice(numberDragOver, 0, dragItemContent);
    (numberDrag as number|null) = null;
    (numberDragOver as number|null) = null;
    setList(copyList);
  }

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    (dragItem.current) = position
    // @ts-ignore
    pConsole(e.target.innerHtml)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>, position: number) => {
    (dragOverItem.current) = position
    // @ts-ignore
    pConsole(e.target.innerHTML)
  }

  const clonedArray = (child: ReactElement, idx:number) => (
    cloneElement(child, {
      key: idx,
      onDragEnd: handleDragEnd,
      onDragStart: (e: any) => handleDragStart(e,idx),
      onDragOver: (e: any) => e.preventDefault(),
      onDragEnter: (e: any) => handleDragOver(e,idx)
    })
  )

  return (
    <div 
      style={{ width: '40rem', height: '40rem', backgroundColor: 'blue', display: 'flex', gap: '2rem' }}
    >
      {childrenArr.map((child: ReactElement, idx:number) =>
        clonedArray(child, idx)
        // return <div key={idx}
        // draggable
        // onDragEnd={handleDragEnd}
        // onDragStart={(e) => handleDragStart(e,idx)}
        // onDragEnter={(e) => handleDragOver(e,idx)}
        // onDragOver={(e) => e.preventDefault()}
        // style={{ height: 'fit-content', transition: 'all 1s ease-in'}}
        // >{child}</div>
      )}
    </div>
  )
}