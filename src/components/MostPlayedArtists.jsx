import PropTypes from 'prop-types';
import React from 'react';
import { fetchMostPlayedArtists } from '../api_caller';
import MostPlayedItems from './generic/MostPlayedItems';

const MostPlayedArtists = ({ timeRange, showArrow = true }) => {
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

  const renderItem = (artist, index) => (
    <div key={index} className="list-group-item">
      <span className="badge bg-primary rounded-pill me-2">{index + 1}</span>
      <span className='artist-name-solo'>{artist.name}</span>
    </div>
  );

  return (
    <MostPlayedItems
      timeRange={timeRange}
      fetchFunction={fetchMostPlayedArtists}
      renderItem={renderItem}
      getTitle={getTitle}
      showArrow={showArrow} // Pass the showArrow parameter
    />
  );
};

MostPlayedArtists.propTypes = {
  timeRange: PropTypes.oneOf(['short_term', 'medium_term', 'long_term']).isRequired,
  showArrow: PropTypes.bool, // Optional parameter to control arrow visibility
};

export default MostPlayedArtists;