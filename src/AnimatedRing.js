import React, { useEffect, useRef, useState } from "react";
import { Ring } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useDrag } from "@use-gesture/react";
import {useKnobsValues} from "./KnobValuesContext";
import KnobValueDisplay from "./KnobsValueDisplay";

const AnimatedRing = ({
                          vertex = { x: 0, y: 0, z: 0 }, // Provide a default vertex
                          value = 0,
                          label,
                          innerRadius = 0.4,
                          outerRadius = 0.5,
                          knobName,
                          originComponent,
                          baseColor = "lightgrey",
                          hoverColor = "white",
                          valueColor = "purple",
                      }) => {

    const ringRef = useRef();
    const valueRingRef = useRef();
    const interactiveRingRef = useRef();

    const { viewport } = useThree();
    const [knobValue, setKnobValue] = useState(value);
    const [currentAngle, setCurrentAngle] = useState(0);
    const [hoverOpacity, setHoverOpacity] = useState(0);

    const { knobValues, setKnobValues } = useKnobsValues();

    const RING_OFFSET = 0.5;
    const VALUE_OFFSET = 0.02;

    // Handlers for hover effects
    const handlePointerEnter = () => {
        setHoverOpacity(0.07); // Increase opacity on hover
        document.body.style.cursor = "pointer";
    };

    const handlePointerLeave = () => {
        setHoverOpacity(0); // Reset opacity when not hovering
        document.body.style.cursor = "default";
    };

    // Utility function to calculate new knob value
    const calculateNewValue = (current, deltaY, max = 100, min = 0) =>
        Math.max(min, Math.min(max, current + deltaY));

    // Drag behavior
    const bind = useDrag(({ movement: [_, my] }) => {
        const deltaY = -my / viewport.height * 1.5;
        const newValue = calculateNewValue(knobValue, deltaY);
        setKnobValue(newValue);
        setKnobValues((prev) => ({ ...prev, [knobName]: newValue }));
    });

    // Sync knob value with global state
    useEffect(() => {
        setKnobValue(knobValues[knobName] ?? 0);
    }, [knobValues[knobName]]);

    // Smooth animation for angle updates
    useFrame(() => {
        const targetAngle = Math.PI * 2 * (knobValue / 100);
        const angleDifference = targetAngle - currentAngle;
        if (Math.abs(angleDifference) > 0.01) {
            setCurrentAngle((current) => current + angleDifference * 0.1);
        }
    });

    // Determine label positioning dynamically
    const displayPosition =
        originComponent === "knobsOut" ? [0, 0, 7.5] : [0, 0, 3.5];
    const displayDistanceFactor = originComponent === "knobsOut" ? 20 : 25;

    console.log("AnimatedRing Vertex:", vertex);


    return (
        <group position={[vertex.x, vertex.y, vertex.z]}>
            {/* Base Ring */}
            <Ring
                ref={ringRef}
                args={[innerRadius, outerRadius, 32]}
                {...bind()}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
            >
                <meshBasicMaterial attach="material" color={baseColor} />
            </Ring>

            {/* Hover Ring */}
            <Ring
                ref={interactiveRingRef}
                args={[
                    innerRadius - RING_OFFSET,
                    outerRadius + RING_OFFSET,
                    32,
                ]}
                {...bind()}
                onPointerEnter={handlePointerEnter}
                onPointerLeave={handlePointerLeave}
            >
                <meshBasicMaterial
                    attach="material"
                    color={hoverColor}
                    transparent
                    opacity={hoverOpacity}
                />
            </Ring>

             Value Ring
            <Ring
                ref={valueRingRef}
                args={[
                    innerRadius - VALUE_OFFSET,
                    outerRadius + VALUE_OFFSET,
                    32,
                    1,
                    0,
                    currentAngle,
                ]}
            >
                <meshBasicMaterial attach="material" color={valueColor} />
            </Ring>

            {/* Knob Value Display */}
            <KnobValueDisplay
                knobValue={knobValue}
                position={displayPosition}
                label={label}
                distanceFactor={displayDistanceFactor}
            />
        </group>
    );
};

export default AnimatedRing;
