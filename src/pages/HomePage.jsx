import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Col } from 'react-bootstrap';
import MostPlayedSongs from '../components/MostPlayedSongs';
import RankingOverview from '../components/RankingOverview';
import CommonLayout from '../components/generic/CommonLayout';
import '../styles/HomePage.css';
import '../styles/styles.css';

const HomePage = () => {
    return (
        <CommonLayout>
            <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                <MostPlayedSongs timeRange="short_term" />
            </Col>
            <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                <RankingOverview />
            </Col>
            <Col xs={12} md={4} className="d-flex flex-column overflow-auto">
                {/* Add more components here if needed */}
            </Col>
        </CommonLayout>
    );
};

export default HomePage;