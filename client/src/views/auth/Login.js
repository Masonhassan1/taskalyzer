import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
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
import { login } from 'store/actions/authActions';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        };
    }

    handleChange = (e) => {
        const { target } = e;
        this.setState({
            [target.id]: target.value
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { userName, password } = this.state;
        if (userName !== '' && password !== '') {
            const user = {
                username: userName,
                password
            };
            // eslint-disable-next-line react/destructuring-assignment
            this.props.login(user);
        }
    };

    render() {
        const { userName, password } = this.state;
        const { isAuthenticated, token, isLoading } = this.props;
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
                <Col lg="5" md="7" className="justify-content-right">
                    <Card className="bg-secondary shadow border-0">
                        <CardHeader className="bg-transparent pb-2">
                            <div className="text-primary text-center">
                                <h3>Sign in to continue</h3>
                            </div>
                        </CardHeader>
                        <CardBody className="px-lg-5 py-lg-5">
                            <Form role="form" onSubmit={this.handleSubmit}>
                                <FormGroup className="mb-3">
                                    <InputGroup className="input-group-alternative">
                                        <InputGroupAddon addonType="prepend">
                                            <InputGroupText>
                                                <i className="ni ni-email-83" />
                                            </InputGroupText>
                                        </InputGroupAddon>
                                        <Input
                                            id="userName"
                                            placeholder="Email or Username"
                                            type="text"
                                            value={userName}
                                            onChange={this.handleChange}
                                        />
                                    </InputGroup>
                                </FormGroup>
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
                                            autoComplete="new-password"
                                            value={password}
                                            onChange={this.handleChange}
                                        />
                                    </InputGroup>
                                </FormGroup>
                                <div className="text-center">
                                    <Button
                                        className="mt-4 mb-1"
                                        color="primary"
                                        type="submit"
                                    >
                                        Sign in
                                    </Button>
                                </div>
                            </Form>
                        </CardBody>
                    </Card>
                    <Row className="mt-3">
                        <Col xs="6">
                            <a
                                className="text-purple"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <small>Forgot password?</small>
                            </a>
                        </Col>
                        <Col className="text-right" xs="6">
                            <a
                                className="text-primary"
                                href="#pablo"
                                onClick={(e) => e.preventDefault()}
                            >
                                <small>Create new account</small>
                            </a>
                        </Col>
                    </Row>
                </Col>
            </>
        );
    }
}

Login.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    token: PropTypes.string,
    isLoading: PropTypes.bool.isRequired,
    login: PropTypes.func.isRequired
};

Login.defaultProps = {
    token: null
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        token: state.auth.token,
        isLoading: state.auth.isLoading
    };
};

export default withRouter(connect(mapStateToProps, { login })(Login));
