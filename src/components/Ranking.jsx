import React, { useEffect, useState } from 'react';
import { fetchRanking } from '../api_caller';
import { LoadAnimation } from './LoadAnimation';

const Ranking = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchRanking();
        setTracks(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <LoadAnimation />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {tracks.map((track, index) => (
        <div key={track.id}>
          <h2>{index + 1}. {track.name}</h2>
          <p>{track.artist}</p>
        </div>
      ))}
    </div>
  );
};

export default Ranking;