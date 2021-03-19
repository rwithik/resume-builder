import React, { useEffect, useState } from "react";
import { Form, Col, Row, Button, Toast } from "react-bootstrap";

const template = {
  institution: "",
  degree: "",
  year: "",
};

export default function EducationExperience(props) {
  const mode = props.mode === "edu";
  const [education, setEducation] = useState([{ ...template }]);
  const [errors, setErrors] = useState([{}]);
  const [showToast, setShowToast] = useState(false);
  useEffect(() => {
    if (props.edit) {
      const ed = JSON.parse(
        localStorage.getItem(`resumeBuilder.${mode ? "education" : "experience"}`)
      );
      setEducation(ed);
      setErrors(Object.keys(ed).map((e) => ({})));
    }
  }, []);

  const validate = () => {
    const errors = [];
    education.map(({ institution, year, degree }, index) => {
      errors.push({});
      if (institution.length === 0)
        errors[index].institution = `Please enter an ${mode ? "institution" : "company"} name.`;
      if (year.length !== 4 || !/\d\d\d\d/.test(year)) errors[index].year = "Please enter a year";
      if (degree.length === 0)
        errors[index].degree = `Please enter a ${mode ? "degree" : "designation"}.`;
    });
    return errors;
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setErrors((prev) => {
      const newErrors = [...prev];
      newErrors[index] = { ...newErrors[index], [name]: false };
      return newErrors;
    });
    setEducation((prev) => {
      const newState = [...prev];
      newState[index] = { ...newState[index], [name]: value };

      return newState;
    });
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
        <Toast.Body>{mode ? "Education" : "Experience"} details saved successfully!</Toast.Body>
      </Toast>
      <div>
        <h3 className="subtitle">{mode ? `Education` : "Experience"}</h3>
        {education.map((edu, index) => {
          return (
            <Form key={index} onSubmit={(e) => e.preventDefault()}>
              <Form.Group>
                <Form.Label>{mode ? "Institution" : "Company"}</Form.Label>
                <Form.Control
                  required
                  name="institution"
                  onChange={(e) => handleChange(e, index)}
                  type="text"
                  placeholder={`${mode ? "Institution" : "Company"} Name`}
                  isInvalid={!!errors[index].institution}
                  defaultValue={education[index].institution}
                />
                <Form.Control.Feedback type="invalid">
                  {errors[index].institution}
                </Form.Control.Feedback>
              </Form.Group>
              <Row>
                <Col lg>
                  <Form.Group>
                    <Form.Label>{mode ? "Degree" : "Designation"}</Form.Label>
                    <Form.Control
                      required
                      name="degree"
                      onChange={(e) => handleChange(e, index)}
                      type="text"
                      placeholder={mode ? "Degree" : "Designation"}
                      isInvalid={!!errors[index].degree}
                      defaultValue={education[index].degree}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[index].degree}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col lg>
                  <Form.Group>
                    <Form.Label>Year</Form.Label>
                    <Form.Control
                      required
                      name="year"
                      onChange={(e) => handleChange(e, index)}
                      type="text"
                      placeholder="Year"
                      isInvalid={!!errors[index].year}
                      defaultValue={education[index].year}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors[index].year}
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>
              <Button
                onClick={() => {
                  setEducation((prev) => {
                    const temp = [...prev];
                    temp.splice(index, 1);
                    return temp;
                  });
                }}
                variant="danger"
              >
                Delete Entry
              </Button>
            </Form>
          );
        })}
        <Button
          onClick={() => {
            setEducation((prev) => [...prev, { ...template }]);
            setErrors((prev) => [...prev, {}]);
          }}
        >
          Add Entry
        </Button>
        <Button
          onClick={(e) => {
            const newErrors = validate();
            let flag = true;
            newErrors.forEach((err) => {
              if (Object.keys(err).length > 0) flag = false;
            });
            if (!flag) setErrors(newErrors);
            else {
              localStorage.setItem(
                `resumeBuilder.${mode ? "education" : "experience"}`,
                JSON.stringify(education)
              );
              setShowToast(true);
            }
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
}
