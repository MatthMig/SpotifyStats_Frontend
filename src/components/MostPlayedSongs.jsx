import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMostPlayedSongs } from '../api_caller';
import { LoadAnimation } from './generic/LoadAnimation';

const MostPlayedSongs = ({ timeRange }) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const transformTrackData = (data) => {
    return data.map(track => ({
      id: track.id,
      name: track.name,
      artists: track.artists.map(artist => artist.name),
      album: track.album.name
    }));
  };

  const getTitle = (timeRange) => {
    switch (timeRange) {
      case 'short_term':
        return '🎵 Tracks You Have Listened to the Most in the Last 30 Days 🎵';
      case 'medium_term':
        return '🎵 Tracks You Have Listened to the Most in the Last 6 Months 🎵';
      case 'long_term':
        return '🎵 Tracks You Have Listened to the Most in the Last Year 🎵';
      default:
        return '🎵 Tracks You Have Listened to the Most Recently 🎵';
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('spotifyAuthToken'); // Retrieve token from session storage
      if (!token) {
        sessionStorage.setItem('notification', 'Authentication expired. Please log in again.');
        navigate('/');
      }

      try {
        const response = await fetchMostPlayedSongs(token, timeRange);
        if (!response.ok) {
          if (response.status === 401) {
            sessionStorage.setItem('notification', 'Authentication expired. Please log in again.');
            navigate('/');
          } else if (response.status === 403) {
            throw new Error('Insufficent client scope');
          } else {
            throw new Error('Network response was not ok');
          }
        }
        const data = transformTrackData((await response.json()).items);
        setTracks(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, timeRange]);

  if (error) {
    return (
      <div className="centered-container">
        <div>Error: {error.message}</div>
      </div>
    );
  }
  
  if (loading || !Array.isArray(tracks)) {
    return (
      <div className="centered-container">
        <LoadAnimation />
      </div>
    );
  }

  return (
    <div className="container column-view">
      <h4 className="text-center text-light column-title">{getTitle(timeRange)}</h4>
      <div className="scrollable-div list-group">
        {tracks.map((track, index) => (
          <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span className="badge bg-primary rounded-pill me-2">{index + 1}</span>
            <span className='track-name'>{track.name}</span>
            <span className="text-muted text-right artist-names">{track.artists.join(', ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

MostPlayedSongs.propTypes = {
  timeRange: PropTypes.oneOf(['short_term', 'medium_term', 'long_term']).isRequired,
};

export default MostPlayedSongs;