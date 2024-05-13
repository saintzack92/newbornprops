"use client"
import React, { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Sliders = ({
  slides,
  autoSlide = false,
  autoSlideInterval = 3000
}) => {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent(current => current === 0 ? slides.length - 1 : current - 1);
  const next = () => setCurrent(current => current === slides.length - 1 ? 0 : current + 1);

  useEffect(() => {
    if (!autoSlide) return;
    const slideInterval = setInterval(next, autoSlideInterval);
    return () => clearInterval(slideInterval);
  }, [current, autoSlide, autoSlideInterval]);

  return (
    <div className='overflow-hidden relative max-w-screen-xl mt-28 px-8 xl:px-16 mx-auto sm:px-0 b bg-blue-300'>
      <div className='flex transition-transform ease-out duration-500 '
        style={{ transform: `translateX(-${current * 100}%)` }}>
        {slides.map((slide, index) => (
          <div key={index} className='min-w-full p-10 object-contain text-center items-center justify-center flex '>
            {slide}
          </div>
        ))}
      </div>
      <div className='absolute inset-0 flex items-center justify-between p-4'>
        <button
          className='p-1 rounded-full shadow bg-white text-gray-800 hover:bg-[red]'
          onClick={prev}>
          <FiChevronLeft />
        </button>
        <button
          className='p-1 rounded-full shadow bg-white text-gray-800 hover:bg-[red]'
          onClick={next}>
          <FiChevronRight />
        </button>
      </div>
      <div className='absolute bottom-4 right-0 left-0'>
        <div className='flex items-center justify-center gap-2'>
          {slides.map((_, i) => (
            <div key={i} className={`transition-all w-3 h-3 bg-white rounded-full
              ${current === i ? "p-2" : "bg-opacity-50"}`}>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sliders;
