import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import MostPlayedSongs from '../components/MostPlayedSongs';
import RankingOverview from '../components/RankingOverview';
import Player from '../components/generic/Player';
import { TopBar } from '../components/generic/TopBar';
import '../styles/HomePage.css';
import '../styles/styles.css';

const HomePage = () => {
    return (
        <div className="page d-flex flex-column min-vh-100">
            <TopBar />
            <Container fluid className="home-page">
                <Row className="flex-column flex-md-row h-100">
                    <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                        <MostPlayedSongs timeRange="short_term" />
                    </Col>
                    <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                        <RankingOverview />
                    </Col>
                    <Col xs={12} md={4} className="d-flex flex-column overflow-auto">
                        
                    </Col>
                </Row>
            </Container>
            <Player className="mt-auto" />
        </div>
    );
};

export default HomePage;