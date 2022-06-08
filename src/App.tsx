import './App.css'
import DragWrap from './DragWrap'
import { DragWrapper } from './components/DragWrapper/DragWrapper'
import { Draggable } from './components/Draggable/Draggable'

function App() {

  return (
    <DragWrapper>
      <Draggable id='1'>1</Draggable>
      <Draggable id='2'>2</Draggable>
      <Draggable id='3'>3</Draggable>
    </DragWrapper>
  )
}

export default App
