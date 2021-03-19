import React from "react";
import { Container, Alert, Button } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import BasicDetails from "./components/BasicDetails";
import EducationExperience from "./components/EducationExperience";
import Skills from "./components/Skills";
import ViewResume from "./components/ViewResume";
import "./assets/styles/styles.css";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Container className="content" fluid="md">
            <h2 className="title">Resume Builder</h2>
            <BasicDetails />
            <EducationExperience mode="edu" />
            <EducationExperience mode="exp" />
            <Skills />
            <Alert variant="info">
              Make sure you save everything before clicking 'Build Resume'!
            </Alert>
            <span>
              <Button href="/view">Build Resume</Button>
            </span>
          </Container>
        </Route>
        <Route path="/edit">
          <Container className="content" fluid="md">
            <h2 className="title">Resume Builder</h2>
            <BasicDetails edit />
            <EducationExperience edit mode="edu" />
            <EducationExperience edit mode="exp" />
            <Skills edit />
            <Alert variant="info">
              Make sure you save everything before clicking 'Build Resume'!
            </Alert>
            <span>
              <Button href="/view">Build Resume</Button>
            </span>
          </Container>
        </Route>
        <Route exact path="/view">
          <ViewResume />
        </Route>
        <Route>
          <span>404</span>
        </Route>
      </Switch>
    </Router>
  );
}
