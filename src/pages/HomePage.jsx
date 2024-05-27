import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import { useNavigate } from 'react-router-dom';
import { fetchUserData } from '../api_caller';
import '../styles/HomePage.css';
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
            fetchUserData(storedToken)
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
        <div className="home-page">
            {!loading && <h1>Welcome to the Homepage!</h1>}
            {loading ? (
                <div className='loading-container'>
                    <Spinner animation="border" role="status" className="loading-spinner">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <p className="loading-text">Spotify data are loading...</p>
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