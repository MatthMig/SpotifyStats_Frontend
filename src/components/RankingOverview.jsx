import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserSongRankings } from '../api_caller';
import { LoadAnimation } from './generic/LoadAnimation';

const RankingOverview = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchData = useCallback(async () => {
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
            const data = await response.json();
            const tracks = data !== null ? (
                data.map(item => ({
                    id: item.track.id,
                    name: item.track.name,
                    artists: item.track.artists.map(artist => artist.name),
                    rank: item.rank,
                    imageUrl: item.track.image_url
                }))
            ) : [];
            setTracks(tracks);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchData();
    }, [fetchData, navigate]);

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
        <div className="page container column-view">
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
                            <span className="text-muted text-right artist-names-playlist">{track.artists.join(', ')}</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RankingOverview;