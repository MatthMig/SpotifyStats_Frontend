import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Col, Modal } from 'react-bootstrap';
import { FaMusic } from 'react-icons/fa'; // Import an icon from react-icons
import { fetchAddedTracks, fetchRemovedTracks } from '../../api_caller';

const TrackList = ({ tracks, onLoadMore, hasMore, className, title }) => (
    <Col className={`d-flex tracks-list bg-white ${className}`}>
        {title && <h3 className="tracks-title text-center no-margin">{title}</h3>}
        {tracks.length === 0 ? (
            <div className='text-center text-muted no-tracks mt-2'>
                <FaMusic size={50} className='mb-3' />
                <p className='no-margin'>No tracks found.</p>
            </div>
        ) : (
            <ul className="list-group squared-button scrollable-list">
                {tracks.map((track) => (
                    <li key={track.id} className="list-group-item">
                        {track.name}
                        <span className="text-muted text-right artist-names">
                            {track.artists.map((artist) => artist.name).join(', ')}
                        </span>
                    </li>
                ))}
            </ul>
        )}
        {hasMore && (
            <Button onClick={onLoadMore} className="no-margin">
                Load More
            </Button>
        )}
    </Col>
);

TrackList.propTypes = {
    tracks: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            artists: PropTypes.arrayOf(
                PropTypes.shape({
                    name: PropTypes.string.isRequired,
                }).isRequired
            ).isRequired,
        }).isRequired
    ).isRequired,
    onLoadMore: PropTypes.func,
    hasMore: PropTypes.bool,
    className: PropTypes.string,
    title: PropTypes.string, // Add title prop type
};

const withTracks = (fetchTracksFunc, linkClass, modalTitle) => {
    const TracksComponent = ({ token, playlistId }) => {
        const [tracks, setTracks] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [showModal, setShowModal] = useState(false);
        const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

        useEffect(() => {
            const handleResize = () => {
                setIsSmallScreen(window.innerWidth <= 768);
            };

            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }, []);

        useEffect(() => {
            const fetchTracks = async () => {
                try {
                    const response = await fetchTracksFunc(token, playlistId, false);
                    if (!response.ok) {
                        throw new Error('Failed to fetch tracks');
                    }
                    const data = await response.json();
                    setTracks(data);
                } catch (error) {
                    setError(error.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchTracks();
        }, [token, playlistId]);

        const handleShow = () => setShowModal(true);
        const handleClose = () => setShowModal(false);

        if (loading) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Error: {error}</p>;
        }

        return (
            <>
                {isSmallScreen ? (
                    <>
                        <Button variant="link" onClick={handleShow} className={`playlist-title-tile text-center w-100 custom-link ${linkClass}`}>
                            {modalTitle}
                        </Button>

                        <Modal show={showModal} onHide={handleClose} size="lg">
                            <Modal.Header closeButton>
                                <Modal.Title>{modalTitle}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <TrackList tracks={tracks} className={linkClass} title={modalTitle} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Close
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                ) : (
                    <TrackList tracks={tracks} className={linkClass} title={modalTitle} />
                )}
            </>
        );
    };

    TracksComponent.propTypes = {
        token: PropTypes.string.isRequired,
        playlistId: PropTypes.string.isRequired,
    };

    return TracksComponent;
};

const AddedTracks = withTracks(fetchAddedTracks, 'added-tracks green-link', 'Added Tracks');
const RemovedTracks = withTracks(fetchRemovedTracks, 'removed-tracks red-link', 'Removed Tracks');

const PlaylistDetailsTracks = ({ tracks, onLoadMore, hasMore, title }) => {
    const [showModal, setShowModal] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    return (
        <>
            {isSmallScreen ? (
                <>
                    <Button variant="link" onClick={handleShow} className="playlist-title-tile text-center w-100 custom-link">
                        {title}
                    </Button>

                    <Modal show={showModal} onHide={handleClose} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Playlist Tracks</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <TrackList tracks={tracks} onLoadMore={onLoadMore} hasMore={hasMore} title={title} />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </>
            ) : (
                <TrackList tracks={tracks} onLoadMore={onLoadMore} hasMore={hasMore} title={title} />
            )}
        </>
    );
};

PlaylistDetailsTracks.propTypes = {
    tracks: PropTypes.array.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
};

export { AddedTracks, PlaylistDetailsTracks, RemovedTracks };
