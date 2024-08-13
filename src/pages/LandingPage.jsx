import React, { useEffect } from 'react';
import { Button, Card, Container } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import '../styles/styles.css';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = '0bd99cd4322041fe9b87fc99fdea27cb';
const redirectUri = 'http://localhost:3000/';
const scopes = [
  'user-library-read',
  'user-read-playback-state'
];

const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token&show_dialog=true`;

const LandingPage = () => {
  const navigate = useNavigate();
  //const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Get the hash from the URL
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce(function (initial, item) {
        if (item) {
          var parts = item.split('=');
          initial[parts[0]] = decodeURIComponent(parts[1]);
        }
        return initial;
      }, {});

    // If the hash contains an access token, store it and redirect to the homepage
    if (hash.access_token) {
      sessionStorage.setItem('spotifyAuthToken', hash.access_token);
      navigate('/home');
    }

    const storedNotification = sessionStorage.getItem('notification');
    if (storedNotification) {
      NotificationManager.warning(storedNotification, 'Warning', 5000);
      sessionStorage.removeItem('notification');
    }
  }, [navigate]);

  return (
    <Container fluid className="LandingPage-container page">
      <NotificationContainer/>
      <Card className="text-center LandingPage-card">
        <Card.Body>
          <Card.Title><h1>Welcome to SpotifyStats!</h1></Card.Title>
          <Card.Text className="margin-bottom">
            SpotifyStats is a platform that allows you to store songs and have stats on what and who you listen to over time.
          </Card.Text>
          <Button variant="primary" className="LandingPage-button" href={loginUrl}>Log in with Spotify</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default LandingPage;