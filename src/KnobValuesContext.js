import React, { createContext, useState, useEffect } from "react";
import {useVariables} from "./VariablesProvider";

const KnobValuesContext = createContext();

export const KnobValuesProvider = ({ children }) => {
    const { contextValue } = useVariables(); // Get slider values from VariablesProvider
    const [knobValues, setKnobValues] = useState({
        bpmKnob: 20,
        danceKnob: 0,
        moodKnob: 0,
        instrKnob: 0,
        keyKnob: 0,
        scaleKnob: 0,
        timbreKnob: 0,
        harmoKnob: 0,
        dynamicKnob: 0,
        colorKnob: 0,
        textureKnob: 0,
        reverbKnob: 0,
        clarityKnob: 0,
    });

    // Initialize knob values with slider values
    useEffect(() => {
        setKnobValues((prevKnobValues) => ({
            ...prevKnobValues,
            bpmKnob: contextValue.bpm,
            danceKnob: contextValue.danceability,
            moodKnob: contextValue.mood,
            instrKnob: contextValue.instrument,
            keyKnob: contextValue.key,
            scaleKnob: contextValue.scale,
            timbreKnob: contextValue.timbre,
            harmoKnob: contextValue.harmonicity,
            dynamicKnob: contextValue.dynamic_complexity_norm,
            colorKnob: contextValue.color,
            textureKnob: contextValue.texture,
            reverbKnob: contextValue.reverb,
            clarityKnob: contextValue.clarity,
        }));
    }, [contextValue]);

    return (
        <KnobValuesContext.Provider value={{ knobValues, setKnobValues }}>
            {children}
        </KnobValuesContext.Provider>
    );
};

export function useKnobsValues() {
    return React.useContext(KnobValuesContext);
}
