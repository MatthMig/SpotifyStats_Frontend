import React, { useEffect, useState } from 'react';
import { fetchMostPlayedSongsRecently } from '../api_caller';
import { LoadAnimation } from './LoadAnimation';

const MostPlayedSongsRecently = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchMostPlayedSongsRecently();
        setTracks(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading || !Array.isArray(tracks)) {
    return <LoadAnimation />;
  }

  return (
    <div>
      {tracks.map((track, index) => (
        <div key={index}>{track.name}</div>
      ))}
    </div>
  );
};

export default MostPlayedSongsRecently;