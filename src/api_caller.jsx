export const fetchPlayerState = (token) => {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

const validTimeRanges = ['short_term', 'medium_term', 'long_term'];

const fetchTops = (token, time_range, endpoint) => {
  if (!validTimeRanges.includes(time_range)) {
    throw new Error('Invalid time range');
  }
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/top/${endpoint}?time_range=${time_range}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
};

export const fetchMostPlayedSongs = (token, time_range) => {
  return fetchTops(token, time_range, 'tracks');
};

export const fetchMostPlayedArtists = (token, time_range) => {
  return fetchTops(token, time_range, 'artists');
};

export const fetchUserSongRankings = (token) => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/user/ranking`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

export const fetchUserPlaylists = (token) => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/user/playlists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

// Function to rank tracks by making an API call to the backend
// Parameters:
// - token: The authorization token for the API call
// - unrankedTrackId: The ID of the track that is currently unranked (optional)
// - preference: The user's preference for ranking (e.g., 'unranked' or 'ranked') (optional)
// - left: The left boundary index for the dichotomy search (optional)
// - right: The right boundary index for the dichotomy search (optional)
// - mid: The middle index for the dichotomy search (optional)
export const rankTracks = async (token, unrankedTrackId, preference, left, right) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/rank-tracks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        unrankedTrackId,
        preference,
        left,
        right
      })
    });

    if (!response.ok) {
      throw new Error('Failed to rank tracks');
    }

    return await response.json();
  } catch (error) {
    console.error('Error ranking tracks:', error);
    throw error;
  }
};

export const fetchAddedTracks = (token, playlist, last24Hours = false, offset = 0, limit = 50) => {
  const url = new URL(`${process.env.REACT_APP_BACKEND_URL}/user/added-tracks`);
  url.searchParams.append('playlist', playlist);
  url.searchParams.append('last24Hours', last24Hours);
  url.searchParams.append('offset', offset);
  url.searchParams.append('limit', limit);

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
};

export const fetchRemovedTracks = (token, playlist, last24Hours = false, offset = 0, limit = 50) => {
  const url = new URL(`${process.env.REACT_APP_BACKEND_URL}/user/removed-tracks`);
  url.searchParams.append('playlist', playlist);
  url.searchParams.append('last24Hours', last24Hours);
  url.searchParams.append('offset', offset);
  url.searchParams.append('limit', limit);

  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
};

export const fetchRecentAddedRemovedTracks = async (token, playlist) => {
  let addedTracksCount = 0;
  let removedTracksCount = 0;
  let addedOffset = 0;
  let removedOffset = 0;
  const limit = 50;
  let hasMoreAddedTracks = true;
  let hasMoreRemovedTracks = true;
  let addedTracksData = [];
  let removedTracksData = [];

  try {
    while (hasMoreAddedTracks || hasMoreRemovedTracks) {
      const [addedResponse, removedResponse] = await Promise.all([
        fetchAddedTracks(token, playlist, true, addedOffset, limit),
        fetchRemovedTracks(token, playlist, true, removedOffset, limit)
      ]);

      if (!addedResponse.ok || !removedResponse.ok) {
        throw new Error('Failed to fetch added or removed tracks');
      }

      const addedTracks = await addedResponse.json();
      const removedTracks = await removedResponse.json();

      addedTracksCount += addedTracks.length;
      removedTracksCount += removedTracks.length;

      addedTracksData = [...addedTracksData, ...addedTracks];
      removedTracksData = [...removedTracksData, ...removedTracks];

      hasMoreAddedTracks = addedTracks.length === limit;
      hasMoreRemovedTracks = removedTracks.length === limit;

      if (hasMoreAddedTracks) {
        addedOffset += limit;
      }

      if (hasMoreRemovedTracks) {
        removedOffset += limit;
      }
    }

    return {
      addedTracksCount,
      removedTracksCount,
      addedTracksData,
      removedTracksData
    };
  } catch (error) {
    console.error('Error fetching recent added/removed tracks:', error);
    throw error;
  }
};