import React, { Component, useEffect, useState } from "react";
import BootStrapTable from "react-bootstrap-table-next";
import axios from "axios";
import paginationFactory from "react-bootstrap-table2-paginator";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./home.component.css";
const TableDisplay = () => {
  const [journals, setJournals] = useState([]);

  const [journalinfo, setJournalInfo] = useState([]);
  const [showJournal, setshowJournal] = useState([]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getJournalData = async () => {
    try {
      const data = await axios.get("http://localhost:5000/journal");

      setJournals(data.data);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getJournalData();
  }, []);

  const columns = [
    { dataField: "title", text: "Title" },
    { dataField: "date", text: "Date" }
  ];

  const rowEvents = {
    onClick: (e, row) => {
      console.log(row);
      setJournalInfo(row);
      toggleTrueFalse();
    }
  };

  const toggleTrueFalse = () => {
    setshowJournal(handleShow);
  };

  const JournalContent = () => {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title id="formdisplay">{journalinfo.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <p id="formdisplay">{journalinfo.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button>
            <Link to={"/update/" + journalinfo._id} className="editLink">
              Edit
            </Link>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  journals.map(curr => {
    curr.date = curr.date.substring(0, 10);
  });

  return (
    <div className="JournalEntries">
      <h3>Journal Entries</h3>
      <BootStrapTable
        keyField="_id"
        data={journals}
        columns={columns}
        pagination={paginationFactory()}
        rowEvents={rowEvents}
        id="tabledisplay"
      />

      {show ? <JournalContent /> : null}
    </div>
  );
};

export default class Home extends Component {
  render() {
    return <TableDisplay />;
  }
}
