import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Placeholder from 'react-bootstrap/Placeholder';
import Card from 'react-bootstrap/Card';
import TaskCard from '../components/TaskCard';
import Button from 'react-bootstrap/Button';


export default function Tasks() {
    return (
        <Container  >
            <Row className='' >
                <Col lg={4}>
                    <Card style={{ height: '100%' }}>
                        <Card.Body>
                            <Card.Title>Backlog</Card.Title>
                            <Button variant="primary mt-2">Create Task</Button>

                            <TaskCard />
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
