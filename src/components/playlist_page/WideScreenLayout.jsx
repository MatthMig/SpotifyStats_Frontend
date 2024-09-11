import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Col, Row } from 'react-bootstrap';
import { AddedTracks, PlaylistDetailsTracks, RemovedTracks } from './PlaylistDetails';

const WideScreenLayout = ({ playlists, onSelectPlaylist, selectedPlaylist, tracks, onLoadMore, hasMore }) => (
    <div className='d-flex w-100'>
        <Col md={4} className="no-padding d-flex list-group bg-white squared-button">
            {playlists.map((playlist) => (
                <button
                    key={playlist.id}
                    className="list-group-item list-group-item-action squared-button"
                    onClick={() => onSelectPlaylist(playlist)}
                >
                    <span className='playlist-name'>{playlist.name}</span>
                    <span className="text-muted text-right">{playlist.tracks.total} tracks</span>
                </button>
            ))}
        </Col>
        <Col md={8} className='no-padding d-flex flex-grow-1 flex-column'>
            {selectedPlaylist && (
                <h3 className='playlist-title-tile text-center no-margin'>{selectedPlaylist.name}</h3>
            )}
            <Row className='no-margin'>
                <Col className="no-padding">
                    {selectedPlaylist ? (
                        <Col className='h-100'>
                            <div className='h-50 grey-border bg-white'>
                                <RemovedTracks
                                    token={sessionStorage.getItem('spotifyAuthToken')}
                                    playlistId={selectedPlaylist.id}
                                />
                            </div>
                            <div className='h-50 grey-border bg-white'>
                                <AddedTracks
                                    token={sessionStorage.getItem('spotifyAuthToken')}
                                    playlistId={selectedPlaylist.id}
                                />
                            </div>
                        </Col>
                    ) : (
                        <Alert variant="info" className="m-3 text-center">
                            Please select a playlist to see the details.
                        </Alert>
                    )}
                </Col>
                <Col className='no-padding d-flex'>
                    {selectedPlaylist && (
                        <PlaylistDetailsTracks
                            tracks={tracks}
                            onLoadMore={onLoadMore}
                            hasMore={hasMore}
                        />
                    )}
                </Col>
            </Row>
        </Col>
    </div>
);

WideScreenLayout.propTypes = {
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

export default WideScreenLayout;