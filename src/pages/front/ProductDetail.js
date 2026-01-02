import { useEffect, useState } from "react";
import axios from "axios";
import "remixicon/fonts/remixicon.css";
import { useOutletContext, useParams } from "react-router-dom";
import Loading from "../../components/Loading";

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [cartQuantity, setCartQuantity] = useState(1);
  const { id } = useParams();
  const [isLoadind, setIsLoading] = useState(false);
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
    setIsLoading(true);
    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart`,
        data
      );
      console.log(res);
      getCart();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct(id);
  }, [id]);

  const categories = ["吃的", "喝的", "用的", "天天開心", "身體健康"];
  return (
    <>
      <div className=" bg-[#FFFCE0] min-h-screen  px-6  py-12">
        <Loading isLoading={isLoading} />
        <div className="max-w-7xl mx-auto flex gap-8">
          <div className="w-40 flex flex-col items-center">
            <h2 className="text-2xl font-bold text-red-800 mb-6 border-b-2 border-red-800 pb-2 ">
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

          <main className="col-span-10 ">
            <div className=" flex gap-6 ">
              <div className="bg-white rounded-2xl w-80 relative">
                <span className="absolute top-2 left-2 bg-red-500 text-white text-sm font-bold px-2 py-1 rounded-md shadow-md">
                  <i class="ri-time-line"></i>
                  限時優惠
                </span>

                <div className="object-contain max-h-full max-w-full">
                  <img
                    src={product.imageUrl}
                    alt="商品圖片"
                    className="object-contain h-full"
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl p-6 flex-1 flex flex-col justify-between">
                <h3 className="text-2xl font-bold mb-4">{product.title}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#FF8205] text-4xl font-bold">
                    {product.price}
                  </span>
                  <span className="line-through text-3xl text-gray-400">
                    {product.origin_price}
                  </span>
                </div>
                <div className=" mb-4 flex justify-end gap-2">
                  <i class="ri-heart-add-fill text-2xl"></i>
                </div>
                <p className="text-xl  text-gray-600 mb-2 flex gap-2 border-t-2 border-gray-600/60">
                  數量
                </p>
                <div className="mb-8 ">
                  <button
                    className="bg-[#D9D9D9] rounded-lg w-8 h-8 text-sm mr-4"
                    onClick={() =>
                      setCartQuantity((pre) => (pre === 1 ? pre : pre - 1))
                    }
                  >
                    <i class="ri-subtract-fill"></i>
                  </button>

                  <input
                    type="number"
                    readOnly
                    className="w-12 h-8 text-center border rounded-md mr-4"
                    value={cartQuantity}
                  />

                  <button
                    className="bg-[#D9D9D9] rounded-lg w-8 h-8 text-sm mr-4"
                    onClick={() => setCartQuantity((pre) => pre + 1)}
                  >
                    <i class="ri-add-line"></i>
                  </button>
                </div>

                <div className="flex gap-3">
                  <button className="bg-white text-[#FF6E13] border  px-4 py-2 rounded-md ">
                    立即購買
                    <i className="ri-fire-fill text-[#FF6E13] pl-2"></i>
                  </button>
                  <button
                    className="bg-[#FF6E13] text-white px-4 py-2 rounded-md "
                    onClick={() => addToCart()}
                    disabled={isLoadind}
                  >
                    加入購物車
                    <i className="ri-shopping-cart-2-line text-white pl-2"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl  p-6 mt-8 mb-8">
              <h2 className="text-3xl font-bold text-center mb-4 border-b-4 border-orange-400/50">
                商品特色
              </h2>
              <div className="mx-24 flex justify-center mb-8">
                <ul className="list-disc ">
                  <li>{product.description}</li>
                </ul>
              </div>

              <h2 className="text-3xl font-bold text-center mb-4 border-b-4 border-orange-400/50">
                商品詳情
              </h2>
              <div className="mx-24 mb-8">
                <p className="text-base text-gray-700">{product.content}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default ProductDetail;
