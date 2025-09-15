import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar";

function FrontLayout() {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <footer className="relative  overflow-hidden pt-16 py-8">
        <a href="">
          <img
            src="/footer.bg.svg"
            alt="波浪背景"
            className="absolute top-0 left-0 w-full object-cover -z-10"
          />
        </a>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-8 text-sm mt-[150px]">
          <div className="flex flex-col items-center md:items-start py-12">
            <Link to="/">
              <img src="/weblogo.svg" alt="logo" className=" mb-2 w-36 h-36" />
            </Link>
            <p className="font-bold text-white text-4xl sm:text-3xl">
              毛毛補給站
            </p>
          </div>

          <div className="text-center  text-white ">
            <p className="font-bold mb-2 text-5xl sm:text-4xl py-12">會員</p>
            <ul className="space-y-2 text-3xl sm:text-2xl">
              <li>加入會員</li>
              <li>訂單查詢</li>
              <li>會員資訊</li>
            </ul>
          </div>

          <div className=" text-center  text-white">
            <p className="font-bold mb-2 text-5xl sm:text-4xl py-12 ">客服</p>
            <ul className="space-y-2 text-3xl sm:text-2xl">
              <li>常見問題</li>
              <li>聯絡資訊</li>
            </ul>
          </div>

          <div className="text-center  text-white">
            <p className="font-bold mb-2 text-5xl sm:text-4xl py-12">
              關於我們
            </p>
            <div className="flex justify-center  gap-3 mb-2">
              <a href="">
                <img
                  src="/instagram.png"
                  alt="Instagram"
                  className="mb-2 w-12 h-12"
                />
              </a>
              <a href="">
                <img
                  src="/facebook.png"
                  alt="Facebook"
                  className="mb-2 w-12 h-12"
                />
              </a>
            </div>
            <p className="space-y-2 text-3xl sm:text-2xl ">04-222-333</p>
            <p className="space-y-2 text-3xl sm:text-2xl">
              rabibunny@gmail.com
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default FrontLayout;
