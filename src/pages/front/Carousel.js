import { useState, useEffect } from "react";

const images = ["/carousel_1.svg", "/carousel_2.svg"];

function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full aspect-[2/1] overflow-hidden">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`carousel-${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            index === current ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      {/* 左右按鈕 */}
      <button className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hover:scale-105 p-2 rounded-full shadow ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-10 h-10 rotate-180"
        >
          <circle cx="24" cy="24" r="22" fill="#ffc107" />
          <path
            d="M35.52 25.3l-6 7a2 2 0 0 1-2.82.22c-.84-.72-.94-1.98-.22-2.82l3.17-3.7H14c-1.1 0-2-.9-2-2s.9-2 2-2h15.65l-3.17-3.7a2 2 0 1 1 3.04-2.6l6 7a1.85 1.85 0 0 1 0 2.6z"
            fill="#fff"
          />
        </svg>
      </button>

      <button className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hover:scale-105 p-2 rounded-full shadow ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 48 48"
          className="w-10 h-10 "
        >
          <circle cx="24" cy="24" r="22" fill="#ffc107" />
          <path
            d="M35.52 25.3l-6 7a2 2 0 0 1-2.82.22c-.84-.72-.94-1.98-.22-2.82l3.17-3.7H14c-1.1 0-2-.9-2-2s.9-2 2-2h15.65l-3.17-3.7a2 2 0 1 1 3.04-2.6l6 7a1.85 1.85 0 0 1 0 2.6z"
            fill="#fff"
          />
        </svg>
      </button>
    </div>
  );
}

export default Carousel;
