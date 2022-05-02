import { Form } from "react-bootstrap"
import Button from 'react-bootstrap/Button'
import styles from './EditTaskForm.module.scss'
import { Row, Col } from "react-bootstrap"
import { useState } from "react"
import { editTask } from "../../redux/taskRedux"
import { useDispatch } from 'react-redux';

const EditTaskForm = ({ taskName, taskId, setEdit, socket }) => {
  const dispatch = useDispatch();
  const [task, setTask] = useState(taskName);

  const handleSubmit = e => {
    e.preventDefault();
    setEdit('');
    dispatch(editTask({ id: taskId, name: task }))
    socket.emit('editTask', { id: taskId, name: task })
  }

  return (
    <Row>
      <Col>
        <Form onSubmit={handleSubmit} className="d-flex justify-content-center">
          <Form.Group className={styles.inputWrapper}>
            <Form.Control className={styles.input} type="text" value={task} onChange={e => setTask(e.target.value)}></Form.Control>
          </Form.Group>
          <Button variant="success" size="sm" type="submit">Save</Button> 
        </Form>
      </Col>
    </Row>
  )
}

export default EditTaskForm;