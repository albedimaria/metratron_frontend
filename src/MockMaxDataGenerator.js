// Mock function to simulate incoming data
import {FEATURE_LABELS} from "./FeatureLabels";

export default function mockMaxDataGenerator(callback) {
    const generateData = () => {
        const data = FEATURE_LABELS.reduce((acc, feature) => {
            acc[feature] = Math.floor(Math.random() * 101); // Values between 0 and 100
            return acc;
        }, {});
        callback(data);
    };

    const INTERVAL = 10000


    // Simulate data updates every second
    const intervalId = setInterval(generateData, INTERVAL);

    // Return a cleanup function to stop the interval
    return () => clearInterval(intervalId);
}
