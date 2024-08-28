import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { rankTracks } from '../api_caller';
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

const WideScreenLayout = ({ songsToRank, loading, error }) => (
    <Row className="wide-screen-layout">
        <Col md={4} className="songs-to-rank-col">
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <SongsToRank songsToRank={songsToRank} layout="wide" />
            )}
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
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

const SmallScreenLayout = ({ songsToRank, loading, error }) => (
    <Col>
        {loading ? (
            <div>Loading...</div>
        ) : error ? (
            <div>Error: {error}</div>
        ) : (
            <SongsToRank songsToRank={songsToRank} layout="small" />
        )}
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
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

const RankerPage = () => {
    const [songsToRank, setSongsToRank] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('spotifyAuthToken'); // Retrieve token from session storage
        if (!token) {
          sessionStorage.setItem('notification', 'Authentication expired. Please log in again.');
          navigate('/');
          return;
        }

        const fetchSongsToRank = async () => {
            try {
                const response = await rankTracks(token);
                setSongsToRank(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSongsToRank();
    }, [navigate]);

    return (
        <CommonLayout>
            <Container fluid className="ranker-page">
                <div className="d-none d-md-block">
                    <WideScreenLayout songsToRank={songsToRank} loading={loading} error={error} />
                </div>
                <div className="d-block d-md-none">
                    <SmallScreenLayout songsToRank={songsToRank} loading={loading} error={error} />
                </div>
            </Container>
        </CommonLayout>
    );
};

export default RankerPage;