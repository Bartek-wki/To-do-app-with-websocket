import { Form } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import { Row, Col } from "react-bootstrap"
import styles from './AddTaskForm.module.scss'
import { addTask } from "../../redux/taskRedux"
import { useDispatch } from 'react-redux';
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const AddTaskForm = ({socket}) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    const id = uuidv4();
    dispatch(addTask({id: id, name: task}));
    setTask('')
    socket.emit('addTask', {id: id, name: task});
  }

  return (
    <Row className="justify-content-center">
      <Col xs={4}>
        <Form onSubmit={handleSubmit} className="d-flex justify-content-center">
          <Form.Group className={styles.form}>
            <Form.Control type="text" placeholder="Add new task" value={task} onChange={e => setTask(e.target.value)}></Form.Control>
          </Form.Group>
          <Button variant="secondary" type="submit">Add</Button> 
        </Form>
      </Col>
    </Row>
  )
}

export default AddTaskForm;