import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('spotifyAuthToken');
        if (!storedToken) {
            navigate('/');
        } else {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/loadSpotifyData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedToken}`
                }
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.success) {
                        setLoading(false);
                    } else {
                        setError('Failed to load Spotify data');
                    }
                })
                .catch(error => { // eslint-disable-line no-unused-vars
                    setError('Failed to connect to the server');
                    setLoading(false);
                });
        }
    }, [navigate]);

    return (
        <div>
            <h1>Welcome to the Homepage!</h1>
            {loading ? (
                <p>Loading Spotify data...</p>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <p>Spotify data loaded!</p>
            )}
        </div>
    );
};

export default HomePage;