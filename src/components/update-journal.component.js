import React, { Component, useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import "./create.component.css";
import { Link } from "react-router-dom";

import "./update-journal.component.css";

export default class UpdateExercise extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.deleteExercise = this.deleteExercise.bind(this);
    this.state = {
      id: "",
      title: "",
      description: "",
      date: new Date()
    };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/journal/" + this.props.match.params.id)
      .then(res => {
        this.setState({
          id: res.data.id,
          title: res.data.title,
          description: res.data.description,
          date: res.data.date
        });
      })
      .catch(res => "Error");
  }

  onChangeTitle(e) {
    this.setState({ title: e.target.value });
  }

  onChangeDescription(e) {
    this.setState({ description: e.target.value });
  }

  onChangeDate(e) {
    this.setState({ date: e.target.value });
  }

  deleteExercise(e) {
    e.preventDefault();

    axios
      .delete("http://localhost:5000/journal/" + this.props.match.params.id)
      .then(res => {
        console.log("Succes");
      });

    window.location = "/";
  }

  onSubmit(e) {
    e.preventDefault();

    const entry = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date
    };

    console.log(this.props.match.params.id);

    axios
      .post(
        "http://localhost:5000/journal/update/" + this.props.match.params.id,
        entry
      )
      .then(res => console.log("Post success"))
      .catch(res => "Error");

    if (
      this.state.title !== "" &&
      this.state.description !== "" &&
      this.state.date !== null
    ) {
      document.getElementById("form").reset();

      this.setState({
        title: "",
        description: "",
        date: new Date()
      });
    }
    window.location = "/";
  }

  render() {
    return (
      <Form validated id="form" className="form">
        <Form.Group id="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={this.state.title}
            onChange={this.onChangeTitle}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide title
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group id="formDescription">
          <Form.Label>Description </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={this.state.description}
            onChange={this.onChangeDescription}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a description
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.onSubmit}>
          Submit
        </Button>

        <Button variant="danger">
          <Link to="/" onClick={this.deleteExercise} className="deleteButton">
            Delete
          </Link>
        </Button>
      </Form>
    );
  }
}
