import { Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export const TopBar = () => {
    const location = useLocation();

    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand as={Link} to="/home">SpotifyStats</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link as={Link} to="/home" className={location.pathname === '/home' ? 'active-link' : ''}>Home</Nav.Link>
                    <Nav.Link as={Link} to="/ranker" className={location.pathname === '/ranker' ? 'active-link' : ''}>Ranker</Nav.Link>
                    <Nav.Link as={Link} to="/playlists" className={location.pathname === '/playlists' ? 'active-link' : ''}>Playlists</Nav.Link>
                    <Nav.Link as={Link} to="/tops" className={location.pathname === '/tops' ? 'active-link' : ''}>Tops</Nav.Link>
                    <Nav.Link as={Link} to="/settings" className={location.pathname === '/settings' ? 'active-link' : ''}>Settings</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};