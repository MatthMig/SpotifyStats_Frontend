import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Col } from 'react-bootstrap';
import MostPlayedArtists from '../components/MostPlayedArtists';
import MostPlayedSongs from '../components/MostPlayedSongs';
import CommonLayout from '../components/generic/CommonLayout';
import '../styles/HomePage.css';
import '../styles/styles.css';

const TopsPage = () => {
    return (
        <CommonLayout>
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
        </CommonLayout>
    );
};

export default TopsPage;