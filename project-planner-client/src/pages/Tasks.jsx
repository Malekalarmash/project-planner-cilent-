import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';
import TaskCard from '../components/TaskCard';
import Button from 'react-bootstrap/Button';
import { setTask } from '../redux/actions';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { taskSearch } from '../redux/reducers';
import AddTask from '../components/AddTask';

export default function Tasks() {
    const [Data, setData] = useState(false)
    const taksFilter = useSelector((state) => {
        return state.taskSearch.tasks
    })
    const [showComponent, setShowComponent] = useState(false);

    const handleClick = () => {
        setShowComponent(true);
    };
    const dispatch = useDispatch()
    const getTasks = async () => {
        try {
            await fetch('http://localhost:3500/tasks')
                .then(response => response.json())
                // Stores the object into the variable called data
                .then(data => {
                    let tasks = {
                        data
                    }
                    dispatch(setTask(data))
                    setData(true)
                    return tasks
                })

        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        // Code here will run after *every* render
        getTasks()
    }, [Data]);
    return (
        <Container  >
            <Row className='' >
                <Col lg={4}>
                    <Card style={{ height: '100%' }}>
                        <Card.Body>
                            <Card.Title>Backlog</Card.Title>
                            <Button variant="primary mt-2" onClick={handleClick}>
                                Create Task
                            </Button>
                            {showComponent && <AddTask />}
                            {taksFilter.map((task) => (
                                <Card task={task} className='mt-2' >
                                    <Card.Body>
                                        <Card.Title>{task.taskName}</Card.Title>
                                        <Card.Text>
                                            {task.description}
                                            {task.project}
                                            {task.client}
                                        </Card.Text>
                                        <Card.Text> Project:
                                            {task.project}
                                        </Card.Text>
                                        <Card.Text>
                                            Client:
                                            {task.client}
                                        </Card.Text>

                                        <Button variant="primary mt-2">Update Task</Button>
                                    </Card.Body>
                                </Card>

                            ))}
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card style={{ height: '100%' }}>
                        <Card.Body>
                            <Card.Title>In Progress</Card.Title>
                            <TaskCard />
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card style={{ height: '100%' }}>
                        <Card.Body>
                            <Card.Title>Done</Card.Title>
                            <TaskCard />
                            <TaskCard />
                            <TaskCard />
                            <TaskCard />
                            <TaskCard />
                            <TaskCard />
                            <TaskCard />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

        </Container>
    )
}
