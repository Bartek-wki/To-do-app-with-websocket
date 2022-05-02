import styles from './Board.module.scss'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import { removeTask, updateTasks, getAllTaks } from '../../redux/taskRedux';
import { useEffect, useState } from "react"
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import EditTaskForm from '../EditTaskForm/EditTaskForm';

const Board = ({socket}) => {
  const tasks = useSelector(state => getAllTaks(state));
  const dispatch = useDispatch();
  const [edit, setEdit] = useState('');

  useEffect(() => {
    socket.on('update', (tasks) => {
      dispatch(updateTasks(tasks));
    });
    return () => socket.emit('end');
  }, [])

  const remove = id => {
    dispatch(removeTask(id));
    socket.emit('removeTask', id);
  }

  return (
    <Row className='justify-content-center'>
      <Col xs={5}>
        <ul className='my-5'>
          {tasks.map(task => (
            <li key={task.id} className='d-flex justify-content-between my-3 py-2'>
              <Row className={styles.taskWrapper}>
                <Col xs={8}>
                  {edit !== task.id && <p>{task.name}</p>}
                  {edit === task.id && <EditTaskForm setEdit={setEdit} taskId={task.id} taskName={task.name} socket={socket}/>}
                </Col>
                <Col xs={4} className='d-flex justify-content-end'>
                  {edit !== task.id && <Button size="sm" variant='success' onClick={e => setEdit(task.id)}>Edit</Button>}
                  <Button className='mx-1' variant="danger" size="sm" onClick={e => remove(task.id)}>Remove</Button>
                </Col>
              </Row>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  )
};

export default Board;