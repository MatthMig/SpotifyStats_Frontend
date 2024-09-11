import 'bootstrap/dist/css/bootstrap.min.css';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { FaArrowRight } from 'react-icons/fa';
import MostPlayedArtists from '../components/MostPlayedArtists';
import MostPlayedSongs from '../components/MostPlayedSongs';
import CommonLayout from '../components/generic/CommonLayout';
import '../styles/HomePage.css';
import '../styles/styles.css';

const WideScreenLayout = ({ scrollContainerRef, handleClick, arrowVisible }) => (
    <>
        <div ref={scrollContainerRef} className="scroll-container d-flex no-padding">
            <Col xs={12} md={4} className="mb-3 mb-md-0">
                <MostPlayedSongs timeRange="short_term" />
            </Col>
            <Col xs={12} md={4} className="mb-3 mb-md-0">
                <MostPlayedSongs timeRange="medium_term" />
            </Col>
            <Col xs={12} md={4} className="mb-3 mb-md-0">
                <MostPlayedSongs timeRange="long_term" />
            </Col>
            <Col xs={12} md={4} className="mb-3 mb-md-0">
                <MostPlayedArtists timeRange="short_term" />
            </Col>
            <Col xs={12} md={4} className="mb-3 mb-md-0">
                <MostPlayedArtists timeRange="medium_term" />
            </Col>
            <Col xs={12} md={4} className="mb-3 mb-md-0">
                <MostPlayedArtists timeRange="long_term" />
            </Col>
        </div>
        {arrowVisible && (
            <div className="arrow-right" onClick={handleClick}>
                <FaArrowRight size={70} />
            </div>
        )}
    </>
);

WideScreenLayout.propTypes = {
    scrollContainerRef: PropTypes.object.isRequired,
    handleClick: PropTypes.func.isRequired,
    arrowVisible: PropTypes.bool.isRequired,
};

const SmallScreenLayout = () => (
    <div className="small-screen-layout">
        <Row xs={12} className="d-flex flex-column overflow-auto mb-3">
            <MostPlayedSongs timeRange="short_term" />
        </Row>
        <Row xs={12} className="d-flex flex-column overflow-auto mb-3">
            <MostPlayedSongs timeRange="medium_term" />
        </Row>
        <Row xs={12} className="d-flex flex-column overflow-auto mb-3">
            <MostPlayedSongs timeRange="long_term" />
        </Row>
        <Row xs={12} className="d-flex flex-column overflow-auto mb-3">
            <MostPlayedArtists timeRange="short_term" />
        </Row>
        <Row xs={12} className="d-flex flex-column overflow-auto mb-3">
            <MostPlayedArtists timeRange="medium_term" />
        </Row>
        <Row xs={12} className="d-flex flex-column overflow-auto mb-3">
            <MostPlayedArtists timeRange="long_term" />
        </Row>
    </div>
);

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
            <div className="d-none d-md-flex no-padding">
                <WideScreenLayout
                    scrollContainerRef={scrollContainerRef}
                    handleClick={handleClick}
                    arrowVisible={arrowVisible}
                />
            </div>
            <div className="d-block d-md-none no-padding">
                <SmallScreenLayout />
            </div>
        </CommonLayout>
    );
};

export default TopsPage;