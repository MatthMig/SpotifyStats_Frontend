import React, { useEffect, useState } from 'react';
import { fetchPlaylists } from '../api_caller';
import { LoadAnimation } from './LoadAnimation';

const PlaylistsOverview = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPlaylists();
        setPlaylists(data);
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
      {playlists.map((playlist) => (
        <div key={playlist.id}>
          <h2>{playlist.name}</h2>
          <p>{playlist.description}</p>
        </div>
      ))}
    </div>
  );
};

export default PlaylistsOverview;