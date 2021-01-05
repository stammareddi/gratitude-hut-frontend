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
      // const data = await axios.get("http://localhost:5000/journal");

      /* const entry = {
        title: titleLocal,
        description: descriptionLocal,
        date: dateLocal
      };*/
      //   setJournals(data.data);

      /* var c = JSON.parse(localStorage.getItem("item"));

      const titleVal = c[0];
      const desVal = c[1];
      const valueOFDate = c[2];

      const entry = {
        title: titleVal,
        description: desVal,
        date: valueOFDate
      };
      arraytodisplay = [titleVal, desVal, valueOFDate];
      arraytodisplay.push(entry);
      journals.push(entry);
      console.log(journals);*/
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
    { dataField: "date", text: "Date", sort: true }
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

  const defaultSorted = [
    {
      dataField: "date",
      order: "desc"
    }
  ];

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
        defaultSorted={defaultSorted}
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
