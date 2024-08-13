import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import MostPlayedSongsRecently from '../components/MostPlayedSongsRecently';
import Player from '../components/Player';
import PlaylistsOverview from '../components/PlaylistsOverview';
import Ranking from '../components/Ranking';
import { TopBar } from '../components/TopBar';
import '../styles/HomePage.css';
import '../styles/styles.css';

const HomePage = () => {
    return (
        <div className="page">
            <TopBar />
            <Container fluid className="home-page">
                <Row noGutters className='row'>
                    <Col xs={12} md={4}>
                        <MostPlayedSongsRecently />
                    </Col>
                    <Col xs={12} md={4}>
                        <Ranking />
                    </Col>
                    <Col xs={12} md={4}>
                        <PlaylistsOverview />
                    </Col>
                </Row>
            </Container>
            <Player />
        </div>
    );
};

export default HomePage;