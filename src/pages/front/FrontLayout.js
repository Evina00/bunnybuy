import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState, useReducer } from "react";
import Navbar from "../../components/Navbar";
import ScrollUp from "../../components/ScrollUp";
import axios from "axios";
import { MessageContext, messageReducer, initState } from "../../store/messageStore";
import MessageModal from "../../components/Message"; 

function FrontLayout() {
  const [cartData, setCartData] = useState({});

  const [messageState, dispatch] = useReducer(messageReducer, initState);

  const getCart = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
      );
      console.log("購物車內容:", res);
      setCartData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  return (
    <>
    <MessageContext.Provider value={[messageState, dispatch]}>
      <Navbar cartData={cartData}></Navbar>
      <MessageModal />
      <Outlet context={{ getCart, cartData }}></Outlet>

      <footer className="relative overflow-hidden pt-16 pb-8">
     <img
    src="/footer.bg.svg"
    alt="波浪背景"
    className="absolute top-0 left-0 w-full h-full object-cover -z-10"
    />

    <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col items-center md:flex-row  justify-between gap-12 mt-[90px] md:mt-[150px]">
    
    <div className="flex flex-col items-center md:items-start text-white">
      <Link to="/">
        <img 
          src="/weblogo.svg" 
          alt="logo" 
          className="mb-3 w-28 h-28 md:w-36 md:h-36" 
        />
      </Link>
      <p className="font-bold text-2xl md:text-3xl tracking-wider">
        毛毛補給站
      </p>
    </div>

    <div className="text-white flex flex-col items-center md:items-start">
      <p className="font-bold mb-6 text-2xl md:text-3xl">
        會員
      </p>
      <ul className="space-y-4 text-xl md:text-2xl p-0 list-none text-center md:text-left">
        <li><Link to="/Register" className="text-white hover:opacity-80 transition font-medium no-underline">加入會員</Link></li>
        <li><Link to="/order" className="text-white hover:opacity-80 transition font-medium no-underline">訂單查詢</Link></li>
      </ul>
    </div>

    <div className="text-white flex flex-col items-center md:items-start">
      <p className="font-bold mb-6 text-2xl md:text-3xl">
        客服
      </p>
      <ul className="space-y-4 text-xl md:text-2xl p-0 list-none text-center md:text-left">
        <li><Link to="/Knowledge" className="text-white hover:opacity-80 transition font-medium no-underline">知識加油站</Link></li>
        <li><Link to="/contact" className="text-white hover:opacity-80 transition font-medium no-underline">聯絡我們</Link></li>
        {/* 新增後台連結 */}
       <li>
        <Link 
         to="/login" 
         className="text-white hover:opacity-80 transition font-medium no-underline"
        >
         <i className="ri-settings-4-line"></i> 登入後台
       </Link>
    </li>
      </ul>
    </div>

    <div className="text-white flex flex-col items-center ">
      <p className="font-bold mb-6 text-2xl md:text-3xl">
        關於我們
      </p>
      <div className="flex justify-center md:justify-start gap-4 mb-6">
        <a href="https://www.instagram.com/" className="hover:scale-110 transition">
          <img src="/instagram.png" alt="Instagram" className="w-8 h-8 md:w-10 md:h-10" />
        </a>
        <a href="https://www.facebook.com/" className="hover:scale-110 transition">
          <img src="/facebook.png" alt="Facebook" className="w-8 h-8 md:w-10 md:h-10" />
        </a>
      </div>
      <div className="text-lg md:text-xl space-y-2 font-bold text-center md:text-left">
        <p>04-222-333</p>
        <p className="break-all">rabibunny@gmail.com</p>
      </div>
      
    </div>
  </div>

  <div className="relative z-10 text-center text-gray-200 font-semibold text-sm mt-16  pt-8">
  無商業用途且僅供作品展示 | © 2026 毛毛補給站. All rights reserved.
  </div>
  </footer>

    
      
      <ScrollUp />
      </MessageContext.Provider>
    </>
  );
}

export default FrontLayout;
