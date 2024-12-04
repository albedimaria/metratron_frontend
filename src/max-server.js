/*

const io = require('socket.io')(8080); // Create a Socket.IO server on port 8080
console.log("Socket.IO server running on port 8080");

// Object to store feature data
const featureData = {};

// Initialize feature data with default values (optional)
const featureLabels = ["bpm", "texture", "danceability"]; // all features here
featureLabels.forEach((label) => {
    featureData[label] = 0; // Default values for all features
});

// Handle input from Max sliders
inlets = 1; // One inlet for receiving slider data
outlets = 0; // No outlets needed for this script

// Function to handle incoming messages from Max
function anything() {
    const featureName = messagename;    // The feature label
    const value = arguments[0];         // The slider value associated with the feature

    // Update the featureData object
    featureData[featureName] = value;

    // Log the updated feature for debugging
    console.log(`Updated ${featureName}: ${value}`);
}

// When a client connects
io.on('connection', (socket) => {
    console.log("Client connected:", socket.id);

    // Emit the current feature data to the client at regular intervals
    const interval = setInterval(() => {
        console.log("Sending data to client:", featureData);
        socket.emit('data_from_max', featureData); // Emit the feature data object
    }, 100); // Update interval (adjust as needed)

    // Handle client disconnection
    socket.on('disconnect', () => {
        console.log("Client disconnected:", socket.id);
        clearInterval(interval); // Stop sending data when the client disconnects
    });
});

*/