import { useEffect, useRef } from 'react'
import './Draggable.css'

interface IDraggable {
  id: string,
  onDragStart?: React.DragEventHandler<HTMLDivElement>,
  onDragEnter?:  React.DragEventHandler<HTMLDivElement>,
  onDragOver?:  React.DragEventHandler<HTMLDivElement>,
  onDragEnd?:  React.DragEventHandler<HTMLDivElement>,
  children?: React.ReactNode
}

export const Draggable: React.FC<IDraggable> = ({id, children, onDragEnd, onDragEnter, onDragOver, onDragStart}) => {
  const ref = useRef()

  useEffect(() => {
    console.log(ref)
  }, [ref])
  return (
    <div className='draggable'
      id={id}
      ref={ref}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragEnter={onDragEnter}
      >
      {children}
    </div>
  )
}