import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar';

import { Form, Button, Container, Row, Col } from 'react-bootstrap';

function JobPage(){

    return (
        <>
        <Navbar/>
        <Container >
            <Row>
                <Col className='m-auto' md={6}>
                    <h1>Job Page</h1>
                </Col>
            </Row>
        </Container>
        </>
    );
}

export default JobPage;