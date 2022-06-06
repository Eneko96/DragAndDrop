import {Drag} from "./dragger"
import { useRef, useState } from "react"

export default function DragWrap(props: any) {
  const elemRef = useRef<HTMLHeadingElement>(null)
  console.log(elemRef.current, elemRef.current?.clientLeft)
  const [drag, setDrag] = useState<Drag|null>(elemRef.current ? new Drag(elemRef.current.clientLeft, elemRef.current.clientTop) : null)
  const [, setDragStart] = useState<number|null>(null)
  const [dragEnd, setDragEnd] = useState<Drag|null>(null)
  const [, setDragDistance] = useState<Drag|number|null>(0)

  const onMouseDown = (e: any) => {
    console.log('mouse down')
    e.preventDefault()
    setDragStart(e.clientX)
    setDragStart(e.clientY)
    const dragger = new Drag(e.clientX, e.clientY)
    setDrag(dragger)
  }

  const onMouseMove = (e: any) => {
    if (drag) {
      e.preventDefault()
      drag.move(e.clientX, e.clientY)
      setDrag(drag)
      setDragDistance(drag.getDistance(dragEnd as Drag))
    }
  }

  const onMouseUp = (e: any) => {
    console.log('mouse up')
    if (drag) {
      console.log('dragend', drag)
      e.preventDefault()
      setDragEnd(drag)
      setDrag(null)
    }
  }

  console.log(drag?.getY(), drag?.getX())


  return (
    <div className="drag-container"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      >
      <div className="App-header" >
        <h2 ref={elemRef} className="block" style={{ left: drag ? drag.getX() : 0, top: drag ? drag.getY() : 0 }}>{props.children}</h2>
      </div>
    </div>
  )
}