export const fetchUserData = (token) => {
  return fetch(`${process.env.REACT_APP_BACKEND_URL}/spotify/fetchUserData`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
};