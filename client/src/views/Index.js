import React from 'react';

// reactstrap components
import {
    Container,
    Row,
    CardColumns,
    Col,
    Card,
    CardHeader,
    CardBody,
    Button
} from 'reactstrap';

import { connect } from 'react-redux';
import { withRouter, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';

import Header from 'components/Headers/Header';
import TaskDisplayItem from './admin/Dashboard/TaskDisplayItem/TaskDisplayItem';

class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { tasks } = this.props;
        console.log(tasks.length);
        return (
            <>
                <Header />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row className="mt-5 mx-2">
                        <CardColumns>
                            {tasks.length !== 0
                                ? tasks.map((task) => (
                                      <TaskDisplayItem
                                          // eslint-disable-next-line no-underscore-dangle
                                          key={task._id}
                                          // eslint-disable-next-line no-underscore-dangle
                                          id={task._id}
                                          title={task.title}
                                          description={task.description}
                                          color={task.color}
                                          category={task.category}
                                      />
                                  ))
                                : null}
                        </CardColumns>
                    </Row>
                    {tasks.length !== 0 ? null : (
                        <Row className="mt-3 mx-2 justify-content-center">
                            <Card className="bg-green">
                                <CardHeader>
                                    <h5>Create a Task now</h5>
                                </CardHeader>
                                <CardBody className="justify-content-center">
                                    <Col className="pl-4">
                                        <NavLink to="/admin/tasks">
                                            <Button color="primary">Go!</Button>
                                        </NavLink>
                                    </Col>
                                </CardBody>
                            </Card>
                        </Row>
                    )}
                </Container>
            </>
        );
    }
}

Index.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    tasks: PropTypes.array.isRequired
};

const mapStateToProps = (state) => ({
    tasks: state.tasks.tasks,
    isLoading: state.tasks.isLoading
});

export default withRouter(connect(mapStateToProps, null)(Index));
