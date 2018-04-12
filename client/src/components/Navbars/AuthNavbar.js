import React from 'react';
import { Link } from 'react-router-dom';
// reactstrap components
import {
    UncontrolledCollapse,
    NavbarBrand,
    Navbar,
    NavItem,
    NavLink,
    Nav,
    Container,
    Row,
    Col
} from 'reactstrap';

// eslint-disable-next-line no-unused-vars
const AdminNavbar = (props) => {
    return (
        <>
            <Navbar className="navbar-top navbar-horizontal navbar-dark" expand="md">
                <Container className="px-4">
                    <NavbarBrand to="/" tag={Link}>
                        <h1>
                            Task<span className="text-info">Berry</span>
                        </h1>
                    </NavbarBrand>
                    <button
                        className="navbar-toggler"
                        id="navbar-collapse-main"
                        type="button"
                    >
                        <span className="navbar-toggler-icon" />
                    </button>
                    <UncontrolledCollapse navbar toggler="#navbar-collapse-main">
                        <div className="navbar-collapse-header d-md-none">
                            <Row>
                                <Col className="collapse-brand" xs="6">
                                    <Link to="/">
                                        <h1>
                                            Task
                                            <span className="text-info">Berry</span>
                                        </h1>
                                    </Link>
                                </Col>
                                <Col className="collapse-close" xs="6">
                                    <button
                                        className="navbar-toggler"
                                        id="navbar-collapse-main"
                                        type="button"
                                    >
                                        <span />
                                        <span />
                                    </button>
                                </Col>
                            </Row>
                        </div>
                        <Nav className="ml-auto" navbar>
                            <NavItem>
                                <NavLink className="nav-link-icon" to="/" tag={Link}>
                                    <span className="nav-link-inner--text">
                                        Dashboard
                                    </span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="nav-link-icon"
                                    to="/auth/register"
                                    tag={Link}
                                >
                                    <span className="nav-link-inner--text">
                                        Register
                                    </span>
                                </NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink
                                    className="nav-link-icon"
                                    to="/auth/login"
                                    tag={Link}
                                >
                                    <span className="nav-link-inner--text">
                                        Login
                                    </span>
                                </NavLink>
                            </NavItem>
                        </Nav>
                    </UncontrolledCollapse>
                </Container>
            </Navbar>
        </>
    );
};

export default AdminNavbar;
