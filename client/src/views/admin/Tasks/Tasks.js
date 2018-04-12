/* eslint-disable global-require */
/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// reactstrap components
import { Card, CardHeader, Table, Container, Row, Button } from 'reactstrap';

// core components
import Header from 'components/Headers/Header';

// REDUX
import { connect } from 'react-redux';
import { deleteTask } from 'store/actions/taskActions';

import TaskTableItem from './TaskTableItem';
import TaskForm from './TaskForm';

class Tasks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false
        };
    }

    toggleModal = () => {
        const { showModal } = this.state;
        this.setState({
            showModal: !showModal
        });
    };

    handletaskDelete = (taskId) => {
        // eslint-disable-next-line react/destructuring-assignment
        this.props.deleteTask(taskId);
    };

    render() {
        const { showModal } = this.state;
        const { tasks, isLoading } = this.props;
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
                            <Card className="shadow">
                                <CardHeader className="border-0">
                                    <h3 className="mb-0">Your Tasks</h3>
                                    <Button
                                        className="btn-icon btn-3 mt-2"
                                        color="primary"
                                        type="button"
                                        onClick={this.toggleModal}
                                    >
                                        <span className="btn-inner--icon">+</span>
                                        <span className="btn-inner--text">
                                            Add New Task
                                        </span>
                                    </Button>
                                </CardHeader>
                                <TaskForm
                                    showModal={showModal}
                                    toggleModal={this.toggleModal}
                                />
                                <Table
                                    className="align-items-center table-flush"
                                    responsive
                                >
                                    <thead className="thead-light">
                                        <tr>
                                            <th scope="col">Task Name</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Completion</th>
                                            <th scope="col" />
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tasks.map((task) => {
                                            const {
                                                _id,
                                                title,
                                                category,
                                                todos
                                            } = task;
                                            return (
                                                <TaskTableItem
                                                    key={_id}
                                                    id={_id}
                                                    title={title}
                                                    category={category}
                                                    todos={todos}
                                                    onDelete={this.handletaskDelete}
                                                />
                                            );
                                        })}
                                    </tbody>
                                </Table>
                            </Card>
                        </div>
                    </Row>
                </Container>
            </>
        );
    }
}

Tasks.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    tasks: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired,
    deleteTask: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    tasks: state.tasks.tasks,
    isLoading: state.tasks.isLoading
});

export default connect(mapStateToProps, { deleteTask })(Tasks);
