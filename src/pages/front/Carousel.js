import { useState, useEffect } from "react";


const images = [
  {
    src: "https://images.unsplash.com/photo-1680222329309-b7cbd88f4fd6?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "幫你愛尼BunnyBuy",
    subtitle: "專為特寵的購物平台，讓每一天更輕鬆、更快樂",
  },
  {
    src: "https://images.unsplash.com/photo-1696089608681-aa3498558737?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "安心便利",
    subtitle: "讓主子安心又方便的服務!",
  },
];

function Carousel() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000); 
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    
    <div className="relative w-full h-[80vh] md:h-auto md:aspect-[2.3/1] overflow-hidden bg-gray-900">
      
      {/* 輪播圖片文字遮罩 */}
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          
          <img
            src={img.src}
            alt={`carousel-${index}`}
            className="w-full h-full object-cover"
          />
          {/* 暗色漸層遮罩 */}
          <div className="absolute inset-0 bg-black/30 md:bg-black/20" />

          {/* 內容文字區塊 */}
          <div className="absolute inset-x-0 bottom-16 md:bottom-auto md:top-1/2 md:-translate-y-1/2 max-w-7xl mx-auto px-6 md:px-16 text-white flex flex-col items-start z-20">
            <h1 className="text-3xl md:text-5xl font-bold mb-3 tracking-wide drop-shadow-md">
              {img.title}
            </h1>
            <p className="text-base md:text-xl font-medium mb-6 opacity-90 tracking-wide max-w-md drop-shadow">
              {img.subtitle}
            </p>

            <button className="bg-[#E3916E] hover:bg-[#d47f5b] hover:scale-105 transition-all text-white font-bold px-8 py-3 rounded-full flex items-center gap-2 shadow-lg text-base">
              立即選購
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      ))}

      {/* 左右切換按鈕 */}
      <button 
        onClick={prevSlide}
        className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hover:scale-105 p-2 rounded-full shadow-lg z-30 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-8 h-8 rotate-180">
          <circle cx="24" cy="24" r="22" fill="#ffc107" />
          <path d="M35.52 25.3l-6 7a2 2 0 0 1-2.82.22c-.84-.72-.94-1.98-.22-2.82l3.17-3.7H14c-1.1 0-2-.9-2-2s.9-2 2-2h15.65l-3.17-3.7a2 2 0 1 1 3.04-2.6l6 7a1.85 1.85 0 0 1 0 2.6z" fill="#fff" />
        </svg>
      </button>

      <button 
        onClick={nextSlide}
        className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white hover:scale-105 p-2 rounded-full shadow-lg z-30 transition-all"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-8 h-8">
          <circle cx="24" cy="24" r="22" fill="#ffc107" />
          <path d="M35.52 25.3l-6 7a2 2 0 0 1-2.82.22c-.84-.72-.94-1.98-.22-2.82l3.17-3.7H14c-1.1 0-2-.9-2-2s.9-2 2-2h15.65l-3.17-3.7a2 2 0 1 1 3.04-2.6l6 7a1.85 1.85 0 0 1 0 2.6z" fill="#fff" />
        </svg>
      </button>

      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === current ? "bg-[#B64A19] w-3" : "bg-white/80"
            }`}
          />
        ))}
      </div>

    </div>
  );
}

export default Carousel;
