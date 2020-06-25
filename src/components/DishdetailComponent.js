import React, { Component } from "react";
import { Loading } from "./LoadingComponent";
import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Label,
  Row,
  Col,
} from "reactstrap";
import { Control, Errors, LocalForm } from "react-redux-form";
import { baseUrl } from "../shared/baseUrl";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handelSubmit = this.handelSubmit.bind(this);
  }
  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }
  handelSubmit(value) {
    this.toggleModal();
    this.props.addcomment(
      this.props.dishId,
      value.rating,
      value.author,
      value.comment
    );
  }
  render() {
    return (
      <React.Fragment>
        <Button outline onClick={this.toggleModal} className="mx-2">
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </Button>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={this.handelSubmit}>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="rating">Rating</Label>
                  <Control.select
                    model=".rating"
                    name="rating"
                    className="form-control"
                  >
                    <option>5</option>
                    <option>4</option>
                    <option>3</option>
                    <option>2</option>
                    <option>1</option>
                  </Control.select>
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="author">Your Name</Label>
                  <Control.text
                    model=".author"
                    name="author"
                    className="form-control"
                    validators={{
                      required,
                      maxLength: maxLength(15),
                      minLength: minLength(3),
                    }}
                  />
                  <Errors
                    className="text-danger"
                    show="touched"
                    model=".author"
                    messages={{
                      required: "Required ",
                      minLength: "Must be greater than 2 characters",
                      maxLength: "Must be 15 characters or less",
                    }}
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Label htmlFor="comment">Comment</Label>
                  <Control.textarea
                    model=".comment"
                    name="comment"
                    rows="6"
                    className="form-control"
                  />
                </Col>
              </Row>
              <Row className="form-group">
                <Col>
                  <Button type="submit" color="primary">
                    Submit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </React.Fragment>
    );
  }
}

function RenderDish({ dish }) {
  return (
    <Card>
      <CardImg width="100%" src={baseUrl + dish.image} />
      <CardBody>
        <CardTitle>{dish.name}</CardTitle>
        <CardText>{dish.description}</CardText>
      </CardBody>
    </Card>
  );
}

function RenderComments({ comments, dishId, addcomment }) {
  console.log(comments);
  if (comments) {
    return (
      <div>
        <h4>Comments</h4>
        <ul className="list-group">
          {comments.map((x) => {
            return (
              <li key={x.id} className="list-group mt-3">
                <p>{x.comment}</p>
                <p>
                  {"-- " +
                    x.author +
                    " , " +
                    new Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "2-digit",
                    }).format(new Date(Date.parse(x.date)))}
                </p>
              </li>
            );
          })}
        </ul>
        <CommentForm dishId={dishId} addcomment={addcomment} />
      </div>
    );
  } else {
    return <div></div>;
  }
}
const DishDetail = (props) => {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <div className="col-12 col-md-5 m-1">
            <RenderDish dish={props.dish} />
          </div>
          <div className="col-12 col-md-5 m-1">
            <RenderComments
              comments={props.comments}
              dishId={props.dish.id}
              addcomment={props.addcomment}
            />
          </div>
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default DishDetail;
