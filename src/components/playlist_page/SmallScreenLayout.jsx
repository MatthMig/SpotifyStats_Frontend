import PropTypes from 'prop-types';
import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { PlaylistDetailsTracks } from './PlaylistDetails';

const SmallScreenLayout = ({ playlists, onSelectPlaylist, selectedPlaylist, tracks, onLoadMore, hasMore }) => (
    <Col className="d-flex flex-column flex-grow-1">
        <div className="list-group flex-grow-1">
            {playlists.map((playlist) => (
                <button
                    key={playlist.id}
                    className="list-group-item list-group-item-action squared-button"
                    onClick={() => onSelectPlaylist(playlist)}
                >
                    <span>{playlist.name}</span>
                    <span className="text-muted text-right">{playlist.tracks.total} tracks</span>
                </button>
            ))}
        </div>
        <Row className="flex-grow-1 d-flex align-items-end">
            <Col className="playlist-details-col playlist-name">
                <div>
                    {selectedPlaylist ? (
                        <PlaylistDetailsTracks
                            tracks={tracks}
                            onLoadMore={onLoadMore}
                            hasMore={hasMore}
                        />
                    ) : (
                        <p>Please select a playlist to see the details.</p>
                    )}
                </div>
            </Col>
        </Row>
    </Col>
);

SmallScreenLayout.propTypes = {
    playlists: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
            tracks: PropTypes.shape({
                total: PropTypes.number.isRequired,
            }).isRequired,
        })
    ).isRequired,
    onSelectPlaylist: PropTypes.func.isRequired,
    selectedPlaylist: PropTypes.object,
    tracks: PropTypes.array.isRequired,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
};

export default SmallScreenLayout;