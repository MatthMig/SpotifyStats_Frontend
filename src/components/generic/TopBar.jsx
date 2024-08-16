import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const TopBar = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/home">SpotifyStats</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    <Nav.Link as={Link} to="/ranker">Ranker</Nav.Link>
                    <Nav.Link as={Link} to="/playlists">Playlists</Nav.Link>
                    <Nav.Link as={Link} to="/settings">Settings</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};