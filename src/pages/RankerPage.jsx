import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CommonLayout from '../components/generic/CommonLayout';
import RankingOverview from '../components/RankingOverview';
import '../styles/RankerPage.css';

const RankerPage = () => {
    const [songsToRank] = useState([
        { name: 'Dummy Song 1', artists: ['Artist 1'] },
        { name: 'Dummy Song 2', artists: ['Artist 2'] }
    ]);

    return (
        <CommonLayout>
            <Container fluid className="ranker-page">
                <Row>
                    <Col md={4} className="d-none d-md-block">
                        <div className="song-to-rank mb-4">
                            <h5>{songsToRank[0].name}</h5>
                            <p>{songsToRank[0].artists.join(', ')}</p>
                        </div>
                        <div className="song-to-rank">
                            <h5>{songsToRank[1].name}</h5>
                            <p>{songsToRank[1].artists.join(', ')}</p>
                        </div>
                    </Col>
                    <Col xs={12} className="d-block d-md-none">
                        <Row>
                            <Col xs={6} className="song-to-rank">
                                <h5>{songsToRank[0].name}</h5>
                                <p>{songsToRank[0].artists.join(', ')}</p>
                            </Col>
                            <Col xs={6} className="song-to-rank">
                                <h5>{songsToRank[1].name}</h5>
                                <p>{songsToRank[1].artists.join(', ')}</p>
                            </Col>
                        </Row>
                    </Col>
                    <Col md={8} xs={12}>
                        <RankingOverview />
                    </Col>
                </Row>
            </Container>
        </CommonLayout>
    );
};

export default RankerPage;