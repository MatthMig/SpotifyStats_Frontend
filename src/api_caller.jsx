export const fetchPlayerState = (token) => {
  return fetch(`https://api.spotify.com/v1/me/player`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

export const fetchMostPlayedSongsRecently = (token) => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/top/tracks?time_range=short_term`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}