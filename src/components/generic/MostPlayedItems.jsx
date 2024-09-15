import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Button, Col, Container } from 'react-bootstrap';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { LoadAnimation } from './LoadAnimation';

const MostPlayedItems = ({ timeRange, fetchFunction, renderItem, getTitle, showArrow = true }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 768px)' });

  useEffect(() => {
    const fetchData = async () => {
      const token = sessionStorage.getItem('spotifyAuthToken'); // Retrieve token from session storage
      if (!token) {
        sessionStorage.setItem('notification', 'Authentication expired. Please log in again.');
        navigate('/');
      }

      try {
        const response = await fetchFunction(token, timeRange);
        if (!response.ok) {
          if (response.status === 401) {
            sessionStorage.setItem('notification', 'Authentication expired. Please log in again.');
            navigate('/');
          } else if (response.status === 403) {
            throw new Error('Insufficent client scope');
          } else {
            throw new Error('Network response was not ok');
          }
        }
        const data = (await response.json()).items;
        setItems(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, timeRange, fetchFunction]);

  if (error) {
    return (
      <div className="centered-container">
        <div>Error: {error.message}</div>
      </div>
    );
  }

  if (loading || !Array.isArray(items)) {
    return (
      <div className="centered-container">
        <LoadAnimation />
      </div>
    );
  }

  return (
    <Container className="column-view">
      <div className="tile align-items-center no-margin">
        <h4 className="text-center text-light column-title">
          {getTitle(timeRange)}
        </h4>
        {isSmallScreen && showArrow && (
          <Col xs="auto">
            <Button
              variant="link"
              className="expand-button p-0"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
            >
              <i className={`bi ${isExpanded ? 'bi-chevron-up' : 'bi-chevron-down'}`} style={{ fontSize: '1.5rem', color: 'white' }}></i>
            </Button>
          </Col>
        )}
      </div>
      {(!isSmallScreen || !showArrow || isExpanded) && (
        <div className="scrollable-div list-group">
          {items.map((item, index) => renderItem(item, index))}
        </div>
      )}
    </Container>
  );
};

MostPlayedItems.propTypes = {
  timeRange: PropTypes.oneOf(['short_term', 'medium_term', 'long_term']).isRequired,
  fetchFunction: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  getTitle: PropTypes.func.isRequired,
  showArrow: PropTypes.bool, // Optional parameter to control arrow visibility
};

export default MostPlayedItems;