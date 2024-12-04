// Mock function to simulate incoming data
export default function mockMaxDataGenerator(callback) {
    // Simulate data structure that Max would send
    const features = ["bpm", "texture", "danceability", "energy", "loudness"];
    const generateData = () => {
        const data = {};
        features.forEach((feature) => {
            data[feature] = Math.floor(Math.random() * 101); // Values between 0 and 100
        });
        callback(data);
    };

    // Simulate data updates every second
    const intervalId = setInterval(generateData, 1000);

    // Return a cleanup function to stop the interval
    return () => clearInterval(intervalId);
}