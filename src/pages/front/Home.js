import Carousel from "./Carousel";

const rabbitItems = [
  { title: "吃的", img: "/rabbit1.png" },
  { title: "喝的", img: "/rabbit2.png" },
  { title: "用的", img: "/rabbit3.png" },
  { title: "天天開心", img: "/rabbit4.png" },
  { title: "身體健康", img: "/rabbit5.png" },
];

const ratItems = [
  { title: "吃的", img: "/rat1.png" },
  { title: "喝的", img: "/rat2.png" },
  { title: "用的", img: "/rat3.png" },
  { title: "天天開心", img: "/rat4.png" },
  { title: "身體健康", img: "/rat5.png" },
];

function Home() {
  return (
    <>
      <Carousel />
      <section className="relative  text-center py-12 px-4" id="rabbit">
        <h2 className="text-2xl sm:text-4xl text-[#C85A00] font-bold flex justify-center items-center gap-2 mb-2">
          兔兔系列
          <img src="/rabbit.png" alt="兔兔" className="w-12 h-12" />
        </h2>
        <div className="h-1 w-48 bg-[#C85A00] mx-auto mb-10"></div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 z-10 relative ">
          {rabbitItems.map((item, i) => (
            <div
              key={i}
              className="bg-[#FFE066] rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              <div className="p-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="mx-auto h-32 object-contain"
                />
              </div>
              <div className="bg-[#FFA93C] text-white text-xl font-bold py-3">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        <img
          src="/grass_bg2.svg"
          alt="背景裝飾"
          className="absolute bottom-0 left-0 w-full max-h-[300px] object-cover -z-10"
        />
      </section>

      <section
        className=" bg-[#FFD56A] z-0 relative  text-center py-12 px-4"
        id="rabbit"
      >
        <h2 className="text-2xl sm:text-4xl text-[#C85A00] font-bold flex justify-center items-center gap-2 mb-2">
          鼠鼠系列
          <img src="/rabbit.png" alt="兔兔" className="w-12 h-12" />
        </h2>
        <div className="h-1 w-48 bg-[#C85A00] mx-auto mb-10"></div>

        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 z-10 relative ">
          {ratItems.map((item, i) => (
            <div
              key={i}
              className="bg-[#FFFFFF] rounded-lg overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              <div className="p-4">
                <img
                  src={item.img}
                  alt={item.title}
                  className="mx-auto h-32 object-contain"
                />
              </div>
              <div className="bg-[#FFA93C] text-white text-xl font-bold py-3">
                {item.title}
              </div>
            </div>
          ))}
        </div>

        <img
          src="/grass_bg2.svg"
          alt="背景裝飾"
          className="absolute bottom-0 left-0 w-full max-h-[300px] object-cover -z-10"
        />
      </section>

      <section className="relative bg-[#FFF082] min-h-screen flex justify-center items-center py-20 px-4 sm:px-6 overflow-hidden">
     <div className="bg-[#FFE066] max-w-5xl w-full px-6 py-12 sm:px-10 sm:py-16 rounded-[30px] text-center relative z-10 shadow-sm">
  
     <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#F44336] leading-tight mb-8">
      加入 <span className="text-[#F44336]">LINE 好友</span>
      <br />
      即享專屬優惠
     </h2>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-4">
      <a
        href="https://www.line.me/tw/"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-[#366c35] text-white text-xl sm:text-2xl md:text-3xl font-bold px-8 py-3 rounded-full hover:bg-green-700 transition shadow-lg"
      >
        立即加入
      </a>
      
      <img
        src="/line.svg"
        alt="Line Icon"
        className="w-20 sm:w-24 md:w-32"
      />
     </div>
   </div>

   <img
    src="/rabbit_left.png"
    alt="兔兔"
    className="absolute bottom-[-20px] left-[-20px] w-40 sm:w-60 md:w-72 lg:w-80 opacity-90 sm:opacity-100"
    />

  <img
    src="/mouse_right.png"
    alt="鼠鼠"
    className="absolute bottom-[-20px] right-[-20px] w-40 sm:w-60 md:w-72 lg:w-80 opacity-90 sm:opacity-100"
  />
 </section>
    </>
  );
}

export default Home;
