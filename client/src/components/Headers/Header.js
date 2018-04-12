import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from 'reactstrap';
// REDUX
import { connect } from 'react-redux';

const getStats = (tasks) => {
    const totalTasks = tasks.length;
    let totalTodos = 0;
    let todosLeft = 0;
    let taskTodoModified = 0;
    let taskCreated = 0;
    let task;
    let todos;
    let todo;
    for (let i = 0; i < tasks.length; i += 1) {
        task = tasks[i];
        todos = task.todos;
        totalTodos += task.todos.length;
        for (let j = 0; j < todos.length; j += 1) {
            todo = todos[j];
            if (todo.completed === false) {
                todosLeft += 1;
            }
        }
        if (taskTodoModified < new Date(task.modified).getTime()) {
            taskTodoModified = new Date(task.modified).getTime();
        }
        if (taskCreated < new Date(task.created).getTime()) {
            taskCreated = new Date(task.created).getTime();
        }
    }
    const progress = Number(((totalTodos - todosLeft) / totalTodos) * 100).toFixed(
        2
    );
    return {
        totalTasks,
        totalTodos,
        todosLeft,
        progress,
        taskCreated,
        taskTodoModified
    };
};

// eslint-disable-next-line no-unused-vars
const Header = (props) => {
    const { tasksLoading, tasks } = props;
    const stats = getStats(tasks);
    return (
        <>
            <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
                <Container fluid>
                    <div className="header-body">
                        {/* Card stats */}
                        {tasksLoading ? null : (
                            <Row>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase text-muted mb-0"
                                                    >
                                                        Tasks
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">
                                                        {stats.totalTasks}
                                                    </span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-danger text-white rounded-circle shadow">
                                                        <i className="fas fa-th-list" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className="mt-3 mb-0 text-muted text-sm">
                                                <span className="text-nowrap">
                                                    updated
                                                </span>
                                                <span className="text-info ml-2">
                                                    {stats.taskCreated !== 0 ? (
                                                        moment(
                                                            stats.taskCreated
                                                        ).fromNow()
                                                    ) : (
                                                        <>Not enough data</>
                                                    )}
                                                </span>{' '}
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase text-muted mb-0"
                                                    >
                                                        Todos
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">
                                                        {stats.totalTodos}
                                                    </span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-yellow text-white rounded-circle shadow">
                                                        <i className="fas fa-clipboard-list" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className="mt-3 mb-0 text-muted text-sm">
                                                <span className="text-nowrap">
                                                    updated
                                                </span>
                                                <span className="text-info ml-2">
                                                    {stats.taskTodoModified !== 0 ? (
                                                        moment(
                                                            stats.taskTodoModified
                                                        ).fromNow()
                                                    ) : (
                                                        <>Not enough data</>
                                                    )}
                                                </span>{' '}
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase text-muted mb-0"
                                                    >
                                                        Todos left
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">
                                                        {stats.todosLeft}
                                                    </span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                                                        <i className="fas fa-clipboard-list" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className="mt-3 mb-0 text-muted text-sm">
                                                <span className="text-nowrap">
                                                    updated
                                                </span>
                                                <span className="text-info ml-2">
                                                    {stats.taskTodoModified !== 0 ? (
                                                        moment(
                                                            stats.taskTodoModified
                                                        ).fromNow()
                                                    ) : (
                                                        <>Not enough data</>
                                                    )}
                                                </span>{' '}
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                                <Col lg="6" xl="3">
                                    <Card className="card-stats mb-4 mb-xl-0">
                                        <CardBody>
                                            <Row>
                                                <div className="col">
                                                    <CardTitle
                                                        tag="h5"
                                                        className="text-uppercase text-muted mb-0"
                                                    >
                                                        Productivity
                                                    </CardTitle>
                                                    <span className="h2 font-weight-bold mb-0">
                                                        {stats.progress}%
                                                    </span>
                                                </div>
                                                <Col className="col-auto">
                                                    <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                                                        <i className="fas fa-percent" />
                                                    </div>
                                                </Col>
                                            </Row>
                                            <p className="mt-3 mb-0 text-muted text-sm">
                                                <span className="text-nowrap">
                                                    updated
                                                </span>
                                                <span className="text-info ml-2">
                                                    {stats.taskTodoModified !== 0 ? (
                                                        moment(
                                                            stats.taskTodoModified
                                                        ).fromNow()
                                                    ) : (
                                                        <>Not enough data</>
                                                    )}
                                                </span>{' '}
                                            </p>
                                        </CardBody>
                                    </Card>
                                </Col>
                            </Row>
                        )}
                    </div>
                </Container>
            </div>
        </>
    );
};

Header.defaultProps = {
    tasks: []
};

Header.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    tasksLoading: PropTypes.bool.isRequired,
    tasks: PropTypes.arrayOf(
        PropTypes.shape({
            _id: PropTypes.string,
            title: PropTypes.string,
            description: PropTypes.string,
            color: PropTypes.string,
            category: PropTypes.string,
            todos: PropTypes.any,
            created: PropTypes.string,
            modified: PropTypes.string
        })
    )
};

const mapStateToProps = (state) => ({
    tasksLoading: state.tasks.isLoading,
    tasks: state.tasks.tasks
});

export default connect(mapStateToProps, null)(Header);
