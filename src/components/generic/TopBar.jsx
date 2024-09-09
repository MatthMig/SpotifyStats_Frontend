import { Container, Nav, Navbar } from 'react-bootstrap';
import { FaChartBar, FaHome, FaMusic, FaStar } from 'react-icons/fa'; // Import icons from react-icons
import { Link, useLocation } from 'react-router-dom';

export const TopBar = () => {
    const location = useLocation();

    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="mb-4 no-margin">
            <Container>
                <Navbar.Brand as={Link} to="/home">SpotifyStats</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home" className={location.pathname === '/home' ? 'active-link' : ''}>
                            <FaHome className="me-2" /> Home
                        </Nav.Link>
                        <Nav.Link as={Link} to="/ranker" className={location.pathname === '/ranker' ? 'active-link' : ''}>
                            <FaChartBar className="me-2" /> Ranker
                        </Nav.Link>
                        <Nav.Link as={Link} to="/playlists" className={location.pathname === '/playlists' ? 'active-link' : ''}>
                            <FaMusic className="me-2" /> Playlists
                        </Nav.Link>
                        <Nav.Link as={Link} to="/tops" className={location.pathname === '/tops' ? 'active-link' : ''}>
                            <FaStar className="me-2" /> Tops
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};