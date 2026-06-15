import about2 from "../../assets/images/about2.svg"
import vipIcon from "../../assets/images/vip-icon.svg"
import aboutBg from '../../assets/images/about-bg.svg';

function About() {


  return (
    <>
  <div className="relative">
  <div className="bg-[#FCF3A2] relative z-10 overflow-hidden">
    <div className="bg-[#BAFF4A] absolute bottom-0 left-0 w-full h-[10vh] md:h-[15vh] -z-10"></div>
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center p-6 md:p-8 relative z-20">
      <div className="flex-1 flex flex-col items-center md:items-start text-center  py-10 md:py-16 md:mr-12">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-orange-500 leading-tight">
          「牠們的幸福，就是你的微笑。」
        </h2>
        <p className="border-t border-yellow-400 pt-4 mt-4 text-[#91552C] text-xl md:text-2xl mb-8 md:mb-12">
          — 為兔子與老鼠，打造
          <br />
          安全、快樂、溫暖的
          <br />
          生活空間。
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mt-6">
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-[#D2FF69] flex items-center justify-center text-center text-xl md:text-3xl text-[#402A11] font-bold shadow-sm">
            安心 <br /> 選購
          </div>
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-white flex items-center justify-center text-center text-xl md:text-3xl text-[#402A11] font-bold shadow-sm">
            多樣化 <br /> 商品
          </div>
          <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-[#95E3FF] flex items-center justify-center text-center text-xl md:text-3xl text-[#402A11] font-bold shadow-sm">
            快速 <br /> 出貨
          </div>
        </div>
      </div>
      <div className="flex-1 flex justify-center md:justify-end mt-10 md:mt-0 md:ml-12">
        <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px] rounded-full overflow-hidden border-8 border-white shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1589952283406-b53a7d1347e8?q=80&w=1074&auto=format&fit=crop"
            alt="兔子"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</div>
    
  <div className="bg-white mx-4 my-10 md:mx-12 md:my-20 space-y-16 md:space-y-0">
  <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 ">
    <div className="flex flex-col items-center text-center px-4 md:px-0  order-1 md:order-2 flex-1">
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#564032] font-bold mb-5 md:mb-8 tracking-wide">
        商品幫您把關!
      </h2>
      <p className="text-xl md:text-2xl lg:text-3xl text-[#564032] font-medium leading-relaxed max-w-xl md:max-w-none">
        多數品牌有我們幫您把關，
        <br className="hidden xs:block md:hidden lg:block" />
        寶貝的健康人人有責!
      </p>
    </div>


    <div className="order-2 md:order-1 flex-1 flex justify-center md:justify-end">
      <img
        src="https://images.unsplash.com/photo-1564890769567-cae969d2f9ba?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="風景"
        className="w-full h-auto max-w-[480px] md:max-w-[550px] lg:max-w-[650px]  object-cover "
      />
    </div>
  </div>

  <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16 pt-16 md:pt-24 ">
    <div className="flex-1 flex justify-center md:justify-start">
      <img
        src={about2}
        alt="兔子"
        className="w-full h-auto max-w-[480px] md:max-w-[550px] lg:max-w-[650px]  object-cover"
      />
    </div>

  
    <div className="flex flex-col items-center text-center px-4 md:px-0 flex-1 ">
      <h2 className="text-3xl md:text-4xl lg:text-5xl text-[#564032] font-bold mb-5 md:mb-8 tracking-wide">
        特寵選品購物多樣化
      </h2>
      <p className="text-xl md:text-2xl lg:text-3xl text-[#564032] font-medium leading-relaxed max-w-xl md:max-w-none">
        專門的特寵商品，從吃到玩，
        <br className="hidden xs:block md:hidden lg:block" />
        多樣化商品敲方便!!
      </p>
    </div>
  </div>
</div>

    
      <div
        className="relative bg-cover bg-center min-h-screen flex flex-col items-center justify-center px-6 py-12"
        style={{ backgroundImage: `url(${aboutBg})` }}
      >
        <h2 className="text-5xl font-bold text-white mb-12 drop-shadow-md text-center">
          品牌理念
        </h2>

      
          <p className="text-white font-bold text-xl leading-relaxed text-center">
            <span className="text-[#FBFF00]">「不只用品，更是愛的延伸。」</span>
            <br />
            自2025年開始在台灣經營寵物商品、通路、服務，打造貼近消費者的
            <span className="text-[#FBFF00]">寵物生活提案平台。</span>
            <br />
            我們深知，兔子和老鼠的世界不大，但愛可以很大。
            <br />
            我們將每一件產品，都當作送給自己家人的禮物，
            <span className="text-[#FBFF00]">用心挑選、細心檢驗</span>
            ，確保他們能安心使用。
            <br />
            不論是軟綿的窩、香氣誘人的飼料，還是能讓牠們盡情玩耍的小玩具，這裡的一切，都是為了他們的健康、快樂，還有你安心的笑容。
            <br />
            因為愛牠，就是想給牠最好的。
            <br />
            而我們，就是他們
            <span className="text-[#FBFF00]">幸福生活的後盾。</span>
          </p>
        
      </div>

      <div className="bg-[#FF8D41] min-h-screen flex items-center justify-center px-4 py-12 md:px-8">
  <a
    href="https://line.me/R/ti/p/@ribbitstore"
    target="_blank"
    rel="noopener noreferrer"
    className="text-center block hover:cursor-pointer w-full max-w-6xl no-underline"
  >
    <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10">
      <div className="flex-shrink-0">
        <img
          src={vipIcon}
          alt="VIP Member"
          className="w-64 md:w-80 lg:w-[28rem]"
        />
      </div>

      <div className="text-center space-y-6 md:space-y-8 flex-1">
        
        <div className="flex justify-center">
          <h2 className="flex flex-wrap justify-center gap-2 md:gap-3">
            {["加", "入", "會", "員", "即", "享"].map((char, i) => (
              <span
                key={i}
                className="bg-[#FFCF3E] w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 
                           text-2xl sm:text-3xl md:text-4xl lg:text-5xl 
                           flex items-center justify-center rounded-full text-white font-bold shadow-md"
              >
                {char}
              </span>
            ))}
          </h2>
        </div>
        <p className="text-white font-bold text-2xl md:text-3xl lg:text-4xl py-2">
          當日消費滿 3000 元
        </p>

        <div className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-relaxed">
          <p>
            享 <span className="text-5xl md:text-6xl lg:text-7xl text-[#F4FF1B] mx-1">85折</span> 優惠
          </p>
          <p className="mt-2">
            再送 <span className="text-5xl md:text-6xl lg:text-7xl text-[#F4FF1B] mx-1">300</span> 元
            <span className="block sm:inline"> 折價券 ✨</span>
          </p>
        </div>
      </div>
    </div>
  </a>
</div>
    </>
  );
}

export default About;
