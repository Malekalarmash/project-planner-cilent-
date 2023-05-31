import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import TaskCard from '../components/TaskCard';
import Button from 'react-bootstrap/Button';
import { setTask } from '../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { taskSearch } from '../redux/reducers';
import AddTask from '../components/AddTask';
import { useState } from 'react';
import { updateTask } from '../redux/actions';
import UpdateTask from '../components/UpdateTask';
import { BsFillCheckSquareFill } from "react-icons/bs";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Tasks() {
  const taskFilter = useSelector((state) => {
    return state.taskSearch.tasks.filter((task) => (!task.isDone && !task.inPro));
  });
  const taskIsDone = useSelector((state) => {
    return state.taskSearch.tasks.filter((task) => task.isDone);
  });
  console.log('Task Filter', taskIsDone)
  const updatedTask = useSelector((state) => {
    return state.taskSearch.updatedTask;
  });
  const [Data, setData] = useState(false);
  const [isDone, setIsDone] = useState(false)
  const [isDeleted, setIsDeleted] = useState(false)


  const dispatch = useDispatch();
  const handleClick = async (task) => {
    dispatch(updateTask(task));
  };

  const getTasks = async () => {
    try {
      const response = await fetch('http://localhost:3500/tasks');
      const data = await response.json();
      dispatch(setTask(data));
      setData(true);
    } catch (e) {
      console.log(e);
    }
  };

const handleDelete = async (task)=>{

  try {
    const response = await fetch(`http://localhost:3500/tasks/${task.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      setIsDeleted(true)
      toast.success('Task was Deleted successfully');
    } 
  } catch (error) {
    console.log(error);
  }
  

}
  const handleIsDone = async (task) => {
    const updatedTask = { ...task, isDone: true };
  
    try {
      const response = await fetch(`http://localhost:3500/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTask),
      });
  
      if (response.ok) {
        dispatch(updateTask(updatedTask));
        setIsDone(true)        
        toast.success('Task was Marked Done  successfully');
      } 
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, [Data, isDone, isDeleted]);


  return (
    <>
     <Container>
      <Row className="">
        <Col lg={6}>
          <Card style={{ height: '100%' }}>
            <Card.Body>
              <Card.Title>Backlog</Card.Title>
              <AddTask setData={setData} />
              {taskFilter.map((task) => (
                <Card task={task} className="mt-2" key={task.id}>
                  <Card.Body>
                    <Card.Title>{task.taskName}</Card.Title>
                    <Card.Text>
                      <label>
                        <b>Description: </b>
                        {task.description}
                      </label>
                    </Card.Text>
                    <Card.Text>
                      <b>Project:</b>
                      {task.project}
                    </Card.Text>
                    <Card.Text>
                      <b>Client:</b>
                      {task.client}
                    </Card.Text>
                    <Button
                    key={task.id}
                      variant="primary mt-2"
                      onClick={() => {
                        handleIsDone(task);
                      }}> Mark Done
                      <BsFillCheckSquareFill />
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card style={{ height: '100%' }}>
            <Card.Body>
              <Card.Title>Done</Card.Title>
              {taskIsDone.map((task) => (
                <Card task={task} className="mt-2" key={task.id}>
                  <Card.Body>
                    <Card.Title>{task.taskName}</Card.Title>
                    <Card.Text>
                      <label>
                        <b>Description: </b>
                        {task.description}
                      </label>
                    </Card.Text>
                    <Card.Text>
                      <b>Project:</b>
                      {task.project}
                    </Card.Text>
                    <Card.Text>
                      <b>Client:</b>
                      {task.client}
                    </Card.Text>
                    <Button
                      variant="danger mt-2"
                      onClick={() => {
                        handleDelete(task);
                      }}
                    > Delete
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
      <ToastContainer />
    
    </>
   

  );
}
