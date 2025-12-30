import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [loadingItem, setLoadingItem] = useState([]);

  const removeCartItem = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      getCart();
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const updateCartItem = async (item, quantity) => {
    const data = {
      data: {
        product_id: item.product_id,
        qty: quantity,
      },
    };
    setLoadingItem([...loadingItem, item.id]);
    try {
      const res = await axios.put(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`,
        data
      );
      getCart();
      console.log(res);
      setLoadingItem(
        loadingItem.filter((loadingObject) => loadingObject !== item.id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-[#FFFCE0] min-h-screen">
        <div className="flex flex-col items-center">
          <h3 className="text-3xl font-bold text-[#391A1A]  pb-2  mt-8">
            購物車資訊
          </h3>
          <div className="flex flex-col gap-2 items-center ">
            {cartData?.carts?.map((item) => {
              return (
                <div
                  className="bg-[#F9E581] mx-8 my-3 w-90 flex items-start gap-4 p-4 relative rounded-sm"
                  key={item.id}
                >
                  <button type="button" onClick={() => removeCartItem(item.id)}>
                    <i className="ri-close-line absolute top-2 right-2"></i>
                  </button>
                  <img
                    src={item.product.imageUrl}
                    alt="img"
                    className="w-36  object-cover"
                  />

                  <div className="flex flex-col w-80 mb-4">
                    <p className="font-bold text-[#391A1A] ">
                      {item.product.title}
                    </p>

                    <span className="text-sm text-gray-700 line-clamp-1">
                      {item.product.content}
                    </span>

                    <div className="relative">
                      <select
                        className=" rounded-md mt-2 px-2 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-orange-300"
                        value={item.qty}
                        disabled={loadingItem.includes(item.id)}
                        onChange={(e) => {
                          updateCartItem(item, e.target.value * 1);
                        }}
                      >
                        {[...new Array(20)].map((_, num) => (
                          <option value={num + 1} key={num}>
                            {num + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <span className="absolute bottom-2 right-2 text-red-600 font-semibold">
                      NT${item.final_total}
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="flex flex-row justify-between items-center w-full px-6">
              <h3 className="text-2xl font-bold text-[#391A1A]">
                總金額: NT${cartData.final_total}
              </h3>

              <NavLink to="/checkout">
                <button
                  href="./checkout.html"
                  className="bg-[#FF6E13] no-underline font-bold text-white border px-4 py-4 mb-8 rounded-md transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-sky-300"
                >
                  下一步
                </button>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cart;
