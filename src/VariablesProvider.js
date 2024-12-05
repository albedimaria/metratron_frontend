import React, { createContext, useEffect, useState, useMemo } from "react";
import {useMaxData} from "./DataContext";
import {FEATURE_LABELS} from "./FeatureLabels";

const VariablesContext = createContext();

export const VariablesProvider = ({ children }) => {
    const { data: maxData } = useMaxData();

    const [variables, setVariables] = useState(
        FEATURE_LABELS.reduce((acc, feature) => {
            acc[feature] = 0; // Default value for each feature
            return acc;
        }, {})
    );

    useEffect(() => {
        if (maxData) {
            setVariables((prev) => ({
                ...prev,
                ...Object.keys(variables).reduce((acc, key) => {
                    acc[key] = maxData[key] ?? prev[key];
                    return acc;
                }, {}),
            }));
        }
    }, [maxData]);

    const contextValue = useMemo(() => variables, [variables]);
    const setContextValue = useMemo(() => ({
        setVariable: (key, value) => {
            setVariables((prev) => ({
                ...prev,
                [key]: value,
            }));
        },
    }), []);

    return (
        <VariablesContext.Provider value={{ contextValue, setContextValue }}>
            {children}
        </VariablesContext.Provider>
    );
};

export function useVariables() {
    return React.useContext(VariablesContext);
}
