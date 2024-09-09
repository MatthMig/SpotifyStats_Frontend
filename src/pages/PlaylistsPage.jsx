import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchUserPlaylists } from '../api_caller';
import CommonLayout from '../components/generic/CommonLayout';
import { LoadAnimation } from '../components/generic/LoadAnimation';
import SmallScreenLayout from '../components/playlist_page/SmallScreenLayout';
import WideScreenLayout from '../components/playlist_page/WideScreenLayout';
import '../styles/PlaylistPage.css';

const PlaylistsPage = () => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [tracks, setTracks] = useState([]);
    const [nextTracksUrl, setNextTracksUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const token = sessionStorage.getItem('spotifyAuthToken'); // Retrieve token from session storage
            if (!token) {
                sessionStorage.setItem('notification', 'Authentication expired. Please log in again.');
                navigate('/');
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
                setPlaylists(data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const fetchPlaylistTracks = async (token, url) => {
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch playlist tracks');
        }
        return response.json();
    };

        const fetchTracks = async (url, setTracks, setNextTracksUrl, setLoading, setError, append = false) => {
        setLoading(true);
        try {
            const token = sessionStorage.getItem('spotifyAuthToken');
            const data = await fetchPlaylistTracks(token, url);
            const tracks = data.items.map(item => item.track);
            setTracks(prevTracks => append ? [...prevTracks, ...tracks] : tracks);
            setNextTracksUrl(data.next);
            setLoading(false);
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    };
    
    const handleSelectPlaylist = async (playlist) => {
        setSelectedPlaylist(playlist);
        await fetchTracks(playlist.tracks.href, setTracks, setNextTracksUrl, setLoading, setError);
    };
    
    const handleLoadMore = async () => {
        if (!nextTracksUrl) return;
        await fetchTracks(nextTracksUrl, setTracks, setNextTracksUrl, setLoading, setError, true);
    };

    if (error) {
        return (
            <div className="centered-container">
                <div>Error: {error.message}</div>
            </div>
        );
    }

    if (loading && !selectedPlaylist) {
        return (
            <div className="centered-container">
                <LoadAnimation />
            </div>
        );
    }

    return (
        <CommonLayout>
            <div className="d-none d-md-flex no-padding">
                <WideScreenLayout
                    playlists={playlists}
                    onSelectPlaylist={handleSelectPlaylist}
                    selectedPlaylist={selectedPlaylist}
                    tracks={tracks}
                    onLoadMore={handleLoadMore}
                    hasMore={!!nextTracksUrl}
                />
            </div>
            <div className="d-block d-md-none">
                <SmallScreenLayout
                    playlists={playlists}
                    onSelectPlaylist={handleSelectPlaylist}
                    selectedPlaylist={selectedPlaylist}
                    tracks={tracks}
                    onLoadMore={handleLoadMore}
                    hasMore={!!nextTracksUrl}
                />
            </div>
        </CommonLayout>
    );
};

export default PlaylistsPage;