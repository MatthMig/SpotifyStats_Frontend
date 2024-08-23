import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import CommonLayout from '../components/generic/CommonLayout';
import RankingOverview from '../components/RankingOverview';
import '../styles/RankerPage.css';

const SongsToRank = ({ songsToRank, layout }) => (
    <Row className={`songs-to-rank-row ${layout}`}>
        <Col xs={6} md={4} className="song-to-rank">
            <h5>{songsToRank[0].name}</h5>
            <p>{songsToRank[0].artists.join(', ')}</p>
        </Col>
        <Col xs={6} md={4} className="song-to-rank">
            <h5>{songsToRank[1].name}</h5>
            <p>{songsToRank[1].artists.join(', ')}</p>
        </Col>
    </Row>
);

SongsToRank.propTypes = {
    songsToRank: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            artists: PropTypes.arrayOf(PropTypes.string).isRequired
        })
    ).isRequired,
    layout: PropTypes.string.isRequired
};

const WideScreenLayout = ({ songsToRank }) => (
    <Row className="wide-screen-layout">
        <Col md={4} className="songs-to-rank-col">
            <SongsToRank songsToRank={songsToRank} layout="wide" />
        </Col>
        <Col md={8}>
            <RankingOverview />
        </Col>
    </Row>
);

WideScreenLayout.propTypes = {
    songsToRank: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            artists: PropTypes.arrayOf(PropTypes.string).isRequired
        })
    ).isRequired
};

const SmallScreenLayout = ({ songsToRank }) => (
    <Col>
        <SongsToRank songsToRank={songsToRank} layout="small" />
        <Row>
            <Col className="ranking-overview-col">
                <RankingOverview />
            </Col>
        </Row>
    </Col>
);

SmallScreenLayout.propTypes = {
    songsToRank: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string.isRequired,
            artists: PropTypes.arrayOf(PropTypes.string).isRequired
        })
    ).isRequired
};

const RankerPage = () => {
    const [songsToRank] = useState([
        { name: 'Dummy Song 1', artists: ['Artist 1'] },
        { name: 'Dummy Song 2', artists: ['Artist 2'] }
    ]);

    return (
        <CommonLayout>
            <Container fluid className="ranker-page">
                <div className="d-none d-md-block">
                    <WideScreenLayout songsToRank={songsToRank} />
                </div>
                <div className="d-block d-md-none">
                    <SmallScreenLayout songsToRank={songsToRank} />
                </div>
            </Container>
        </CommonLayout>
    );
};

export default RankerPage;