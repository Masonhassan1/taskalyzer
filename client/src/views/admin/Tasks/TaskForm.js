import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import {
    Button,
    Modal,
    Form,
    FormGroup,
    Label,
    Col,
    Input,
    FormFeedback,
    Spinner
} from 'reactstrap';

// REDUX
import { createTask } from 'store/actions/taskActions';
import { connect } from 'react-redux';

class TaskForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            color: 'bg-default',
            category: '',
            todos: [
                {
                    content: ''
                }
            ],
            errors: {
                title: false,
                description: false,
                todo: false
            }
        };
    }

    componentWillReceiveProps(newProps) {
        const { task, toggleModal } = this.props;
        if (newProps.task !== task && !newProps.isLoading) {
            this.clearState();
            toggleModal();
        }
    }

    clearState = () => {
        this.setState({
            title: '',
            description: '',
            color: 'bg-default',
            category: '',
            todos: [
                {
                    content: ''
                }
            ],
            errors: {
                title: false,
                description: false,
                todo: false
            }
        });
    };

    // Input change handler
    inputChangeHandler = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        });
    };

    // Add todo handler
    addTodo = (e) => {
        e.preventDefault();
        const { todos } = this.state;
        const lastTodo = todos[todos.length - 1];
        if (lastTodo.content !== '') {
            todos.push({
                content: ''
            });
            this.setState({
                todos
            });
        }
    };

    // Todo item change handler
    todoChangeHandler = (e) => {
        const { todos } = this.state;
        todos[e.target.id].content = e.target.value;
        this.setState({
            todos
        });
    };

    // Error checking
    checkErrors = () => {
        const { title, description, todos, errors } = this.state;
        const lastTodo = todos[todos.length - 1];
        let updatedErrors = errors;
        if (title === '') {
            updatedErrors = {
                ...updatedErrors,
                title: true
            };
        } else {
            updatedErrors = {
                ...updatedErrors,
                title: false
            };
        }
        if (description === '') {
            updatedErrors = {
                ...updatedErrors,
                description: true
            };
        } else {
            updatedErrors = {
                ...updatedErrors,
                description: false
            };
        }
        if (lastTodo.content === '') {
            updatedErrors = {
                ...updatedErrors,
                todo: true
            };
        } else {
            updatedErrors = {
                ...updatedErrors,
                todo: false
            };
        }
        return updatedErrors;
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { title, description, todos, category, color } = this.state;
        const { toggleModal } = this.props;
        const lastTodo = todos[todos.length - 1];
        const updatedErrors = this.checkErrors();
        this.setState(
            {
                errors: updatedErrors
            },
            () => {
                if (
                    title !== '' &&
                    description !== '' &&
                    lastTodo.content !== '' &&
                    !updatedErrors.title &&
                    !updatedErrors.description &&
                    !updatedErrors.todo
                ) {
                    const task = {
                        title,
                        description,
                        color,
                        category,
                        todos
                    };
                    // eslint-disable-next-line react/destructuring-assignment
                    this.props.createTask(task);
                    toggleModal();
                }
            }
        );
    };

    render() {
        const { showModal, toggleModal, isLoading } = this.props;
        const { title, description, category, color, todos, errors } = this.state;
        const titleError = errors.title;
        const descError = errors.description;
        const todoError = errors.todo;
        return (
            <>
                <Modal
                    className="modal-dialog-centered"
                    isOpen={showModal}
                    toggle={toggleModal}
                >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Create New task
                        </h5>
                        <button
                            aria-label="Close"
                            className="close"
                            data-dismiss="modal"
                            type="button"
                            onClick={toggleModal}
                        >
                            <span aria-hidden>×</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {isLoading ? (
                            <Spinner style={{ width: '3rem', height: '3rem' }} />
                        ) : (
                            <Form onSubmit={this.handleSubmit}>
                                <FormGroup row>
                                    <Label for="title" sm={3}>
                                        Title*
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            type="text"
                                            name="title"
                                            id="title"
                                            value={title}
                                            onChange={this.inputChangeHandler}
                                            placeholder="Enter task title"
                                            invalid={titleError}
                                        />
                                        {titleError ? (
                                            <FormFeedback>
                                                This field is required!
                                            </FormFeedback>
                                        ) : null}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="description" sm={3}>
                                        Description*
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            type="textarea"
                                            name="text"
                                            id="description"
                                            value={description}
                                            onChange={this.inputChangeHandler}
                                            placeholder="Description"
                                            invalid={descError}
                                        />
                                        {descError ? (
                                            <FormFeedback>
                                                This field is required!
                                            </FormFeedback>
                                        ) : null}
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="category" sm={3}>
                                        category
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            type="text"
                                            name="category"
                                            id="category"
                                            value={category}
                                            onChange={this.inputChangeHandler}
                                            placeholder="Category"
                                        />
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="color" sm={3}>
                                        Color
                                    </Label>
                                    <Col sm={9}>
                                        <Input
                                            type="select"
                                            name="color"
                                            id="color"
                                            value={color}
                                            onChange={this.inputChangeHandler}
                                        >
                                            <option value="bg-default">
                                                Default
                                            </option>
                                            <option value="bg-info">Info</option>
                                            <option value="bg-warning">
                                                Warning
                                            </option>
                                            <option value="bg-success">
                                                Success
                                            </option>
                                            <option value="bg-danger">Danger</option>
                                            <option value="bg-orange">Orange</option>
                                            <option value="bg-green">Green</option>
                                            <option value="bg-yellow">Yellow</option>
                                            <option value="bg-blue">Blue</option>
                                            <option value="bg-gray">Gray</option>
                                            <option value="bg-dark">Dark</option>
                                        </Input>
                                    </Col>
                                </FormGroup>
                                <FormGroup row>
                                    <Label for="todos" sm={3}>
                                        Todos
                                    </Label>
                                    <Col sm={7}>
                                        {todos.map((todo, index) => (
                                            <Input
                                                type="text"
                                                name="todos"
                                                id={index}
                                                className="mb-2"
                                                placeholder="Todo"
                                                value={todo.content}
                                                // eslint-disable-next-line react/no-array-index-key
                                                key={index}
                                                onChange={this.todoChangeHandler}
                                                invalid={
                                                    index === todos.length - 1 &&
                                                    todoError
                                                }
                                            />
                                        ))}
                                        {todoError ? (
                                            <FormFeedback>
                                                This field is required!
                                            </FormFeedback>
                                        ) : null}
                                    </Col>
                                    <Col>
                                        <Button
                                            color="primary"
                                            type="button"
                                            onClick={this.addTodo}
                                        >
                                            +
                                        </Button>
                                    </Col>
                                </FormGroup>
                            </Form>
                        )}
                    </div>
                    <div className="modal-footer">
                        <Button
                            color="secondary"
                            data-dismiss="modal"
                            type="button"
                            onClick={toggleModal}
                        >
                            Close
                        </Button>
                        <Button
                            color="primary"
                            type="button"
                            onClick={this.handleSubmit}
                        >
                            Save changes
                        </Button>
                    </div>
                </Modal>
            </>
        );
    }
}

TaskForm.defaultProps = {
    task: {}
};

TaskForm.propTypes = {
    showModal: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    createTask: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    task: PropTypes.object,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    task: state.tasks.task,
    isLoading: state.tasks.isLoading
});

export default withRouter(connect(mapStateToProps, { createTask })(TaskForm));
