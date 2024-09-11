import PropTypes from 'prop-types';
import React from 'react';
import { fetchMostPlayedSongs } from '../api_caller';
import MostPlayedItems from './generic/MostPlayedItems';

const MostPlayedSongs = ({ timeRange, showArrow = true }) => {
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

  const renderItem = (track, index) => (
    <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
      <span className="badge bg-primary rounded-pill me-2">{index + 1}</span>
      <span className='track-name'>{track.name}</span>
      <span className="text-muted text-right artist-names">
        {track.artists.map(artist => artist.name).join(', ')}
      </span>
    </div>
  );

  return (
    <MostPlayedItems
      timeRange={timeRange}
      fetchFunction={fetchMostPlayedSongs}
      renderItem={renderItem}
      getTitle={getTitle}
      showArrow={showArrow} // Pass the showArrow parameter
    />
  );
};

MostPlayedSongs.propTypes = {
  timeRange: PropTypes.oneOf(['short_term', 'medium_term', 'long_term']).isRequired,
  showArrow: PropTypes.bool, // Optional parameter to control arrow visibility
};

export default MostPlayedSongs;