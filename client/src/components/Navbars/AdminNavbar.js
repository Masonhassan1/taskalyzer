import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// reactstrap components
import {
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Navbar,
    Nav,
    Container,
    Media
} from 'reactstrap';

// REDUX
import { connect } from 'react-redux';
import { logout } from 'store/actions/authActions';

// eslint-disable-next-line no-unused-vars
const AdminNavbar = (props) => {
    const { brandText, user, isLoading } = props;
    return (
        <>
            <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
                <Container fluid>
                    <Link
                        className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
                        to="/"
                    >
                        {brandText}
                    </Link>
                    {isLoading ? null : (
                        <Nav className="align-items-center d-none d-md-flex" navbar>
                            <UncontrolledDropdown nav>
                                <DropdownToggle className="pr-0" nav>
                                    <Media className="align-items-center">
                                        <span className="avatar avatar-sm rounded-circle">
                                            <i className="ni ni-single-02" />
                                        </span>
                                        <Media className="ml-2 d-none d-lg-block">
                                            <span className="mb-0 text-sm font-weight-bold">
                                                {Object.prototype.hasOwnProperty.call(user, 'userName') && user.userName}
                                            </span>
                                        </Media>
                                    </Media>
                                </DropdownToggle>
                                <DropdownMenu className="dropdown-menu-arrow" right>
                                    <DropdownItem
                                        className="noti-title"
                                        header
                                        tag="div"
                                    >
                                        <h6 className="text-overflow m-0">
                                            Welcome! {Object.prototype.hasOwnProperty.call(user, 'userName') && user.userName}
                                        </h6>
                                    </DropdownItem>
                                    <DropdownItem
                                        to="/admin/user-profile"
                                        tag={Link}
                                    >
                                        <i className="ni ni-single-02" />
                                        <span>My profile</span>
                                    </DropdownItem>
                                    <DropdownItem to="/admin/tasks" tag={Link}>
                                        <i className="ni ni-bullet-list-67" />
                                        <span>My Tasks</span>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem
                                        href="#pablo"
                                        onClick={() => props.logout()}
                                    >
                                        <i className="ni ni-curved-next" />
                                        <span>Logout</span>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    )}
                </Container>
            </Navbar>
        </>
    );
};

AdminNavbar.propTypes = {
    brandText: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    user: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.auth.user,
    isLoading: state.auth.isLoading
});

export default connect(mapStateToProps, { logout })(AdminNavbar);
