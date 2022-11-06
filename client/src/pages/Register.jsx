import React from "react";
import {FaUserAlt} from 'react-icons/fa';
import {Container, Row, Col, Form, Button} from 'react-bootstrap';

const register = () => {
  return (
    <section className="signup ">
      <Container>
        <div className="signup-content d-flex justify-content">
          <div className="signup-form">
            <h2 className="form-title">Register Here!</h2>
            <Form method="POST" className="register-form" id="register-form">
              <div className="form-group">
                <label htmlFor="username">
                  <FaUserAlt/>
                </label>
                <input type="text" name="username" id="username" placeholder="User Name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">
                  <FaUserAlt/>
                </label>
                <input type="email" name="email" id="email" placeholder="Email" />
              </div>
              <div className="form-group">
                <label htmlFor="contact">
                  <FaUserAlt/>
                </label>
                <input type="text" name="contact" id="contact" placeholder="Contact" />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <FaUserAlt/>
                </label>
                <input type="password" name="password" id="password" placeholder="Password" />
              </div>
              <div className="form-group">
                <label htmlFor="password">
                  <FaUserAlt/>
                </label>
                <input type="password" name="password" id="password" placeholder="Confirm Password" />
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default register;
