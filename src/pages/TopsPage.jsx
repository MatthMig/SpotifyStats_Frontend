import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import MostPlayedArtists from '../components/MostPlayedArtists'; // Import the new component
import MostPlayedSongs from '../components/MostPlayedSongs';
import Player from '../components/generic/Player';
import { TopBar } from '../components/generic/TopBar';
import '../styles/HomePage.css';
import '../styles/styles.css';

const TopsPage = () => {
    return (
        <div className="page d-flex flex-column min-vh-100">
            <TopBar />
            <Container fluid className="home-page">
                <Row className="flex-column flex-md-row h-100">
                    <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                        <MostPlayedSongs timeRange="short_term" />
                    </Col>
                    <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                        <MostPlayedSongs timeRange="medium_term" />
                    </Col>
                    <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                        <MostPlayedSongs timeRange="long_term" />
                    </Col>
                    <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                        <MostPlayedArtists timeRange="short_term" />
                    </Col>
                    <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                        <MostPlayedArtists timeRange="medium_term" />
                    </Col>
                    <Col xs={12} md={4} className="d-flex flex-column overflow-auto">
                        <MostPlayedArtists timeRange="long_term" />
                    </Col>
                </Row>
            </Container>
            <Player className="mt-auto" />
        </div>
    );
};

export default TopsPage;