import { createContext, useEffect, useMemo, useState } from "react";
import React from "react";
import { io } from "socket.io-client";
import mockMaxDataGenerator from "./MockMaxDataGenerator";

// Toggle between mock data and real data
const USE_MOCK_DATA = true;

// Initialize the Socket.IO client instance
export const socket = io("http://localhost:3000"); // Replace with your server URL if different

// Create a context for Max data
const MaxDataContext = createContext();

export const MaxDataProvider = ({ children }) => {
    const [maxData, setMaxData] = useState({}); // State for data received from Max or mock

    useEffect(() => {
        let cleanup; // Placeholder for cleanup function

        if (USE_MOCK_DATA) {
            // Use the mock data generator
            // console.log("Using mock data...");
            cleanup = mockMaxDataGenerator((receivedData) => {
                console.log("Mock data received:", receivedData);
                setMaxData(receivedData);
            });
        } else {
            // Listen for data from the Max server
            console.log("Using real Socket.IO data...");
            socket.on("data_from_max", (receivedData) => {
                console.log("Data received from Max server:", receivedData);
                setMaxData(receivedData);
            });

            // Cleanup the Socket.IO listener
            cleanup = () => socket.off("data_from_max");
        }

        // Cleanup logic when the component unmounts
        return cleanup;
    }, []); // Only runs once on mount

    // Memoize the context value to prevent unnecessary re-renders
    const contextValue = useMemo(() => ({
        data: maxData, // Data received from Max or mock
    }), [maxData]);

    return (
        <MaxDataContext.Provider value={contextValue}>
            {children}
        </MaxDataContext.Provider>
    );
};

// Custom hook to consume Max data context
export function useMaxData() {
    return React.useContext(MaxDataContext);
}
