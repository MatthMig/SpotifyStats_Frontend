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
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/ranking`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}