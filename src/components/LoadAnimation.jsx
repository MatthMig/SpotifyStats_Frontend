import React from 'react';
import { Spinner } from 'react-bootstrap';
import '../../src/styles/styles.css';

export const LoadAnimation = () => {
  return (
    <div className='loading-container'>
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
};
