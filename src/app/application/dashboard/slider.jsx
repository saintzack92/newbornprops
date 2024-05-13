import React from 'react';
import Sliders from "../components/slider/slider";

const slideElements = [
    <img src="https://i.ibb.co/ncrXc2V/1.png" alt="Slide 1" />,
    <img src="https://i.ibb.co/B3s7v4h/2.png" alt="Slide 2" />,
    <img src="https://i.ibb.co/XXR8kzF/3.png" alt="Slide 3" />,
];

export const SlidersExample = () => {
    return (
        <div className="bg-red-400">
            <Sliders slides={slideElements} autoSlide={true} />
        </div>
    );
};
