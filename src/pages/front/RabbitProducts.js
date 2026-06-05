import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Pagination from "../../components/Pagination";
import "remixicon/fonts/remixicon.css";
import Loading from "../../components/Loading";

import cart from "../../assets/images/smallcart.svg"

function RabbitProducts() {
  const [allProducts, setAllProducts] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("全部");
  const [pagination, setPagination] = useState({});
  const [isLoading, setLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const getProducts = async (page = 1) => {
    setLoading(true);

    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );

    // 兔子專區
    const rabbitProducts = res.data.products.filter((p) =>
      p.category.includes("兔")
    );

    // 動態分類
    const dynamicCategories = [
      "全部",
      ...new Set(rabbitProducts.map((p) => p.category)),
    ];

    setAllProducts(rabbitProducts);
    setProducts(rabbitProducts);
    setCategories(dynamicCategories);
    setPagination(res.data.pagination);
    setLoading(false);
  };

  // 分類篩選
  useEffect(() => {
    if (activeCategory === "全部") {
      setProducts(allProducts);
    } else {
      const filtered = allProducts.filter((p) => p.category === activeCategory);
      setProducts(filtered);
    }
  }, [activeCategory, allProducts]);

  useEffect(() => {
    getProducts(5);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <div className=" bg-[#FFFCE0] min-h-screen  px-4 md:px-6 py-6 md:py-12">
        <Loading isLoading={isLoading} />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 md:gap-8">

          {/* 側邊攔 */}
          <div className="w-full md:w-40 flex flex-col items-center md:items-start">
            <h2 className="text-xl md:text-2xl font-bold text-red-800 mb-4 md:mb-6 border-b-2 border-red-800 pb-2 w-full text-center md:text-left">
              兔兔專區
            </h2>

            <div 
            className="flex gap-3 pb-3 md:pb-0 w-full no-scrollbar justify-start px-2 md:px-0"
            style={{ 
              flexDirection: isMobile ? 'row' : 'column',
              flexWrap: isMobile ? 'nowrap' : 'wrap',
              overflowX: isMobile ? 'auto' : 'visible'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`border-2 px-6 py-2 rounded-full font-bold transition text-sm md:text-base whitespace-nowrap
                ${
                  activeCategory === cat
                    ? "bg-red-500 text-white border-red-500"
                    : "bg-white border-red-500 text-red-700 hover:border-orange-700 hover:text-orange-700 hover:ring-2 hover:ring-orange-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 ">
            {products.map((products) => (
              <div
                key={products.id}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105 relative"
              >
                <span className="absolute top-3 left-3 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-md shadow-md">
                  <i className="ri-time-line"></i>
                  限時優惠
                </span>

                <i className="absolute top-3 right-3 ri-heart-fill text-red-500 text-xl"></i>

                {/* 商品圖片 */}
                <div className="w-full h-40 flex items-center justify-center mb-3 mt-4">
                <img
                  src={products.imageUrl}
                  alt={products.title}
                  className="max-w-full max-h-full object-contain"
                />
                </div>

                {/* 商品標題 */}
                <p className="text-sm md:text-base font-bold text-gray-700 mb-12 text-center line-clamp-2 w-full px-2 ">
                  <Link to={`/rabbit/${products.id}`}>{products.title}</Link>
                </p>
                <div className="flex justify-between items-center w-full">
                  <span className="text-[#FF8205] font-bold text-lg absolute bottom-3 left-3">
                    ${products.price}
                  </span>
                  <button className="absolute bottom-4 right-4 bg-[#FFC70E] hover:bg-[#e6b20c] transition-colors text-white rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center shadow-md">
                    <img src={cart} alt="cart" className="w-8 h-8" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center mt-8">
          <Pagination pagination={pagination} changePage={getProducts} />
        </div>
      </div>
    </>
  );
}

export default RabbitProducts;
