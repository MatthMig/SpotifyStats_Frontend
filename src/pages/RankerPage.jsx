import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Card, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { rankTracks } from '../api_caller';
import CommonLayout from '../components/generic/CommonLayout';
import RankingOverview from '../components/RankingOverview';
import '../styles/RankerPage.css';

const SongsToRank = ({ songsToRank, layout, token, left, right, onCardClick }) => {
    const handleCardClick = async (songIndex) => {
        try {
            const unrankedTrackId = songsToRank[0].id;
            const preference = songIndex === 0 ? 'unranked' : 'ranked';
            const { unrankedTrack, comparisonTrack, left: newLeft, right: newRight } = await rankTracks(token, unrankedTrackId, preference, left, right);
            onCardClick(unrankedTrack, comparisonTrack, newLeft, newRight);
        } catch (error) {
            console.error('Error ranking track:', error);
        }
    };

    return layout === 'small' ? (
        <Row>
            <Col xs={6} md={4} onClick={() => handleCardClick(0)}>
                <h5>{songsToRank[0].name}</h5>
                <p>{songsToRank[0].artists.map(artist => artist.name).join(', ')}</p>
            </Col>
            <Col xs={6} md={4} onClick={() => handleCardClick(1)}>
                <h5>{songsToRank[1].name}</h5>
                <p>{songsToRank[1].artists.map(artist => artist.name).join(', ')}</p>
            </Col>
        </Row>
    ) : (layout === 'wide' ? (
        <Col className='d-flex wide-songs-to-ranks-col'>
            <Card className="mb-5 w-100 clickable-card" onClick={() => handleCardClick(0)}>
                <Card.Body>
                    <Card.Title>{songsToRank[0].name}</Card.Title>
                    <Card.Text>{songsToRank[0].artists.map(artist => artist.name).join(', ')}</Card.Text>
                </Card.Body>
            </Card>
            <Card className="mb-5 w-100 clickable-card" onClick={() => handleCardClick(1)}>
                <Card.Body>
                    <Card.Title>{songsToRank[1].name}</Card.Title>
                    <Card.Text>{songsToRank[1].artists.map(artist => artist.name).join(', ')}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    ) : null);
};

SongsToRank.propTypes = {
    songsToRank: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            artists: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string
                })
            )
        })
    ),
    layout: PropTypes.string.isRequired,
    token: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    onCardClick: PropTypes.func.isRequired
};

const WideScreenLayout = ({ songsToRank = [], loading, error, token, left, right, onCardClick }) => {
    const [reload, setReload] = useState(false);

    const handleCardClick = async (unrankedTrack, comparisonTrack, newLeft, newRight) => {
        try {
            onCardClick(unrankedTrack, comparisonTrack, newLeft, newRight);
            setReload(!reload); // Toggle the reload state to trigger re-render
        } catch (error) {
            console.error('Error ranking track:', error);
        }
    };

    return (
        <div className='d-flex w-100'>
            <Col md={4} className='d-flex flex-grow-1 flex-column'>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center h-100">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : error ? (
                    <Alert variant="danger" className="mt-3">
                        Error: {error}
                    </Alert>
                ) : (
                    <SongsToRank songsToRank={songsToRank} layout="wide" token={token} left={left} right={right} onCardClick={handleCardClick} />
                )}
            </Col>
            <Col md={8} className='d-flex'>
                <RankingOverview key={reload} /> {/* Pass reload state as key to trigger re-render */}
            </Col>
        </div>
    );
};

WideScreenLayout.propTypes = {
    songsToRank: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            artists: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string
                })
            )
        })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    token: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    onCardClick: PropTypes.func.isRequired
};

const SmallScreenLayout = ({ songsToRank = [], loading, error, token, left, right, onCardClick }) => {
    const [reload, setReload] = useState(false);

    const handleCardClick = async (songIndex) => {
        try {
            const unrankedTrackId = songsToRank[songIndex].id;
            const preference = songIndex === 0 ? 'unranked' : 'ranked';
            const { unrankedTrack, comparisonTrack, left: newLeft, right: newRight } = await rankTracks(token, unrankedTrackId, preference, left, right);
            onCardClick(unrankedTrack, comparisonTrack, newLeft, newRight);
            setReload(!reload); // Toggle the reload state to trigger re-render
        } catch (error) {
            console.error('Error ranking track:', error);
        }
    };

    return (
        <Col>
            {loading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>Error: {error}</div>
            ) : (
                <SongsToRank songsToRank={songsToRank} layout="small" token={token} left={left} right={right} onCardClick={handleCardClick} />
            )}
            <Row>
                <Col>
                    <RankingOverview />
                </Col>
            </Row>
        </Col>
    );
};

SmallScreenLayout.propTypes = {
    songsToRank: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            artists: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string
                })
            )
        })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    token: PropTypes.string.isRequired,
    left: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    onCardClick: PropTypes.func.isRequired
};

const RankerPage = () => {
    const [songsToRank, setSongsToRank] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [left, setLeft] = useState(0); // Initialize left state
    const [right, setRight] = useState(0); // Initialize right state
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
                setSongsToRank([response.unrankedTrack, response.comparisonTrack]);
                setLeft(response.left); // Set left state
                setRight(response.right); // Set right state
                setLoading(false);
            } catch (err) {
                if (err.status === 401) {
                    sessionStorage.setItem('notification', 'Authentication expired. Please log in again.');
                    navigate('/');
                }
                setError(err.message);
                setLoading(false);
            }
        };

        fetchSongsToRank();
    }, [navigate]);

    const token = sessionStorage.getItem('spotifyAuthToken');

    const handleCardClick = useCallback((unrankedTrack, comparisonTrack, newLeft, newRight) => {
        setSongsToRank([unrankedTrack, comparisonTrack]);
        setLeft(newLeft);
        setRight(newRight);
    }, []);

    return (
        <CommonLayout>
            <Container fluid>
                <div className="d-none d-md-flex h-100">
                    <WideScreenLayout songsToRank={songsToRank} loading={loading} error={error} token={token} left={left} right={right} onCardClick={handleCardClick} />
                </div>
                <div className="d-block d-md-none">
                    <SmallScreenLayout songsToRank={songsToRank} loading={loading} error={error} token={token} left={left} right={right} onCardClick={handleCardClick} />
                </div>
            </Container>
        </CommonLayout>
    );
};

export default RankerPage;