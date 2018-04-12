import React, { Component } from 'react';
import PropTypes from 'prop-types';
// reactstrap components
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col
} from 'reactstrap';
// core components
import moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updateUser } from 'store/actions/authActions';
import UserHeader from 'components/Headers/UserHeader';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        const { user } = nextProps;
        if (Object.prototype.hasOwnProperty.call(user, 'email')) {
            const { email: emailProp } = user;
            const { email } = prevState;
            if (email === '' && emailProp !== '') {
                return {
                    email: emailProp
                };
            }
        }
        return prevState;
    }

    inputChangeHandler = (e) => {
        e.preventDefault();
        if (Object.prototype.hasOwnProperty.call(e.target, 'value')) {
            this.setState({
                email: e.target.value
            });
        }
    };

    hanldeSubmit = (e) => {
        e.preventDefault();
        const { email } = this.state;
        if (email !== '') {
            // eslint-disable-next-line react/destructuring-assignment
            this.props.updateUser(this.state);
        }
    };

    render() {
        const { user, isLoading } = this.props;
        const { email } = this.state;
        const {
            _id: id,
            firstName,
            lastName,
            userName,
            tasks,
            created,
            modified
        } = user;
        return (
            <>
                <UserHeader />
                {/* Page content */}
                <Container className="mt--7" fluid>
                    <Row>
                        <Col className="order-xl-1 mb-5 mb-xl-0" xl="4">
                            <Card className="card-profile shadow">
                                <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0">
                                    <div className="mt-3">
                                        <h1>
                                            <i
                                                className="ni ni-circle-08"
                                                style={{ fontSize: 'xxx-large' }}
                                            />
                                        </h1>
                                    </div>
                                </CardHeader>
                                <CardBody className="pt-0 pt-md-4">
                                    <div className="text-center">
                                        <h3>
                                            {!isLoading &&
                                            Object.prototype.hasOwnProperty.call(
                                                user,
                                                'firstName'
                                            ) &&
                                            Object.prototype.hasOwnProperty.call(
                                                user,
                                                'lastName'
                                            ) ? (
                                                <>{`${firstName} ${lastName}`}</>
                                            ) : null}
                                        </h3>
                                        <div className="h5 font-weight-300">
                                            <i className="ni location_pin mr-2" />
                                            {!isLoading &&
                                            Object.prototype.hasOwnProperty.call(
                                                user,
                                                'userName'
                                            ) &&
                                            Object.prototype.hasOwnProperty.call(
                                                user,
                                                '_id'
                                            ) ? (
                                                <>{`${userName} (${id})`}</>
                                            ) : null}
                                        </div>
                                        <div>
                                            <i className="ni education_hat mr-2" />
                                            {!isLoading &&
                                            Object.prototype.hasOwnProperty.call(
                                                user,
                                                'email'
                                            ) ? (
                                                <>{email}</>
                                            ) : null}
                                        </div>
                                        <hr className="my-4" />
                                        <div className="text-left">
                                            <div className="h5 mt-4">
                                                <i className="ni business_briefcase-24 mr-2" />
                                                Created -{' '}
                                                {!isLoading &&
                                                Object.prototype.hasOwnProperty.call(
                                                    user,
                                                    'created'
                                                ) ? (
                                                    <>
                                                        {moment(created).format(
                                                            'MMMM Do YYYY, h:mm:ss a'
                                                        )}
                                                    </>
                                                ) : null}
                                            </div>
                                            <div className="h5 mt-4">
                                                <i className="ni business_briefcase-24 mr-2" />
                                                Last Updated -{' '}
                                                {!isLoading &&
                                                Object.prototype.hasOwnProperty.call(
                                                    user,
                                                    'modified'
                                                ) ? (
                                                    <>{moment(modified).fromNow()}</>
                                                ) : null}
                                            </div>
                                        </div>
                                    </div>
                                    <Row>
                                        <div className="col">
                                            <div className="card-profile-stats d-flex justify-content-center mt-md-2">
                                                <div>
                                                    <span className="heading">
                                                        {!isLoading &&
                                                        Object.prototype.hasOwnProperty.call(
                                                            user,
                                                            'tasks'
                                                        ) ? (
                                                            <>{tasks.length}</>
                                                        ) : null}
                                                    </span>
                                                    <span className="description">
                                                        Tasks
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="order-xl-2" xl="8">
                            <Card className="bg-secondary shadow">
                                <CardHeader className="bg-white border-0">
                                    <Row className="align-items-center">
                                        <Col xs="8">
                                            <h3 className="mb-0">My account</h3>
                                        </Col>
                                        <Col className="text-right" xs="4">
                                            <Button
                                                color="primary"
                                                href="#pablo"
                                                onClick={this.hanldeSubmit}
                                                size="sm"
                                            >
                                                Update
                                            </Button>
                                        </Col>
                                    </Row>
                                </CardHeader>
                                <CardBody>
                                    <Form onSubmit={this.hanldeSubmit}>
                                        <h6 className="heading-small text-muted mb-4">
                                            Update email address
                                        </h6>
                                        <div className="pl-lg-4">
                                            <Row>
                                                <Col>
                                                    <FormGroup>
                                                        <label
                                                            className="form-control-label"
                                                            htmlFor="email"
                                                        >
                                                            Email address
                                                        </label>
                                                        <Input
                                                            className="form-control-alternative"
                                                            id="email"
                                                            placeholder="Email"
                                                            type="email"
                                                            value={email}
                                                            onChange={
                                                                this
                                                                    .inputChangeHandler
                                                            }
                                                        />
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </>
        );
    }
}

Profile.propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    updateUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isLoading: state.auth.isLoading
});

export default withRouter(connect(mapStateToProps, { updateUser })(Profile));
