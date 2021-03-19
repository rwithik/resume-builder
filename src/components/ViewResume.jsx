import React, { useEffect, useState } from "react";
import { Container, Card, Badge, Button } from "react-bootstrap";

export default function ViewResume() {
  const [state, setState] = useState({});
  useEffect(() => {
    const basic = JSON.parse(localStorage.getItem("resumeBuilder.basic"));
    const education = JSON.parse(localStorage.getItem("resumeBuilder.education"));
    const experience = JSON.parse(localStorage.getItem("resumeBuilder.experience"));
    const skills = JSON.parse(localStorage.getItem("resumeBuilder.skills"));
    setState({ basic, education, experience, skills });
  }, []);
  if (!state.basic) return null;
  const { basic, education, experience, skills } = state;
  const { name, phone, email, addrLine1, addrLine2 } = basic;
  return (
    <Container className="content" fluid="md">
      <h2 className="title">{state?.basic?.name}</h2>
      <Card className="card">
        <Card.Title>Basic Details</Card.Title>
        <Card.Body>
          <b>Name</b>: {name}
          <br />
          <b>Email</b>: {email}
          <br />
          {phone && (
            <>
              <b>Phone</b>: {phone}
              <br />
            </>
          )}
          {addrLine1 && (
            <>
              <b>Address</b>: {addrLine1}, {addrLine2 && addrLine2}
            </>
          )}
        </Card.Body>
      </Card>
      <Card className="card">
        <Card.Title>Education</Card.Title>
        <Card.Body>
          {
            // Sort in reverse chronological order
            education
              .sort((a, b) => parseInt(a.year) < parseInt(b.year))
              .map(({ institution, year, degree }, index) => {
                return (
                  <div key={index} className="education-item">
                    Institution: {institution}
                    <br />
                    Degree: {degree}
                    <br />
                    Year: {year}
                  </div>
                );
              })
          }
        </Card.Body>
      </Card>
      <Card className="card">
        <Card.Title>Experience</Card.Title>
        <Card.Body>
          {
            // Sort in reverse chronological order
            experience
              .sort((a, b) => parseInt(a.year) < parseInt(b.year))
              .map(({ institution, year, degree }, index) => {
                return (
                  <div key={index} className="education-item">
                    Institution: {institution}
                    <br />
                    Degree: {degree}
                    <br />
                    Year: {year}
                  </div>
                );
              })
          }
        </Card.Body>
      </Card>
      <Card className="card">
        <Card.Title>Skills</Card.Title>
        <Card.Body>
          {skills.map((s) => {
            return (
              <Badge className="tag" variant="primary" key={s}>
                {s}
              </Badge>
            );
          })}
        </Card.Body>
      </Card>
      <span>
        <Button href="/edit">Edit Resume</Button>
      </span>
    </Container>
  );
}
