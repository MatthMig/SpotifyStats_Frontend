import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMostPlayedArtists } from '../api_caller';
import { LoadAnimation } from './generic/LoadAnimation';

const MostPlayedArtists = ({ timeRange }) => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const transformArtistData = (data) => {
    return data.map(artist => ({
      id: artist.id,
      name: artist.name,
      genres: artist.genres.join(', '),
      followers: artist.followers.total
    }));
  };

  const getTitle = (timeRange) => {
    switch (timeRange) {
      case 'short_term':
        return '🎤 Artists You Have Listened to the Most in the Last 30 Days 🎤';
      case 'medium_term':
        return '🎤 Artists You Have Listened to the Most in the Last 6 Months 🎤';
      case 'long_term':
        return '🎤 Artists You Have Listened to the Most in the Last Year 🎤';
      default:
        return '🎤 Artists You Have Listened to the Most Recently 🎤';
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
        const response = await fetchMostPlayedArtists(token, timeRange);
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
        const data = transformArtistData((await response.json()).items);
        setArtists(data);
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
  
  if (loading || !Array.isArray(artists)) {
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
        {artists.map((artist, index) => (
          <div key={index} className="list-group-item">
            <span className="badge bg-primary rounded-pill me-2">{index + 1}</span>
            <span className='artist-name-solo'>{artist.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

MostPlayedArtists.propTypes = {
  timeRange: PropTypes.oneOf(['short_term', 'medium_term', 'long_term']).isRequired,
};

export default MostPlayedArtists;