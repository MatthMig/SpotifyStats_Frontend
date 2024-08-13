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
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/spotify/fetchMostPlayedSongsRecently`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

export const fetchRanking = (token) => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/spotify/fetchRanking`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}

export const fetchPlaylists = (token) => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/spotify/fetchPlaylists`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
}