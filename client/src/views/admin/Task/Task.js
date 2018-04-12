import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
    Container,
    Row,
    CardHeader,
    Card,
    CardBody,
    CardTitle,
    CardText,
    Button,
    CardFooter,
    Badge,
    Input,
    Col,
    Form
} from 'reactstrap';
import Header from 'components/Headers/Header';
import { connect } from 'react-redux';
import moment from 'moment';

import { fetchTaskById, updateTask, clearTask } from 'store/actions/taskActions';

class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            color: '',
            category: '',
            todos: [
                {
                    content: '',
                    completed: false
                }
            ],
            created: undefined,
            modified: undefined,
            loaded: false,
            edit: {
                title: false,
                description: false,
                color: false
            }
        };
    }

    componentDidMount() {
        const { isLoading, task, location } = this.props;
        const taskId = location.pathname.split('/')[3];
        if (
            !isLoading &&
            taskId.length > 20 &&
            !Object.prototype.hasOwnProperty.call(task, 'title')
        ) {
            // eslint-disable-next-line react/destructuring-assignment
            this.props.fetchTaskById(taskId);
        }
    }

    componentWillUnmount() {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.clearTask();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { isLoading, task } = nextProps;
        if (
            !isLoading && (task !== null) && (task !== undefined) &&
            Object.prototype.hasOwnProperty.call(task, 'created') &&
            task.created !== prevState.created
        ) {
            return { ...task, loaded: true };
        }
        return prevState;
    }

    todoStateChangeHandler = (index) => {
        const { todos } = this.state;
        const prevState = todos[index].completed;
        todos[index].completed = !prevState;
        this.setState({
            todos
        });
    };

    updateHandler = (e) => {
        e.preventDefault();
        const { title, description, color, todos, category, created } = this.state;
        const { task } = this.props;
        const updatedTask = {
            // eslint-disable-next-line no-underscore-dangle
            _id: task._id,
            title,
            description,
            color,
            todos,
            category,
            created
        };
        // eslint-disable-next-line react/destructuring-assignment
        this.props.updateTask(updatedTask);
    };

    handleUpdateContent = (element) => {
        const { edit } = this.state;
        const prevState = edit[element];
        edit[element] = !prevState;
        this.setState({
            edit
        });
    };

    onChangeHandler = (e, element) => {
        e.preventDefault();
        const nextState = this.state;
        nextState[element] = e.target.value;
        this.setState({
            ...nextState
        });
    };

    onEditStateChangeHandler = (e, element) => {
        e.preventDefault();
        const { edit } = this.state;
        const nextEditState = !edit[element];
        this.setState({
            edit: {
                ...edit,
                [element]: nextEditState
            }
        });
    };

    render() {
        const { isLoading } = this.props;
        const {
            title,
            description,
            color,
            category,
            todos,
            created,
            modified,
            loaded,
            edit
        } = this.state;
        if (isLoading) {
            return <div>Loading...</div>;
        }
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    {/* Table */}
                    <Row>
                        <div className="col">
                            {loaded ? (
                                <Card inverse className={color}>
                                    <CardHeader className="bg-default">
                                        <Row>
                                            <Col xl={1} md={3} sm={2}>
                                                <div className="py-2">Task :</div>
                                            </Col>
                                            <Col md={9}>
                                                {edit.title ? (
                                                    <Form
                                                        onSubmit={(e) =>
                                                            this.onEditStateChangeHandler(
                                                                e,
                                                                'title'
                                                            )
                                                        }
                                                    >
                                                        <Input
                                                            id="title"
                                                            placeholder={title}
                                                            type="text"
                                                            value={title}
                                                            onChange={(e) =>
                                                                this.onChangeHandler(
                                                                    e,
                                                                    'title'
                                                                )
                                                            }
                                                        />
                                                    </Form>
                                                ) : (
                                                    <Button
                                                        color="link"
                                                        className="text-secondary px-0"
                                                        onClick={() =>
                                                            this.handleUpdateContent(
                                                                'title'
                                                            )
                                                        }
                                                    >
                                                        {title}
                                                    </Button>
                                                )}
                                            </Col>
                                        </Row>
                                        <br />
                                        <small>
                                            Created :{' '}
                                            {moment(created).format(
                                                'dddd, MMMM Do YYYY, h:mm:ss a'
                                            )}
                                        </small>
                                    </CardHeader>
                                    <CardBody>
                                        <Badge
                                            color="secondary"
                                            className="text-default"
                                        >
                                            {category}
                                        </Badge>
                                        <CardTitle className="mt-2">
                                            {edit.description ? (
                                                <Form
                                                    onSubmit={(e) =>
                                                        this.onEditStateChangeHandler(
                                                            e,
                                                            'description'
                                                        )
                                                    }
                                                >
                                                    <Input
                                                        id="description"
                                                        className="text-default"
                                                        placeholder={description}
                                                        type="text"
                                                        value={description}
                                                        onChange={(e) =>
                                                            this.onChangeHandler(
                                                                e,
                                                                'description'
                                                            )
                                                        }
                                                    />
                                                </Form>
                                            ) : (
                                                <Button
                                                    color="link"
                                                    className="text-white px-0"
                                                    onClick={() =>
                                                        this.handleUpdateContent(
                                                            'description'
                                                        )
                                                    }
                                                >
                                                    {description}
                                                </Button>
                                            )}
                                        </CardTitle>
                                        <CardText>Things to do:</CardText>
                                        <div className="ml-3">
                                            {todos.map((todo, index) => (
                                                <div
                                                    key={todo.content}
                                                    className="custom-control custom-checkbox mb-3"
                                                >
                                                    <input
                                                        className="custom-control-input"
                                                        defaultChecked={
                                                            todo.completed
                                                        }
                                                        id={`todoitem-${index}`}
                                                        type="checkbox"
                                                        value={todo.completed}
                                                        onChange={this.todoStateChangeHandler.bind(
                                                            this,
                                                            index
                                                        )}
                                                    />
                                                    <label
                                                        className="custom-control-label"
                                                        htmlFor={`todoitem-${index}`}
                                                    >
                                                        {todo.content}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </CardBody>
                                    <CardFooter className={color}>
                                        <div className="justify-content-left">
                                            <span>
                                                Last modified:{' '}
                                                {moment(modified).fromNow()}
                                            </span>
                                            <Button
                                                className="ml-4"
                                                size="sm"
                                                onClick={this.updateHandler}
                                            >
                                                Update
                                            </Button>
                                        </div>
                                    </CardFooter>
                                </Card>
                            ) : (
                                <Card>
                                    <CardBody>Unavailable!</CardBody>
                                </Card>
                            )}
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

Task.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    task: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    location: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    fetchTaskById: PropTypes.func.isRequired,
    updateTask: PropTypes.func.isRequired,
    clearTask: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    task: state.tasks.task,
    isLoading: state.tasks.isLoading
});

const mapDispatchToProps = {
    fetchTaskById,
    updateTask,
    clearTask
};

export default connect(mapStateToProps, mapDispatchToProps)(Task);
