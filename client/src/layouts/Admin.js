/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

// reactstrap components
import { Container } from 'reactstrap';

// react-spinner component
import { ScaleLoader } from 'react-spinners';

// REDUX
import { connect } from 'react-redux';
import { loadUser } from 'store/actions/authActions';

// core components
import routeConfig from 'routes';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import AdminFooter from 'components/Footers/AdminFooter';
import Sidebar from 'components/Sidebar/Sidebar';

const Logo = require('assets/img/brand/argon-react.png');

const Loader = () => {
    return (
        <div className="container">
            <ScaleLoader height={90} width={7} radius={20} margin={7} />
        </div>
    );
};

class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.mainContentRef = React.createRef();
        Admin.propTypes = {
            // eslint-disable-next-line react/require-default-props
            location: PropTypes.object
        };
    }

    componentDidMount() {
        this.stateConsistencyCheck();
    }

    // eslint-disable-next-line no-unused-vars
    componentDidUpdate(e) {
        this.stateConsistencyCheck();
    }

    stateConsistencyCheck = () => {
        const { isAuthenticated, token, isLoading } = this.props;
        if (!isLoading && !isAuthenticated && token !== null) {
            // eslint-disable-next-line react/destructuring-assignment
            this.props.loadUser();
        }
    };

    getRoutes = (routes) => {
        return routes.map((prop) => {
            if (prop.layout === '/admin') {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={prop.name}
                    />
                );
            }
            return null;
        });
    };

    // eslint-disable-next-line no-unused-vars
    getBrandText = (path) => {
        const { location } = this.props;
        const { pathname } = location;
        for (let i = 0; i < routeConfig.length; i += 1) {
            if (
                pathname.indexOf(routeConfig[i].layout + routeConfig[i].path) !== -1
            ) {
                return routeConfig[i].name;
            }
        }
        return 'Brand';
    };

    render() {
        const { location, token, isLoading } = this.props;
        if (!token) {
            return <Redirect to="/auth/login" />;
        }
        if (isLoading) {
            return (
                <div className="container">
                    <div className="container text-center">
                        <div className="col mt-9">
                            <Loader />
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <>
                <Sidebar
                    {...this.props}
                    routes={routeConfig}
                    logo={{
                        innerLink: '/admin/index',
                        imgSrc: Logo,
                        imgAlt: '...'
                    }}
                />
                <div className="main-content" ref={this.mainContentRef}>
                    <AdminNavbar
                        {...this.props}
                        brandText={this.getBrandText(location.pathname)}
                    />
                    <Switch>
                        {this.getRoutes(routeConfig)}
                        <Redirect from="*" to="/admin/index" />
                    </Switch>
                    <Container fluid>
                        <AdminFooter />
                    </Container>
                </div>
            </>
        );
    }
}

Admin.propTypes = {
    user: PropTypes.object.isRequired,
    token: PropTypes.string.isRequired,
    isAuthenticated: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    loadUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
    return {
        user: state.auth.user,
        token: state.auth.token,
        isAuthenticated: state.auth.isAuthenticated,
        isLoading: state.auth.isLoading
    };
};

export default withRouter(connect(mapStateToProps, { loadUser })(Admin));
