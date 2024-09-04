import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserSongRankings } from '../api_caller';
import { LoadAnimation } from './generic/LoadAnimation';

const RankingOverview = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const transformTrackData = (data) => {
        if (!Array.isArray(data)) {
            return [];
        }
        return data.map(track => ({
            id: track.id,
            name: track.name,
            artists: track.artists.map(artist => artist.name)
        }));
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('spotifyAuthToken');
            if (!token) {
                sessionStorage.setItem('notification', 'Authentication expired. Please log in again.');
                navigate('/');
            }

            try {
                const response = await fetchUserSongRankings(token);
                if (!response.ok) {
                    if (response.status === 401) {
                        sessionStorage.setItem('notification', 'Authentication expired. Please log in again.');
                        navigate('/');
                    } else if (response.status === 403) {
                        throw new Error('Insufficent client scope');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }
                const data = transformTrackData((await response.json()).items);
                setTracks(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    if (error) {
        return (
            <div className="centered-container">
                <div>Error: {error.message}</div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="centered-container">
                <LoadAnimation />
            </div>
        );
    }

    return (
        <div className="home-page container column-view">
            <div className='tile'>
                <h4 className="mb-4 text-center text-light column-title">Your tracks ranking</h4>
            </div>
            <div className="scrollable-div list-group">
                {tracks.length === 0 ? (
                    <div className="text-center text-muted">You do not have ranked any songs for the moment.</div>
                ) : (
                    tracks.map((track, index) => (
                        <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <span className="badge bg-primary rounded-pill me-2">{index + 1}</span>
                            <span className='track-name'>{track.name}</span>
                            <span className="text-muted text-right">{track.artists.join(', ')}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

RankingOverview.propTypes = {
    timeRange: PropTypes.oneOf(['short_term', 'medium_term', 'long_term']).isRequired,
};

export default RankingOverview;