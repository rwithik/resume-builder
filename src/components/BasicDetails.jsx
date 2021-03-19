import React, { useState, useEffect } from "react";
import { Form, Col, Button, Toast } from "react-bootstrap";

const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

export default function BasicDetails(props) {
  const [state, setState] = useState({
    name: "",
    phone: "",
    email: "",
    addrLine1: "",
    addrLine2: "",
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    if (props.edit) {
      const details = JSON.parse(localStorage.getItem("resumeBuilder.basic"));
      setState(details);
    }
  }, []);

  const validateForm = () => {
    const errors = {};
    const { name, email, phone } = state;
    if (!emailRegex.test(email.toLowerCase())) errors.email = "Please enter a valid email.";
    if (name.length === 0) errors.name = "Name is required.";
    if (phone.length > 0 && (phone.length !== 10 || !/[0-9]/.test(phone)))
      errors.phone = "Please enter a valid phone number.";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  return (
    <>
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={5000}
        style={{
          position: "fixed",
          top: 10,
          right: 10,
          zIndex: 9,
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">Success</strong>
        </Toast.Header>
        <Toast.Body>Basic details saved successfully!</Toast.Body>
      </Toast>
      <Form
        noValidate
        onSubmit={(e) => {
          e.preventDefault();
          const newErrors = validateForm();
          if (Object.keys(newErrors).length > 0) {
            console.log("pp");
            setErrors(newErrors);
          } else {
            localStorage.setItem("resumeBuilder.basic", JSON.stringify(state));
            setShowToast(true);
          }
        }}
      >
        <h3 className="subtitle">Basic Details</h3>
        <Form.Row>
          <Col lg>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                required
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="John Doe"
                isInvalid={!!errors.name}
                defaultValue={state.name}
              />

              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="john@example.com"
                isInvalid={!!errors.email}
                defaultValue={state.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone No.:</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="phone"
                type="tel"
                placeholder="1234567890"
                isInvalid={!!errors.phone}
                defaultValue={state.phone}
              />
              <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col lg>
            <Form.Group>
              <Form.Label>Address Line 1:</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="addrLine1"
                type="text"
                placeholder="Address Line 1"
                isInvalid={!!errors.addrLine1}
                defaultValue={state.addrLine1}
              />
              <Form.Control.Feedback type="invalid">{errors.addrLine1}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label>Address Line 2:</Form.Label>
              <Form.Control
                onChange={handleChange}
                name="addrLine2"
                type="text"
                placeholder="Address Line 2"
                isInvalid={!!errors.addrLine2}
                defaultValue={state.addrLine2}
              />
              <Form.Control.Feedback type="invalid">{errors.addrLine2}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Form.Row>
        <Button type="submit" value="Submit">
          Save
        </Button>
      </Form>
    </>
  );
}
