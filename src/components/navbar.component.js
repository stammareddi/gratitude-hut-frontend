import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Navbar, Nav, Brand } from "react-bootstrap";

import "./navbar.component.css";
export default class NavbarComponent extends Component {
  render() {
    return (
      <Navbar bg="dark" expand="lg" collapseOnSelect>
        <Navbar.Brand>
          <i className="fas fa-house-user"></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/" href="/" id="nav-link">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/create" href="/" id="nav-link">
              Create Journal Entry
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
