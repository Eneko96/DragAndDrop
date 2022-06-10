import './App.css'
import { DragWrapper } from './components/DragWrapper/DragWrapper'
import { Draggable } from './components/Draggable/Draggable'

function App() {

  return (
    <DragWrapper boxSize={100}>
      <Draggable>Element</Draggable>
      <Draggable>Element</Draggable>
      <Draggable>Element</Draggable>
      <Draggable>Element</Draggable>
      <Draggable>Element</Draggable>
      <Draggable>Element</Draggable>
    </DragWrapper>
  )
}

export default App
