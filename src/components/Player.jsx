import React, { useEffect, useState } from "react";
import { fetchPlayerState } from '../api_caller';

const Player = () => {
    const [ isActive, setIsActive ] = useState(false);

    useEffect(() => {
        const fetchAndLogPlayerState = async () => {
            const response = await fetchPlayerState();
            const data = await response.json();
            setIsActive(!(data.error != null));
        };

        fetchAndLogPlayerState();
        /*
        // Set up an interval to fetch the player state every second
        const intervalId = setInterval(fetchAndLogPlayerState, 1000);

        // Clean up the interval on unmount
        return () => clearInterval(intervalId);*/
    }, []);

    return (
        <div>
            <h1>Player</h1>
            {isActive ? (
                    <p>The player is active</p>
                ) : (
                    <p>The player is not active: Probably premium account required</p>
                )
            }
        </div>
    );
};

export default Player;