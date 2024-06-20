import React, { useState, useEffect, useRef } from 'react';
import '../css/edust.css';

const AutoSwitchingViewer = () => {
    const [day, setDay] = useState(1);
    const [startDate, setStartDate] = useState(new Date());
    const iframeRef = useRef(null);

    useEffect(() => {
        setStartDate(new Date());

        const interval = setInterval(() => {
            setDay(prevDay => (prevDay % 7) + 1);
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    const handleIframeLoad = () => {
        if (iframeRef.current) {
            iframeRef.current.style.visibility = 'visible';
        }
    };

    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + day - 1);
    const currentDateString = currentDate.toISOString().split('T')[0];

    return (
        <>
            <div className="header_box"></div>
        <div className="munji">
            <iframe
                ref={iframeRef}
                title="Air Quality Map"
                src={`http://localhost:5000/mise12random/api/map/${day}`}
                style={{ height: "500px", width: "100%", visibility: "hidden" }}
                onLoad={handleIframeLoad}
            />
            <div className="date-overlay">
                {currentDateString}
            </div>
        </div>
        </>
    );
};

export default AutoSwitchingViewer;
