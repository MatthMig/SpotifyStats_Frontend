import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Col } from 'react-bootstrap';
import { FaMusic } from 'react-icons/fa'; // Import an icon from react-icons
import { fetchAddedTracks, fetchRemovedTracks } from '../../api_caller';

const TrackList = ({ tracks, onLoadMore, hasMore, title, className }) => (
    <Col className={`d-flex tracks-list bg-white ${className}`}>
        {title && <h4 className='playlist-title-tile text-center'>{title}</h4>}
        {tracks.length === 0 ? (
            <div className='text-center text-muted no-tracks'>
                <br />
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
            <Button onClick={onLoadMore} className="mt-3 no-margin">
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
    title: PropTypes.string,
    className: PropTypes.string,
};

const PlaylistDetailsTracks = ({ tracks, onLoadMore, hasMore }) => (
    <TrackList tracks={tracks} onLoadMore={onLoadMore} hasMore={hasMore} title={'Playlist Tracks'} />
);

PlaylistDetailsTracks.propTypes = {
    tracks: PropTypes.array.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
};

const AddedTracks = ({ token, playlistId }) => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetchAddedTracks(token, playlistId, false);
                if (!response.ok) {
                    throw new Error('Failed to fetch added tracks');
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return <TrackList tracks={tracks} title="Added Tracks" className="added-tracks" />;
};

AddedTracks.propTypes = {
    token: PropTypes.string.isRequired,
    playlistId: PropTypes.string.isRequired,
};

const RemovedTracks = ({ token, playlistId }) => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTracks = async () => {
            try {
                const response = await fetchRemovedTracks(token, playlistId, false);
                if (!response.ok) {
                    throw new Error('Failed to fetch removed tracks');
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return <TrackList tracks={tracks} title="Removed Tracks" className="removed-tracks" />;
};

RemovedTracks.propTypes = {
    token: PropTypes.string.isRequired,
    playlistId: PropTypes.string.isRequired,
};

export { AddedTracks, PlaylistDetailsTracks, RemovedTracks };
