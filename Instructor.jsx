import React, { useEffect, useState } from "react";
import CustomButton from "../components/CustomButton";
import instructorService from "../services/instructorService";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import Input from "../components/Input";

const Instructor = (props) => {
  const [instructors, setinstructors] = useState([]);
  const [instructor, setinstructor] = useState({
    id: 0,
    code: "",
    email: "",
    firstName: "",
    gender: "",
    lastName: "",
    phone: "",
  });
  const [modalShow, setShowModal] = useState(false);

  const handleModalClose = () => setShowModal(false);
  const handleModalShow = () => setShowModal(true);

  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    //console.log(event.target[0].value);
    //console.log(instructor.name);
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    saveHandler();
  };
  const handleChange = (e) => {
    const newData = { ...instructor };
    newData[e.target.name] = e.target.value;
    console.log(newData);
    setinstructor(newData);
  };

  const showModalHandler = (e, id) => {
    if (e) e.preventDefault();

    if (id > 0) {
      let obj = instructors.find((o) => o.id === id);
      setinstructor(obj);
      handleModalShow();
      /*instructorService.get(id).then((res) => {
        se1tinstructor(res.data);
        console.log(res.data);
        handleModalShow();
      });*/
    } else {
      setinstructor({ id: 0 });
      handleModalShow();
    }
  };
  const saveHandler = () => {
    if (instructor.id > 0) {
      instructorService.update(instructor.id, instructor).then((res) => {
        if (res.errorCode === 0) {
          loadData();
          handleModalClose();
        }
      });
    } else
      instructorService.add(instructor).then((res) => {
        loadData();
        handleModalClose();
      });
  };
  const loadData = () => {
    instructorService.list().then((res) => {
      setinstructors(res.data);
    });
  };
  const hadnleDelete = (e, id) => {
    e.preventDefault();
    instructorService.delete(id).then((res) => {
      if (res.errorCode === 0) {
        loadData();
      }
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <div className="container mt-4">
        <div className="card border-primary bt-5">
          <div className="card-header">
            <div className="row">
              <div className="col">
                <h3 className="card-title">
                  instructor <small className="text-muted">list</small>
                </h3>
              </div>
              <div className="col-auto">
                <CustomButton
                  type="button"
                  className="btn btn-primary"
                  onClick={(e) => showModalHandler(e, 0)}
                >
                  <i className="bi-plus-lg" /> Add
                </CustomButton>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-bordered border-primary table-hover table-striped">
                <thead>
                  <tr className="table-primary border-primary">
                    <th style={{ width: 50 }}>#</th>
                    <th>Instructor Id</th>
                    <th>Full name</th>
                    <th>Gender</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th style={{ width: 80 }} />
                  </tr>
                </thead>
                <tbody>
                  {instructors.map((row, idx) => (
                    <tr key={row.id}>
                      <td>{idx + 1}</td>
                      <td>{row.code}</td>
                      <td>
                        "{row.firstName} {row.lastName}"
                      </td>
                      <td>{row.gender}</td>
                      <td>{row.phone}</td>
                      <td>{row.email}</td>
                      <td>
                        <a
                          href="/#"
                          onClick={(e) => showModalHandler(e, row.id)}
                        >
                          <i className="bi-pencil-square text-primary" />
                        </a>
                        <a href="/#" onClick={(e) => hadnleDelete(e, row.id)}>
                          <i className="bi-trash text-danger" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <Modal
        show={modalShow}
        backdrop="static"
        size="lg"
        centered
        onHide={handleModalClose}
      >
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Instructor</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalInstructorid"
            >
              <Form.Label column sm={2} className="required">
                Instructor id
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="text"
                  placeholder="Student Id"
                  name="code"
                  defaultValue={instructor.code}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalInstructorid"
            >
              <Form.Label column sm={2} className="required">
                Full name
              </Form.Label>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  placeholder="Last Name"
                  name="lastName"
                  defaultValue={instructor.lastName}
                  onChange={handleChange}
                />
              </Col>
              <Col sm={5}>
                <Form.Control
                  type="text"
                  placeholder="First Name"
                  name="firstName"
                  defaultValue={instructor.firstName}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalInstructorid"
            >
              <Form.Label column sm={2} className="required">
                Gender
              </Form.Label>
              <Col sm={2}>
                <Form.Check
                  className="my-3"
                  type="radio"
                  label="Male"
                  id="formHorizontalRadios1"
                  name="gender"
                  value={1}
                  checked={instructor.gender == 1}
                  onChange={handleChange}
                />
              </Col>
              <Col sm={2}>
                <Form.Check
                  className="my-3"
                  type="radio"
                  label="Female"
                  id="formHorizontalRadios1"
                  name="gender"
                  value={0}
                  checked={instructor.gender == 0}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={2} className="required">
                Phone
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  placeholder="Phone"
                  name="phone"
                  defaultValue={instructor.phone}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
            <Form.Group
              as={Row}
              className="mb-3"
              controlId="formHorizontalEmail"
            >
              <Form.Label column sm={2}>
                Email
              </Form.Label>
              <Col sm={10}>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  name="email"
                  defaultValue={instructor.email}
                  onChange={handleChange}
                />
              </Col>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

export default Instructor;
