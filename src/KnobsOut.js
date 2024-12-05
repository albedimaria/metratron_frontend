import React from "react";
import Vertices from "./Vertices";
import {useKnobsValues} from "./KnobValuesContext";
import AnimatedRing from "./AnimatedRing";

function GeomKnobsOut() {
    const { A, B, C, D, E, F } = Vertices();
    const { knobValues } = useKnobsValues(); // Access knob values from context

    const {
        bpmKnob,
        danceKnob,
        moodKnob,
        instrKnob,
        keyKnob,
        scaleKnob,
    } = knobValues; // Extract knob values

    const knobData = [
        { vertex: D, value: bpmKnob, label: "BPM", name: "bpm" },
        { vertex: F, value: danceKnob, label: "Dance", name: "dance" },
        { vertex: B, value: moodKnob, label: "Mood", name: "mood" },
        { vertex: C, value: instrKnob, label: "Instrument", name: "instr" },
        { vertex: A, value: keyKnob, label: "Key", name: "key" },
        { vertex: E, value: scaleKnob, label: "Scale", name: "scale" },
    ];


    const outerRadius = 5.5; // Outer radius of the rings
    const innerRadius = outerRadius - 0.17;

    return (
        <>
            {knobData.map(({ vertex, value, label, name }, index) => (
                <AnimatedRing
                    key={index}
                    vertex={vertex}
                    value={value}
                    innerRadius={innerRadius}
                    outerRadius={outerRadius}
                    label={label}
                    knobName={`${name}Knob`} // Assign a unique name for each knob
                    originComponent={"knobsOut"}
                />
            ))}
        </>
    );
}

export default GeomKnobsOut;
