import React from "react";
import Vertices from "./Vertices";
import {Canvas} from "@react-three/fiber";

const Hexagon = () => {
    const vertices = Vertices(); // Get all points
    const { A, B, C, D, E, F } = vertices; // Extract hexagon points

    // Convert points into an array of THREE.Vector3-like coordinates
    const hexagonPoints = [
        [A.x, A.y, A.z],
        [B.x, B.y, B.z],
        [C.x, C.y, C.z],
        [D.x, D.y, D.z],
        [E.x, E.y, E.z],
        [F.x, F.y, F.z],
        [A.x, A.y, A.z], // Close the hexagon
    ];
    console.log(hexagonPoints);

    return (
        <line>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    array={new Float32Array(hexagonPoints.flat())}
                    count={hexagonPoints.length}
                    itemSize={3}
                />
            </bufferGeometry>
            <lineBasicMaterial color="blue" linewidth={2} />
        </line>
    );
};

const HexagonRendering = () => {
    return <Hexagon />

};

export default HexagonRendering;
