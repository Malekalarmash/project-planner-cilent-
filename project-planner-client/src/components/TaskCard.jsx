import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function TaskCard({ task }, props) {
    return (
        <Card className='mt-2' >
            <Card.Body>
                <Card.Title></Card.Title>
                <Card.Text>
                    Card Description
                </Card.Text>
                <Button variant="primary mt-2">Update Task</Button>
            </Card.Body>
        </Card>
    );
}

