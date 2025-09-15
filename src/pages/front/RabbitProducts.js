import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";

function RabbitProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});

  const getProducts = async (page = 1) => {
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`
    );
    console.log(productRes);
    setProducts(productRes.data.products);
    setPagination(productRes.data.pagination);
  };

  useEffect(() => {
    getProducts(1);
  }, []);

  const categories = ["吃的", "喝的", "用的", "天天開心", "身體健康"];

  return (
    <>
      <div className=" bg-[#FFFCE0] min-h-screen  px-6 py-12">
        <div className="max-w-7xl mx-auto flex gap-8">
          <div className="w-40 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-red-800 mb-6 border-b-2 border-red-800 pb-2 mr-12">
              兔兔專區
            </h2>
            <div className="space-y-4">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  className="bg-white border-2 border-red-500 text-red-700 font-bold px-6 py-2 rounded-full hover:!bg-red-500 hover:!text-white transition duration-300"
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {products.map((products) => (
              <div
                key={products.id}
                className="bg-white rounded-2xl shadow-lg p-4 flex flex-col items-center transition-transform duration-300 hover:scale-105"
              >
                <img
                  src={products.imageUrl}
                  alt="..."
                  className="w-32 h-40 object-contain mb-3"
                />
                <p className="text-base font-bold text-gray-700 mb-2 text-center">
                  {products.title}
                </p>
                <div className="flex justify-between items-center w-full">
                  <span className="text-[#FF8205] font-bold text-lg">
                    ${products.price}
                  </span>
                  <button className="bg-[#FFC70E] text-white rounded-full w-12 h-12 flex items-center justify-center">
                    <img src="/smallcart.svg" alt="cart" className="w-8 h-8" />
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
