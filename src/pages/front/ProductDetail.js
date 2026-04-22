import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { Link } from "react-router-dom";
import { useOutletContext, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  const { id } = useParams();
  const [isLoading, setLoading] = useState(false);
  const { getCart } = useOutletContext();

  const getRelatedProducts = useCallback(async (category) => {
  try {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/products/all`
    );
    const filtered = res.data.products
      .filter((item) => item.category === category && item.id !== id)
      .slice(0, 4);
    setProducts(filtered);
  } catch (error) {
    console.log(error);
  }
}, [id]);

const getProduct = useCallback(async (productId) => {
  setLoading(true);
  try {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/product/${productId}`
    );
    setProduct(res.data.product);
    getRelatedProducts(res.data.product.category);
  } catch (error) {
    console.log(error);
  }
  setLoading(false);
}, [getRelatedProducts]);

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
  window.scrollTo(0, 0);
}, [id, getProduct])

 
 
  
return (
  <>
    <div className="bg-[#FFFCE0] min-h-screen px-4 md:px-6 py-8 md:py-12">
      <Loading isLoading={isLoading} />
      <div className="max-w-7xl mx-auto flex flex-col  gap-8">
        <div className="w-full  flex flex-col items-center">
          <h2 className="text-xl md:text-2xl font-bold text-red-800 mb-4 md:mb-6 border-b-2 border-red-800 pb-2 w-full text-center">
         <Link to="/rabbit" className="no-underline hover:text-red-800">
         全部 /
        </Link>
       <span> {product.category}</span>
       </h2>
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
          <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
                其他 <span className="text-red-800">{product.category}</span> 的商品
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {products.map((item) => (
                  <Link 
                    to={`/product/${item.id}`} 
                    key={item.id} 
                    className="group relative p-[2px] rounded-xl transition-all duration-300 hover:scale-105 hover:bg-gradient-to-br hover:from-orange-200 hover:to-orange-300 shadow-sm hover:shadow-md flex flex-col"
                  >
                  <div className="bg-yellow-200 rounded-[10px] overflow-hidden flex flex-col flex-1">
                    <div className="aspect-square overflow-hidden bg-gray-50">
                      <img 
                        src={item.imageUrl} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110 "
                      />
                    </div>
                    <div className="p-3 flex flex-col flex-1">
                      <h4 className="text-sm font-medium text-gray-700 line-clamp-2 mb-2 flex-1">
                        {item.title}
                      </h4>
                      <div className="text-orange-600 font-bold">
                        特價 ${item.price}
                      </div>
                    </div>
                    </div>
                    <button
                  className="text-red-500 no-underline px-2 md:px-4 py-3 rounded-md font-bold  text-sm md:text-base transition-transform duration-300 hover:scale-110 "
                  onClick={(e) => {
                    e.preventDefault();
                    addToCart(item.id);
                  }}
                  disabled={isLoading}
                >
                  加入購物車
                  <i className="ri-shopping-cart-2-line ml-1 md:ml-2"></i>
                </button>
                  </Link>
                ))}
                
              </div>
            </div>
        </main>
      </div>
    </div>
  </>
);
}

export default ProductDetail;
