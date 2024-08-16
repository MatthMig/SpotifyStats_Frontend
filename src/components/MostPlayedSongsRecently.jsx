import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMostPlayedSongsRecently } from '../api_caller';
import { LoadAnimation } from './generic/LoadAnimation';

const MostPlayedSongsRecently = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('spotifyAuthToken'); // Retrieve token from session storage
      if (!token) {
        sessionStorage.setItem('notification', 'Authentication expired. Please log in again.');
        navigate('/');
      }

      try {
        const response = await fetchMostPlayedSongsRecently(token);
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
  }, [navigate]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading || !Array.isArray(tracks)) {
    return <LoadAnimation />;
  }

  return (
    <div className="container mt-4 column-view">
      <h4 className="mb-4 text-center text-light column-title">🎵 Tracks You Have Listened to the Most Recently 🎵</h4>
      <div className="scrollable-div list-group">
        {tracks.map((track, index) => (
          <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <span className="badge bg-primary rounded-pill me-2">{index + 1}</span>
            <span className='track-name'>{track.name}</span>
            <span className="text-muted text-right">{track.artists.join(', ')}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MostPlayedSongsRecently;