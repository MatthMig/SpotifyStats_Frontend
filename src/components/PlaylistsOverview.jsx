import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserPlaylists } from '../api_caller'; // Assume this function exists
import { LoadAnimation } from './generic/LoadAnimation';

const PlaylistsOverview = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const convertPlaylistsData = (data) => {
        const playlists = data.map(playlist => ({
            id: playlist.id,
            name: playlist.id === 'saved-tracks' ? '❤️ ' + playlist.name : playlist.name,
            tracks: playlist.tracks.total
        }));
    
        const savedTracksPlaylist = playlists.find(playlist => playlist.id === 'saved-tracks');
        if (savedTracksPlaylist) {
            return [savedTracksPlaylist, ...playlists.filter(playlist => playlist.id !== 'saved-tracks')];
        }
    
        return playlists;
    };

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('spotifyAuthToken');
            if (!token) {
                sessionStorage.setItem('notification', 'Authentication expired. Please log in again.');
                navigate('/');
                return;
            }

            try {
                const response = await fetchUserPlaylists(token);
                if (!response.ok) {
                    if (response.status === 401) {
                        sessionStorage.setItem('notification', 'Authentication expired. Please log in again.');
                        navigate('/');
                    } else if (response.status === 403) {
                        throw new Error('Insufficient client scope');
                    } else {
                        throw new Error('Network response was not ok');
                    }
                }
                const data = await response.json();
                const convertedData = convertPlaylistsData(data);
                console.log('Converted playlists:', convertedData); // Log the converted data
                setPlaylists(convertedData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching playlists:', error); // Log the error
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
                <h4 className="mb-4 text-center text-light column-title">Your Playlists</h4>
            </div>
            <div className="scrollable-div list-group">
                {playlists.length === 0 ? (
                    <div className="text-center text-muted">You do not have any playlists for the moment.</div>
                ) : (
                    playlists.map((playlist, index) => (
                        <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
                            <span className='playlist-name'>{playlist.name}</span>
                            <span className="text-muted text-right">{playlist.tracks} tracks</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PlaylistsOverview;