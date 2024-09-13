import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Card, Col, Row } from 'react-bootstrap';
import { AddedTracks, PlaylistDetailsTracks, RemovedTracks } from './PlaylistDetails';

const SmallScreenLayout = ({ playlists, onSelectPlaylist, selectedPlaylist, tracks, duplicateTracks, onLoadMore, hasMore }) => (
    <Col className="d-flex flex-column flex-grow-1">
        <div className="list-group flex-grow-0 mb-3">
            {playlists.map((playlist) => (
                <button
                    key={playlist.id}
                    className={`list-group-item list-group-item-action squared-button ${selectedPlaylist && selectedPlaylist.id === playlist.id ? 'active' : ''}`}
                    onClick={() => onSelectPlaylist(playlist)}
                >
                    <span className="playlist-name">{playlist.name}</span>
                    <span className="text-muted text-right">{playlist.tracks.total} tracks</span>
                </button>
            ))}
        </div>
        <Row className="flex-grow-1 d-flex flex-column justify-content-between no-margin">
            <Col className="d-flex flex-column flex-grow-1">
                {selectedPlaylist ? (
                    <>
                        <Card className="mb-3 flex-grow-1">
                            <Card.Body className="d-flex flex-column">
                                <PlaylistDetailsTracks
                                    tracks={tracks}
                                    onLoadMore={onLoadMore}
                                    hasMore={hasMore}
                                    title='Playlist Tracks'
                                />
                            </Card.Body>
                        </Card>
                        <Card className="mb-3 flex-grow-1">
                            <Card.Body className="d-flex flex-column">
                                <RemovedTracks
                                    token={sessionStorage.getItem('spotifyAuthToken')}
                                    playlistId={selectedPlaylist.id}
                                />
                            </Card.Body>
                        </Card>
                        <Card className="mb-3 flex-grow-1">
                            <Card.Body className="d-flex flex-column">
                                <AddedTracks
                                    token={sessionStorage.getItem('spotifyAuthToken')}
                                    playlistId={selectedPlaylist.id}
                                />
                            </Card.Body>
                        </Card>
                        {duplicateTracks.length > 0 && (
                            <Card className="mb-3 flex-grow-1">
                                <Card.Body className="d-flex flex-column">
                                    <PlaylistDetailsTracks
                                        tracks={duplicateTracks}
                                        onLoadMore={null}
                                        hasMore={null}
                                        title='Duplicate Tracks'
                                    />
                                </Card.Body>
                            </Card>
                        )}
                    </>
                ) : (
                    <Alert variant="info" className="m-3 text-center flex-grow-1">
                        Please select a playlist to see the details.
                    </Alert>
                )}
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
    duplicateTracks: PropTypes.array,
    onLoadMore: PropTypes.func.isRequired,
    hasMore: PropTypes.bool.isRequired,
};

export default SmallScreenLayout;