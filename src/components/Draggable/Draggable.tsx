import { cloneElement, createRef, forwardRef, LegacyRef, ReactNode, useRef } from 'react'
import './Draggable.css'

interface IDraggable {
  id: string,
  children?: React.ReactNode
}

export const Draggable: React.FC<IDraggable> = forwardRef(({id, children}, ref:LegacyRef<HTMLDivElement>) => {
  return (
    <div className='draggable' id={id} ref={ref}>
      {children}
    </div>
  )
})