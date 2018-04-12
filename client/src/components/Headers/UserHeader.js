/* eslint-disable react/no-unescaped-entities */

import React from 'react';
// reactstrap components
import { Container, Row, Col } from 'reactstrap';

// eslint-disable-next-line no-unused-vars
const UserHeader = (props) => {
    return (
        <>
            <div className="header pb-8 pt-5 pt-lg-8 d-flex align-items-center">
                {/* Mask */}
                <span className="mask bg-gradient-primary opacity-5" />
                {/* Header container */}
                <Container className="d-flex align-items-center" fluid>
                    <Row>
                        <Col lg="7" md="10">
                            <p className="text-white mt-3 mb-4">
                                This is your profile page. You can see your profile
                                info and you can update your email.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default UserHeader;
