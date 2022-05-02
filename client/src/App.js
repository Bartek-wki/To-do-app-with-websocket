import { Container } from 'react-bootstrap'
import Header from './components/Header/Header';
import Board from './components/Board/Board';
import AddTaskForm from './components/AddTaskForm/AddTaskForm';
import io from "socket.io-client";

const App = () => {  
  const socket = io("http://localhost:8000")
  return (
    <>
      <Header />
      <Container>
        <Board socket={socket}/>
        <AddTaskForm socket={socket}/>
      </Container>    
    </>
  )
}

export default App;
