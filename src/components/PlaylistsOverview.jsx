import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { fetchRecentAddedRemovedTracks, fetchUserPlaylists } from '../api_caller';
import '../styles/HomePage.css'; // Import the CSS file
import { LoadAnimation } from './generic/LoadAnimation';

const PlaylistsOverview = () => {
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tracksInfo, setTracksInfo] = useState({});
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({ title: '', tracks: [] });
    const navigate = useNavigate();

    const convertPlaylistsData = (data) => {
        const playlists = data.map(playlist => ({
            id: playlist.id,
            name: playlist.id.startsWith('saved-tracks') ? '❤️ ' + playlist.name : playlist.name,
            tracks: playlist.tracks.total
        }));

        const savedTracksPlaylist = playlists.find(playlist => playlist.id.startsWith('saved-tracks'));
        if (savedTracksPlaylist) {
            return [savedTracksPlaylist, ...playlists.filter(playlist => !playlist.id.startsWith('saved-tracks'))];
        }

        return playlists;
    };

    const fetchTracks = async (token, playlistId) => {
        const { addedTracksCount, removedTracksCount, addedTracksData, removedTracksData } = await fetchRecentAddedRemovedTracks(token, playlistId);
        return { addedTracksCount, removedTracksCount, addedTracksData, removedTracksData };
    };

    useEffect(() => {
        const fetchAndCompareTracks = async (token, playlistId) => {
            const updateTracksInfo = async () => {
                const tracksInfo = await fetchTracks(token, playlistId);
                setTracksInfo(prev => ({
                    ...prev,
                    [playlistId]: tracksInfo
                }));
                return tracksInfo;
            };

            let previousTracksInfo = await updateTracksInfo();
            await new Promise(resolve => setTimeout(resolve, 2000));
            let currentTracksInfo = await updateTracksInfo();
            while (previousTracksInfo.addedTracksCount === currentTracksInfo.addedTracksCount &&
                previousTracksInfo.removedTracksCount === currentTracksInfo.removedTracksCount) {
                previousTracksInfo = currentTracksInfo;
                await new Promise(resolve => setTimeout(resolve, 2000));
                currentTracksInfo = await updateTracksInfo();
            }
        };

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
                setPlaylists(convertedData);
                setLoading(false);

                // Fetch added and removed tracks count for each playlist
                for (const playlist of convertedData) {
                    fetchAndCompareTracks(token, playlist.id);
                }
            } catch (error) {
                console.error('Error fetching playlists:', error); // Log the error
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, [navigate]);

    const openModal = (title, tracks) => {
        setModalContent({ title, tracks });
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
    };

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
                            {tracksInfo[playlist.id] && (
                                <span className="d-flex align-items-center">
                                    <span
                                        className="text-success mr-2"
                                        onClick={() => openModal(`Added Tracks in last 24 hours - ${playlist.name}`, tracksInfo[playlist.id].addedTracksData)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        ⬆️ {tracksInfo[playlist.id].addedTracksCount}
                                    </span>
                                    <span
                                        className="text-danger"
                                        onClick={() => openModal(`Removed Tracks in last 24 hours - ${playlist.name}`, tracksInfo[playlist.id].removedTracksData)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        ⬇️ {tracksInfo[playlist.id].removedTracksCount}
                                    </span>
                                </span>
                            )}
                        </div>
                    ))
                )}
            </div>
            <Modal
                show={modalIsOpen}
                onHide={closeModal}
                centered
                dialogClassName="modal-90w"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title">
                        {modalContent.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul className="tracks-list">
                        {modalContent.tracks.map((track, index) => (
                            <li key={index} className="track-item list-group-item d-flex justify-content-between align-items-center">
                                <span className="badge bg-primary rounded-pill me-2">{index + 1}</span>
                                <span className='track-name'>{track.name}</span>
                                <span className="text-muted text-right artist-names-playlist">{track.artists.join(', ')}</span>
                            </li>
                        ))}
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default PlaylistsOverview;