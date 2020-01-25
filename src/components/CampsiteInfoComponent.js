import React, { Component } from 'react';
import {
    Card, CardImg, CardText, CardBody, CardTitle, Button, Modal, ModalHeader, ModalBody, Breadcrumb, BreadcrumbItem,
    Form, FormGroup, Input, Label
} from 'reactstrap';
import { LocalForm, Control, Errors } from 'react-redux-form';

const maxLength = len => val => !val || (val.length <= len);
const minLength = len => val => val && (val.length >= len);

class CommentForm extends Component {

    constructor(props) {
        super(props);


        this.state = {

            isModalOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    // Modal task 2

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        console.log("current state is:" + JSON.stringify(values));
        alert("current state is:" + JSON.stringify(values));
    }
    render() {

        return (
            <React.Fragment>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" />  Submit Comment
             </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal} >
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">
                                    Rating
                                 </Label>

                                <Control.select model=".rating" id="rating" name="rating"
                                    className="form-control">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                    <option>6</option>

                                </Control.select>
                            </div>


                            <div className="form-group">
                                <Label htmlFor="author">
                                    Author
                             </Label>
                                <Control.text
                                    model=".author"
                                    id="author"
                                    name="author"
                                    placeholder="Author"
                                    className="form-control"
                                    validators={{
                                        minLength: minLength(2),
                                        maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    component="div"
                                    messages={{
                                        minLength: "Must be at least 2 characters",
                                        maxlength: "Must be 15 characters or less"
                                    }}
                                />
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">
                                    Text
                        </Label>
                                <Control.text
                                    model=".text"
                                    id="text"
                                    name="text"
                                    placeholder="Text"
                                    className="form-control"
                                />
                            </div>
                         
                                    <Button type="submit" color="primary" onSubmit={values => this.handleSubmit(values)}>
                                        Submit
                                    </Button>
                        </LocalForm>

                  </ModalBody>
                </Modal>

            </React.Fragment>

        );

    }

}

function RenderCampsite({ campsite }) {
    return (
        <div className="col-md-5 m-1">

            <Card>
                <CardImg top src={campsite.image} alt={campsite.name} />
                <CardBody>
                    <CardTitle>{campsite.name}</CardTitle>
                    <CardText>{campsite.description}</CardText>
                </CardBody>
            </Card>


        </div>
    );

}

function RenderComments({ comments }) {
    if (comments) {
        return (
            <div className="col-md-5 m-1">
                <h4>Comments</h4>
                {comments.map(comment => {
                    return (
                        <div key={comment.id}>
                            <p>{comment.text} <br />- {comment.author}
                                {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}
                            </p>
                        </div>
                    );

                })}
                <CommentForm />

            </div>
        );
    }
    return <div> </div>;
}

function CampsiteInfo(props) {

    if (props.campsite) {
        return (
            <div className="container">

                <div className="row">
                    <RenderCampsite campsite={props.campsite} />
                    <RenderComments comments={props.comments} />
                </div>
            </div>

        );

    }
    return <div />;
}


export default CampsiteInfo;