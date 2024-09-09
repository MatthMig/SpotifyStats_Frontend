import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import '../../styles/HomePage.css';
import '../../styles/styles.css';
import { TopBar } from './TopBar';

const CommonLayout = ({ children }) => {
    return (
        <div className="page d-flex flex-column min-vh-100">
            <TopBar />
            <Container fluid className="home-page">
                <Row className="flex-column flex-md-row h-100 no-margin">
                    {children}
                </Row>
            </Container>
        </div>
    );
};

CommonLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default CommonLayout;