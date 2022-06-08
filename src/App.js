import React from "react";
import './App.css';
import NavigationBar from "./components/NavigationBar";
import {Container, Row, Col} from "react-bootstrap";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import Task from "./components/Task/Task";
import TaskList from "./components/Task/TaskList";
import UserList from "./components/User/UserList";
import Login from "./components/User/Login";
import Register from "./components/User/Register";
import Home from "./components/Home";
import UserrList from "./components/User/UserrList";

import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
const App = () => {

  window.onbeforeunload = (event) => {
    const e = event || window.event;
    e.preventDefault();
    if (e) {
      e.returnValue = '';
    }
    return '';
  }

  return (
    <Router>
      <NavigationBar/>
        <Container>
            <Row>
              <Col lg={12} className="marginTop">
                <Switch>
                  <Route path="/" exact component={Welcome}/>
                  <Route path="/home" exact component={Home}/>
                  <Route path="/add" exact component={Task}/>
                  <Route path="/edit/:id" exact component={Task}/>
                  <Route path="/list" exact component={TaskList}/>
                  <Route path="/users" exact component={UserrList}/>
                  <Route path="/register" exact component={Register}/>
                  <Route path="/login" exact component={Login}/>
                  <Route path="/logout" exact component={() => <Login message = "Wylogowano pomyślnie."/>}/>
                </Switch>
              </Col>
            </Row>
        </Container>
        <Footer/>
    </Router>
  );
}

export default App;