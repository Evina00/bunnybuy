import { useState } from "react";

const faqMap = {
  rabbitFood: {
    title: "兔子的主食是什麼？",
    content:
      "兔子的正確主食比例:牧草（乾草）約佔 80～90%，這是兔子每天都要無限量供應的食物。常見適合的牧草為提摩西草，牧草的功能有:幫助腸胃蠕動（預防腸停）、磨牙（兔子牙齒會一直長）、維持腸道菌叢健康。所以兔子不是吃紅蘿蔔喔!!",
  },
  mouseFood: {
    title: "老鼠的主食是什麼？",
    content: "老鼠通常吃穀物、種子與專用飼料，需注意避免高糖食物。",
  },
  rabbitBath: {
    title: "需要幫兔子洗澡嗎？",
    content: "一般情況下不需要，兔子會自行清潔，洗澡反而可能造成壓力。",
  },
};

function Knowledge() {
  const [active, setActive] = useState("rabbitFood");

  return (
    <>
      <div className="bg-white">
        <div className="relative w-full h-[524px] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1710578471415-573ff2e915c7?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="banner"
            className="w-full h-full object-cover brightness-125"
          />

          <h2 className="absolute bottom-8 right-8 text-white font-bold text-8xl leading-tight">
            知識
            <br />
            加油站
          </h2>
        </div>

        <section className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex gap-8">
            <div className="w-1/4 space-y-4">
              {Object.keys(faqMap).map((key) => (
                <button
                  key={key}
                  onClick={() => setActive(key)}
                  className={`
                w-full
                rounded-full
                px-4
                py-3
                text-sm
                font-bold
                transition
                ${
                  active === key
                    ? "bg-yellow-400 text-black"
                    : "bg-yellow-200 hover:bg-yellow-300"
                }
              `}
                >
                  {faqMap[key].title}
                </button>
              ))}
            </div>

            <div className="flex-1 bg-[#FFFCE0] rounded-lg p-10">
              <h2 className="text-2xl text-[#734B26] font-bold mb-4">
                {faqMap[active].title}
              </h2>
              <p className="text-gray-750 leading-relaxed">
                {faqMap[active].content}
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Knowledge;
