import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useRef, useState } from 'react';
import { Col } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import MostPlayedArtists from '../components/MostPlayedArtists';
import MostPlayedSongs from '../components/MostPlayedSongs';
import CommonLayout from '../components/generic/CommonLayout';
import '../styles/HomePage.css';
import '../styles/styles.css';

const TopsPage = () => {
    const [arrowVisible, setArrowVisible] = useState(true);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const handleSwipe = (e) => {
            if (e.deltaX > 50) {
                setArrowVisible(false);
            }
        };

        window.addEventListener('wheel', handleSwipe);

        return () => {
            window.removeEventListener('wheel', handleSwipe);
        };
    }, []);

    const handleClick = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 500, behavior: 'smooth' });
        }
        setArrowVisible(false);
    };

    return (
        <CommonLayout>
            <div ref={scrollContainerRef} className="scroll-container d-flex overflow-auto no-padding">
                <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                    <MostPlayedSongs timeRange="short_term" />
                </Col>
                <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                    <MostPlayedSongs timeRange="medium_term" />
                </Col>
                <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                    <MostPlayedSongs timeRange="long_term" />
                </Col>
                <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                    <MostPlayedArtists timeRange="short_term" />
                </Col>
                <Col xs={12} md={4} className="d-flex flex-column overflow-auto mb-3 mb-md-0">
                    <MostPlayedArtists timeRange="medium_term" />
                </Col>
                <Col xs={12} md={4} className="d-flex flex-column overflow-auto">
                    <MostPlayedArtists timeRange="long_term" />
                </Col>
            </div>
            {arrowVisible && (
                <div className="arrow-right" onClick={handleClick}>
                    <FaArrowRight size={70} />
                </div>
            )}
        </CommonLayout>
    );
};

export default TopsPage;