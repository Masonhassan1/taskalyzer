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
    InputGroupAddon,
    InputGroupText,
    InputGroup,
    Row,
    Col
} from 'reactstrap';
// REDUX
import { connect } from 'react-redux';
import { register } from 'store/actions/authActions';
import { Redirect } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: '',
                lastName: '',
                email: '',
                userName: '',
                password: '',
                confirmpassword: ''
            },
            validations: {
                email: false,
                userName: false,
                password: false,
                confirmpassword: false
            },
            formValidity: false
        };
    }

    handleChange = (e) => {
        const { target } = e;
        const { user, validations } = this.state;
        const updatedUser = user;
        const updatedValidations = validations;
        let validity = true;
        updatedUser[target.id] = target.value;
        if (Object.prototype.hasOwnProperty.call(updatedValidations, target.id)) {
            updatedValidations[target.id] = this.validateField(
                target.id,
                target.value
            );
        }
        // eslint-disable-next-line no-restricted-syntax
        for (const key in validations) {
            if (Object.prototype.hasOwnProperty.call(validations, key)) {
                validity = validity && validations[key];
            }
        }
        this.setState({
            user: updatedUser,
            validations: updatedValidations,
            formValidity: validity
        });
    };

    validateField = (id, value) => {
        const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        const { user } = this.state;
        switch (id) {
            case 'email':
                return emailTest.test(value);
            case 'userName':
                return value.length >= 2;
            case 'password':
                return value.length >= 8;
            case 'confirmpassword':
                return user.password === value;
            default:
                return value.trim() !== '';
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { user, formValidity } = this.state;
        if (formValidity) {
            const updatedUser = {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                userName: user.userName,
                password: user.password
            };
            // eslint-disable-next-line react/destructuring-assignment
            this.props.register(updatedUser);
        }
    };

    render() {
        const { user, validations } = this.state;
        const { token, isAuthenticated, isLoading } = this.props;
        if (token) {
            return <Redirect to="/admin/index" />;
        }
        if (isLoading && !isAuthenticated) {
            return (
                <div className="container">
                    <div className="container text-center">
                        <div className="col mt-5">
                            <h1>Loading...</h1>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <>
                <Col lg="6" md="8" className="pb-4">
                    <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-transparent pb-2">
                            <div className="text-muted text-center mt-2 mb-4">
                                <h4>Sign up for free! it&apos;s easy!</h4>
                            </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form role="form" onSubmit={this.handleSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-circle-08" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    id="firstName"
                                                    placeholder="First Name"
                                                    type="text"
                                                    value={user.firstName}
                                                    onChange={this.handleChange}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-circle-08" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    id="lastName"
                                                    placeholder="Last Name"
                                                    type="text"
                                                    value={user.lastName}
                                                    onChange={this.handleChange}
                                                />
                                            </InputGroup>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-single-02" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id="userName"
                                            placeholder="Username"
                                            type="text"
                                            value={user.userName}
                                            onChange={this.handleChange}
                                        />
                                    </InputGroup>
                                    <div className="text-muted font-italic">
                                        <small>
                                            {validations.login ? null : (
                                                <span className="text-info font-weight-700">
                                                    Username is required!
                                                </span>
                                            )}
                                        </small>
                                    </div>
                                </FormGroup>
                                <FormGroup>
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-email-83" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id="email"
                                            placeholder="Email Address"
                                            type="email"
                                            value={user.email}
                                            onChange={this.handleChange}
                                        />
                                    </InputGroup>
                                    <div className="text-muted font-italic">
                                        <small>
                                            {validations.email ? null : (
                                                <span className="text-info font-weight-700">
                                                    Valid email address is required!
                                                </span>
                                            )}
                                        </small>
                                    </div>
                                </FormGroup>
                                <Row>
                                    <Col md={6}>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    id="password"
                                                    placeholder="Password"
                                                    type="password"
                                                    value={user.password}
                                                    onChange={this.handleChange}
                                                />
                                            </InputGroup>
                                            <div className="text-muted font-italic">
                                                <small>
                                                    Password strength:{' '}
                                                    {validations.password ? (
                                                        <span className="text-success font-weight-700">
                                                            strong
                                                        </span>
                                                    ) : (
                                                        <span className="text-danger font-weight-700">
                                                            weak
                                                        </span>
                                                    )}
                                                </small>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                    <Col md={6}>
                                        <FormGroup>
                                            <InputGroup className="input-group-alternative">
                                                <InputGroupAddon addonType="prepend">
                                                    <InputGroupText>
                                                        <i className="ni ni-lock-circle-open" />
                                                    </InputGroupText>
                                                </InputGroupAddon>
                                                <Input
                                                    id="confirmpassword"
                                                    placeholder="Confirm Password"
                                                    type="password"
                                                    value={user.confirmpassword}
                                                    onChange={this.handleChange}
                                                />
                                            </InputGroup>
                                            <div className="text-muted font-italic">
                                                <small>
                                                    {validations.confirmpassword ? (
                                                        <span className="text-success font-weight-700">
                                                            Passwords match!
                                                        </span>
                                                    ) : (
                                                        <span className="text-info font-weight-700">
                                                            Passwords should be
                                                            matched!
                                                        </span>
                                                    )}
                                                </small>
                                            </div>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <div className="text-center">
                                    <Button
                                        className="mt-4"
                                        color="primary"
                                        type="submit"
                                    >
                                        Create account
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </>
        );
    }
}

Register.defaultProps = {
    token: null
};

Register.propTypes = {
    register: PropTypes.func.isRequired,
    token: PropTypes.string,
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    token: state.auth.token,
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});

const mapDispatchToProps = {
    register
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
