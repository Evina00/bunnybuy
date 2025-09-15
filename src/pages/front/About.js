function About() {
  return (
    <>
      <div className="relative">
        <div className="bg-[#FCF3A2] relative z-10">
          <div className=" bg-[#BAFF4A] absolute bottom-0 left-0 w-full h-[15vh]  -z-10"></div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center p-8 relative z-20">
            <div className=" space-y-4 mr-12 mt-12 py-16">
              <h2 className="text-5xl font-bold text-orange-500 whitespace-nowrap">
                「牠們的幸福，就是你的微笑。」
              </h2>
              <p className="border-t border-yellow-400 pt-2 text-gray-700 text-[#91552C] text-2xl mb-12">
                — 為兔子與老鼠，打造
                <br />
                安全、快樂、溫暖的
                <br />
                生活空間。
              </p>

              <div className="flex gap-6 mt-6 ">
                <div className="w-36 h-36 rounded-full bg-[#D2FF69] flex items-center justify-center text-center  text-3xl text-[#402A11] font-bold">
                  安心 <br />
                  選購
                </div>
                <div className="w-36 h-36 rounded-full bg-white flex items-center justify-center text-center text-3xl text-[#402A11] font-bold">
                  多樣化
                  <br />
                  商品
                </div>
                <div className="w-36 h-36 rounded-full bg-[#95E3FF] flex items-center justify-center text-center text-3xl text-[#402A11] font-bold">
                  快速
                  <br />
                  出貨
                </div>
              </div>
            </div>

            <div className=" flex justify-end mt-8 md:mt-0 ml-12">
              <div className="max-w-[500px] aspect-square rounded-full overflow-hidden ">
                <img
                  src="https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="兔子"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#BAFF4A] min-h-screen flex items-center justify-center px-8 py-16">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-center gap-12">
          <div className="flex-shrink-0">
            <img
              src="/tree-bg.svg"
              alt="Tree"
              className="w-96 md:w-[500px] lg:w-[600px]"
            />
          </div>

          <div className="relative flex flex-col items-center md:items-start">
            <div className="bg-white rounded-2xl border-4 border-yellow-300 shadow-md px-8 py-10 max-w-lg text-center md:text-left pb-20">
              <p className="text-3xl font-bold text-[#44622C] leading-relaxed">
                還記得第一次遇見牠的那一刻嗎？
                <br />
                她好奇地嗅著你的手
                <br />
                或是用圓滾滾的眼睛望著你
                <br />
                那瞬間
                <br />
                你就知道
                <br />
                她成了你生活的一部分。
              </p>

              <img
                src="/about-rat.svg"
                alt="Guinea Pig"
                className="absolute bottom-0 left-0 w-32 md:w-40 translate-y-1/4 -translate-x-1/4"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center px-6 py-12"
        style={{ backgroundImage: "url('/about-bg.svg')" }}
      >
        <h2 className="text-5xl font-bold text-white mb-6 drop-shadow-md text-center">
          品牌理念
        </h2>

        <div className="bg-white rounded-2xl border-4 border-yellow-300 shadow-lg max-w-3xl w-full px-10 py-12 text-center">
          <p className="text-[#91552C] font-bold text-lg leading-relaxed">
            「不只用品，更是愛的延伸。」
            <br />
            自2025年開始在台灣經營寵物商品、通路、服務，打造貼近消費者的寵物生活提案平台。
            <br />
            我們深知，兔子和老鼠的世界不大，但愛可以很大。
            <br />
            我們將每一件產品，都當作送給自己家人的禮物，用心挑選、細心檢驗，確保他們能安心使用。
            <br />
            不論是軟綿的窩、香氣誘人的飼料，還是能讓牠們盡情玩耍的小玩具，這裡的一切，都是為了他們的健康、快樂，還有你安心的笑容。
            <br />
            因為愛牠，就是想給牠最好的。
            <br />
            而我們，就是他們幸福生活的後盾。
          </p>
        </div>
      </div>

      <div className="bg-[#FF8D41] min-h-screen flex items-center justify-center px-8">
        <a
          href="https://line.me/R/ti/p/@ribbitstore"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center space-y-6 block hover:cursor-pointer"
        >
          <div className="max-w-6xl w-full flex flex-col md:flex-row items-center justify-between gap-2">
            <div className="flex-shrink-0">
              <img
                src="/vip-icon.svg"
                alt="VIP Member"
                className="w-96 md:w-[28rem]"
              />
            </div>

            <div className="text-center space-y-6">
              <div>
                <h2 className="text-5xl md:text-6xl font-bold text-white flex justify-center gap-2">
                  {["加", "入", "會", "員", "即", "享"].map((char, i) => (
                    <span
                      key={i}
                      className="bg-[#FFCF3E] w-32 h-32 md:w-24 md:h-24 flex items-center justify-center rounded-full"
                    >
                      {char}
                    </span>
                  ))}
                </h2>
              </div>

              <p className="text-white font-bold text-3xl py-4">
                當日消費滿3000元
              </p>

              <p className="text-3xl md:text-4xl font-bold text-white">
                享 <span className="text-6xl text-[#F4FF1B]">85折</span> 優惠
                再送 <span className="text-6xl text-[#F4FF1B]">300</span>
                <span className="text-3xl md:text-4xl font-bold text-white">
                  折價券 ✨
                </span>
              </p>
            </div>
          </div>
        </a>
      </div>
    </>
  );
}

export default About;
