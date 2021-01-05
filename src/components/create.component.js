import React, { Component, useState } from "react";
import axios from "axios";
import { Form, Button, Col, InputGroup } from "react-bootstrap";
import "./create.component.css";

export default class Create extends Component {
  constructor(props) {
    super(props);

    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);

    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      title: "",
      description: "",
      date: new Date()
    };
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
  onSubmit(e) {
    e.preventDefault();

    const indexValue = 0;
    const entry = {
      title: this.state.title,
      description: this.state.description,
      date: this.state.date
    };

    console.log(entry);

    /* let itemsArray = [];
    itemsArray.push(this.state.title);
    itemsArray.push(this.state.description);
    itemsArray.push(this.state.date);
    localStorage.setItem("item", JSON.stringify(itemsArray));
*/
    axios
      .post("http://localhost:5000/journal/add", entry)
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
  }

  render() {
    return (
      <Form validated id="form" className="form">
        <Form.Group id="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Everything has a title"
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
            placeholder="Express yourself"
            onChange={this.onChangeDescription}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a description
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group id="formDate">
          <Form.Label>Date</Form.Label>
          <Form.Control type="date" onChange={this.onChangeDate} required />
        </Form.Group>

        <Button variant="primary" type="submit" onClick={this.onSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}
