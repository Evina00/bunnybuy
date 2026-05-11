import { useEffect, useState, useContext} from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { useOutletContext, Link } from "react-router-dom";
import Carousel from "./Carousel";
import 'swiper/css';
import 'swiper/css/navigation';
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/messageStore";

function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const { getCart } = useOutletContext();

  const messageData = useContext(MessageContext);
  const dispatch = messageData[1];


  const getProducts = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
      );
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const addToCart = async (productId, qty = 1) => {
    const data = {
      data: {
        product_id: productId,
        qty: qty,
      },
    };
    setLoading(true);
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      getCart();
      handleSuccessMessage(dispatch, res);
      setLoading(false);
      
    } catch (error) {
      setLoading(false);
      handleErrorMessage(dispatch, error);
    }
  };

  
  const rabbitItems = products.filter(item => item.category?.includes('兔子'));
  const ratItems = products.filter(item => item.category?.includes('鼠'));

  
  const getSwiperConfig = (items) => ({ 
  modules: [Autoplay, Navigation],
  spaceBetween: 20,
  slidesPerView: 2,
  loop: items && items.length >= 5, 
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  navigation: true,
  breakpoints: {
    640: { slidesPerView: 3 },
    1024: { slidesPerView: 5 },
  },
  className: "mySwiper !pb-12"
});

if (isLoading) {
  return (
    <div className="min-h-screen flex justify-center items-center bg-[#FFFCE0]">
      <div className="text-[#C85A00] text-2xl font-bold animate-pulse">
        載入中...
      </div>
    </div>
  );
}

  return (
    <>
      <Carousel />

   
      <section className="relative bg-[#FFF3A7] text-center py-12 px-4 overflow-hidden" id="rabbit">
        <h2 className="text-2xl sm:text-4xl text-[#C85A00] font-bold flex justify-center items-center gap-2 mb-2">
          兔兔系列
          <img src="/rabbit.png" alt="兔兔" className="w-12 h-12" />
        </h2>
        <div className="h-1 w-48 bg-[#C85A00] mx-auto mb-10"></div>

        <div className="max-w-[1400px] mx-auto px-4 relative z-10">
          <Swiper {...getSwiperConfig(rabbitItems)}>
            {rabbitItems.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} addToCart={addToCart} isLoading={isLoading}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex justify-end max-w-[1400px] mx-auto mt-4 px-10 relative z-20">
           <button className="bg-[#FFFF00] text-[#391A1A] font-bold py-2 px-6 rounded-full flex items-center gap-2 hover:bg-white shadow-md">
              立即選購 <i className="ri-arrow-right-line"></i>
           </button>
        </div>
        
      </section>

    
      <section className="relative text-center py-12 px-4 overflow-hidden bg-[#FFD56A]" id="rat">
        <h2 className="text-2xl sm:text-4xl text-[#C85A00] font-bold flex justify-center items-center gap-2 mb-2">
          鼠鼠系列
          <img src="/rat1.png" alt="鼠鼠" className="w-12 h-12" />
        </h2>
        <div className="h-1 w-48 bg-[#C85A00] mx-auto mb-10"></div>

        <div className="max-w-[1400px] mx-auto px-4 relative z-10">
          <Swiper {...getSwiperConfig(ratItems)}>
            {ratItems.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductCard product={product} addToCart={addToCart} isLoading={isLoading}/>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="flex justify-end max-w-[1400px] mx-auto mt-4 px-10 relative z-20">
           <button className="bg-[#FFFF00] text-[#391A1A] font-bold py-2 px-6 rounded-full flex items-center gap-2 hover:bg-white shadow-md">
              立即選購 <i className="ri-arrow-right-line"></i>
           </button>
        </div>

      </section>

      <section className="relative bg-[#FF7112] min-h-screen flex justify-center items-center py-20 px-4 sm:px-6 overflow-hidden">
     <div className="bg-white max-w-5xl w-full px-6 py-12 sm:px-10 sm:py-16 rounded-[30px] text-center relative z-10 shadow-sm">
  
     <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#FF7112] leading-tight mb-8">
      加入 <span className="text-[#FF7112]">LINE 好友</span>
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

function ProductCard({ product, addToCart, isLoading }) {
  const getProductPath = () => {
    if (product.category?.includes('兔子')) {
      return `/rabbit/${product.id}`;
    }
    if (product.category?.includes('鼠')) {
      return `/rat/${product.id}`;
    }
  };

  return (
    <Link to={getProductPath()}>
    <div className="bg-white rounded-xl overflow-hidden shadow-lg border-2 border-transparent hover:border-[#FFA93C] transition-all duration-300 group h-full flex flex-col">
      <div className="p-4 bg-white h-48 flex items-center justify-center">
        <img
          src={product.imageUrl} 
          alt={product.title}
          className="max-h-full object-contain group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="bg-[#FF9F46] p-4 text-left text-white flex-grow">
        <h3 className="font-bold text-lg truncate">{product.title}</h3>
        <p className="text-sm text-[#FFF47C] opacity-90 line-clamp-2">{product.content}</p>
        <p className="text-xl font-bold mt-2">${product.price}</p>
        <button className="w-full bg-white text-[#FF3838] font-bold py-2 rounded-full mt-3 hover:bg-[#FFFCE0] transition-colors shadow-sm"
        onClick={(e) => {
                    e.preventDefault();
                    addToCart(product.id, 1)
                  }}
                  disabled={isLoading}
                >
          {isLoading ? '處理中...' : '+加入購物車'}
        </button>
      </div>
    </div>
    </Link>
  );
}

export default Home;
