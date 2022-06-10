import { useEffect, useLayoutEffect, useRef } from 'react'
import './Draggable.css'

interface IDraggable {
  id?: number,
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>,
  onMouseOver?:  React.MouseEventHandler<HTMLDivElement>,
  boxSize?: number,
  parentRef?: React.RefObject<HTMLDivElement>
  children?: React.ReactNode
}

export const Draggable: React.FC<IDraggable> = ({ id, children, onMouseOver, onMouseDown, boxSize, parentRef }) => {
  const ref = useRef<HTMLDivElement>(null)

  const tid = id as number
  const tboxSize = boxSize as number
  
  useEffect(() => {
    let hasJump:boolean = false
    if (ref.current) {
      ref.current.style.height = boxSize + 'px'
      ref.current.style.width = boxSize + 'px'
      const right = ref.current.offsetLeft + ref.current.offsetWidth
      if (parentRef?.current) {
        const parentRight = parentRef.current.offsetLeft + parentRef.current.offsetWidth
        if (right >= parentRight) {
          console.log('out of boundaries', id)
          ref.current.style.top = tboxSize + 30 + 'px'
          hasJump = true
        }
      }
      if (hasJump) {
        ref.current.style.left = (+ref.current.offsetWidth + 10) * (tid) + 'px'
      } else {
        ref.current.style.left = (+ref.current.offsetWidth + 10) * tid + 'px'
      }
    }
  }, [])

  return (
    <div className='draggable'
      id={(id as number).toString()}
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseOver={onMouseOver}
      >
      {children}
    </div>
  )
}