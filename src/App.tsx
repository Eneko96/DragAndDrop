import './App.css'
import { DragWrapper } from './components/DragWrapper/DragWrapper'
import { Draggable } from './components/Draggable/Draggable'

function App() {

  return (
    <DragWrapper>
      <Draggable id='1'>First Element</Draggable>
      <Draggable id='2'>Second Element</Draggable>
      <Draggable id='3'>Third Element</Draggable>
    </DragWrapper>
  )
}

export default App
