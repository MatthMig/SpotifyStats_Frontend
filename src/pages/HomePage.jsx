import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import MostPlayedSongsRecently from '../components/MostPlayedSongsRecently';
import Player from '../components/Player';
import PlaylistsOverview from '../components/PlaylistsOverview';
import Ranking from '../components/Ranking';
import { TopBar } from '../components/generic/TopBar';
import '../styles/HomePage.css';
import '../styles/styles.css';

const HomePage = () => {
    return (
        <div className="page d-flex flex-column min-vh-100">
            <TopBar />
            <Container fluid className="home-page">
                <Row nogutters className='row h-100'>
                    <Col xs={12} md={4} className="d-flex flex-column overflow-auto">
                        <MostPlayedSongsRecently />
                    </Col>
                    <Col xs={12} md={4} className="d-flex flex-column overflow-auto">
                        <Ranking />
                    </Col>
                    <Col xs={12} md={4} className="d-flex flex-column overflow-auto">
                        <PlaylistsOverview />
                    </Col>
                </Row>
            </Container>
            <Player className="mt-auto" />
        </div>
    );
};

export default HomePage;