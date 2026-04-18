import { useEffect, useState } from "react";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { useOutletContext, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [cartQuantity, setCartQuantity] = useState(1);
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const { getCart } = useOutletContext();

  const getProduct = async (id) => {
    setLoading(true);
    const productRes = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`
    );

    console.log(productRes);
    setProduct(productRes.data.product);
    setLoading(false);
  };

  const addToCart = async () => {
    const data = {
      data: {
        product_id: product.id,
        qty: cartQuantity,
      },
    };
    setLoading(true);
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      console.log(res);
      getCart();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const categories = ["吃的", "喝的", "用的", "天天開心", "身體健康"];
  
return (
  <>
    <div className="bg-[#FFFCE0] min-h-screen px-4 md:px-6 py-8 md:py-12">
      <Loading isLoading={isLoading} />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-40 flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold text-red-800 mb-4 md:mb-6 border-b-2 border-red-800 pb-2 w-full text-center lg:text-left">
            兔兔專區
          </h2>
          <div className="flex flex-row lg:flex-col flex-wrap justify-center gap-3 lg:space-y-4 lg:gap-0 w-full">
            {categories.map((cat, i) => (
              <button
                key={i}
                className="bg-white border-2 border-red-500 text-red-700 font-bold px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-red-500 hover:text-white transition duration-300 text-sm md:text-base whitespace-nowrap"
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <main className="flex-1">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-white rounded-2xl w-full md:w-80 relative overflow-hidden aspect-square md:aspect-auto">
              <span className="absolute top-2 left-2 bg-red-500 text-white text-xs md:text-sm font-bold px-2 py-1 rounded-md shadow-md z-10">
                <i className="ri-time-line mr-1"></i>
                限時優惠
              </span>
              <img
                src={product.imageUrl}
                alt="商品圖片"
                className="object-contain w-full h-full p-4"
              />
            </div>

            <div className="bg-white rounded-2xl p-5 md:p-6 flex-1 flex flex-col">
              <h3 className="text-xl md:text-2xl font-bold mb-4">{product.title}</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-[#FF8205] text-3xl md:text-4xl font-bold">
                  ${product.price}
                </span>
                <span className="line-through text-xl md:text-2xl text-gray-400">
                  ${product.origin_price}
                </span>
              </div>
              <div className="mb-4 flex justify-end">
                <button className="hover:text-red-500 transition-colors">
                  <i className="ri-heart-add-fill text-2xl"></i>
                </button>
              </div>
              <p className="text-lg md:text-xl text-gray-600 mb-2 border-t-2 border-gray-100 pt-4">
                數量
              </p>
              <div className="mb-8 flex items-center">
                <button
                  className="bg-[#D9D9D9] hover:bg-gray-400 rounded-lg w-10 h-10 flex items-center justify-center transition-colors"
                  onClick={() => setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))}
                >
                  <i className="ri-subtract-fill"></i>
                </button>
                <input
                  type="number"
                  readOnly
                  className="w-16 h-10 text-center border-x-0 border-y mx-0 focus:outline-none"
                  value={cartQuantity}
                />
                <button
                  className="bg-[#D9D9D9] hover:bg-gray-400 rounded-lg w-10 h-10 flex items-center justify-center transition-colors"
                  onClick={() => setCartQuantity((pre) => pre + 1)}
                >
                  <i className="ri-add-line"></i>
                </button>
              </div>
              <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-white text-[#FF6E13] border border-[#FF6E13] px-2 md:px-4 py-3 rounded-md font-bold hover:bg-orange-50 transition-colors text-sm md:text-base">
                  立即購買
                  <i className="ri-fire-fill ml-1 md:ml-2"></i>
                </button>
                <button
                  className="flex-1 bg-[#FF6E13] text-white px-2 md:px-4 py-3 rounded-md font-bold hover:bg-[#e66311] transition-colors disabled:bg-gray-400 text-sm md:text-base"
                  onClick={() => addToCart()}
                  disabled={isLoading}
                >
                  加入購物車
                  <i className="ri-shopping-cart-2-line ml-1 md:ml-2"></i>
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 md:p-8 mt-8 mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 border-b-4 border-orange-400/50 pb-2">
              商品特色
            </h2>
            <div className="px-2 md:px-12 lg:px-24 mb-10">
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>{product.description}</li>
              </ul>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 border-b-4 border-orange-400/50 pb-2">
              商品詳情
            </h2>
            <div className="px-2 md:px-12 lg:px-24">
              <p className="text-base text-gray-700 whitespace-pre-wrap leading-relaxed">
                {product.content}
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  </>
);
}

export default ProductDetail;
