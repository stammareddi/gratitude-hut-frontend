import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { Container } from "react-bootstrap";
import Navbar from "./components/navbar.component";

import Home from "./components/home.component";
import Create from "./components/create.component";
import Update from "./components/update-journal.component";
function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Route path="/" exact component={Home} />
        <Route path="/create" exact component={Create} />
        <Route path="/update/:id" exact component={Update} />
      </Container>
    </Router>
  );
}

export default App;
