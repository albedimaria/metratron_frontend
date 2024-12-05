import React from "react";
import {useKnobsValues} from "./KnobValuesContext";

const MockDataDisplay = () => {
    const { knobValues, setKnobValues } = useKnobsValues();
    console.log(knobValues);

    if (!knobValues || Object.keys(knobValues).length === 0) {
        return <p>Waiting for data...</p>;
    }

    const handleKnobChange = (key, newValue) => {
        // Update the knob value dynamically
        setKnobValues((prev) => ({
            ...prev,
            [key]: newValue,
        }));
    };

    return (
        <div>
            <h1>Real-Time Knob Values</h1>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "10px" }}>
                {Object.entries(knobValues).map(([key, value]) => (
                    <div key={key}>
                        <label>{key}</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={value ?? 0} // Ensure default value
                            onChange={(e) => handleKnobChange(key, parseInt(e.target.value, 10))}
                        />
                        <span>{value ?? 0}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MockDataDisplay;
