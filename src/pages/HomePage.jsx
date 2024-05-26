import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import { useNavigate } from 'react-router-dom';
import '../styles/styles.css';

const HomePage = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const storedToken = sessionStorage.getItem('spotifyAuthToken');
        if (!storedToken) {
            navigate('/');
        } else {
            fetch(`${process.env.REACT_APP_BACKEND_URL}/spotify/fetchUserData`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${storedToken}`
                }
            })
                .then(response => {
                    if (response.status === 401) {
                        sessionStorage.removeItem('spotifyAuthToken');
                        localStorage.setItem('notification', 'Token expired. Please log in again.');
                        navigate('/');
                        throw new Error('Token expired');
                    }
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    setLoading(false);
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
                <div className='vert-horiz-centered' style={{ flexDirection: 'column' }}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p>Spotify data are loading...</p>
                </div>
            ) : error ? (
                <p>Error: {error}</p>
            ) : (
                <p>Spotify data loaded!</p>
            )}
        </div>
    );
};

export default HomePage;