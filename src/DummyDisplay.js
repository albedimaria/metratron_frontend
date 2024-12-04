import React from "react";
import {useMaxData} from "./DataContext";

const MockDataDisplay = () => {
    const { data } = useMaxData();

    return (
        <div>
            <h1>Simulated Data</h1>
            {Object.keys(data).length === 0 ? (
                <p>Waiting for data...</p>
            ) : (
                <ul>
                    {Object.entries(data).map(([key, value]) => (
                        <li key={key}>
                            {key}: {value}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default MockDataDisplay;
