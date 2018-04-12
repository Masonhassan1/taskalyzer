// reactstrap components
import { Col, Container, Row } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import AuthFooter from 'components/Footers/AuthFooter';
import AuthNavbar from 'components/Navbars/AuthNavbar';
import routeConfig from 'routes';

// core components

class Auth extends React.Component {
    componentDidMount() {
        document.body.classList.add('bg-default');
    }

    componentWillUnmount() {
        document.body.classList.remove('bg-default');
    }

    getRoutes = (routes) => {
        return routes.map((prop) => {
            if (prop.layout === '/auth') {
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

    render() {
        return (
            <>
                <div className="auth-bg-image main-content">
                    <AuthNavbar />
                    <div className="header pt-6 pt-lg-6 pb-3 pb-lg-3">
                        <Container>
                            <div className="header-body text-center mb-5">
                                <Row className="justify-content-center">
                                    <Col lg="5" md="6">
                                        <h1 className="text-dark">
                                            Welcome to TaskBerry!
                                        </h1>
                                    </Col>
                                </Row>
                            </div>
                        </Container>
                    </div>
                    {/* Page content */}
                    <Container className="mt-2 pb-2">
                        <Row className="justify-content-center">
                            <Switch>
                                {this.getRoutes(routeConfig)}
                                <Redirect from="*" to="/auth/login" />
                            </Switch>
                        </Row>
                    </Container>
                </div>
                <AuthFooter />
            </>
        );
    }
}

export default Auth;
