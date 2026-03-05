import axios from "axios";
import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";

function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [loadingItem, setLoadingItem] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponInfo, setCouponInfo] = useState({
  info: '',
  infoState: false,
})


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

  const handleClickCoupon = async () => {
    if (!couponCode) return;

    setCouponLoading(true);

    try {
      const res = await axios.post(
        `/v2/api/${process.env.REACT_APP_API_PATH}/coupon`,
        {
          data: {
            code: couponCode,
          },
        }
      );

      setCouponInfo({
        info: couponCode,
        infoState: res.data.success,
      });

      getCart(); 
    } catch (error) {
      console.log(error);
      setCouponInfo({
        info: "",
        infoState: false,
      });
    } finally {
      setCouponLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFCE0] min-h-screen">
      <div className="flex flex-col items-center">
        <h3 className="text-3xl font-bold text-[#391A1A] pb-2 mt-8">
          購物車資訊
        </h3>

        {cartData?.carts?.map((item) => (
          <div
            key={item.id}
            className="bg-[#F9E581] mx-8 my-3 w-90 flex items-start gap-4 p-4 relative rounded-sm"
          >
            <button onClick={() => removeCartItem(item.id)}>
              <i className="ri-close-line absolute top-2 right-2"></i>
            </button>

            <img
              src={item.product.imageUrl}
              alt="img"
              className="w-36 object-cover"
            />

            <div className="flex flex-col w-80 mb-4">
              <p className="font-bold text-[#391A1A]">
                {item.product.title}
              </p>

              <span className="text-sm text-gray-700 line-clamp-1">
                {item.product.content}
              </span>

              <select
                className="rounded-md mt-2 px-2 py-2 text-sm bg-white"
                value={item.qty}
                disabled={loadingItem.includes(item.id)}
                onChange={(e) =>
                  updateCartItem(item, Number(e.target.value))
                }
              >
                {[...new Array(20)].map((_, num) => (
                  <option value={num + 1} key={num}>
                    {num + 1}
                  </option>
                ))}
              </select>

              <span className="absolute bottom-2 right-2 text-red-600 font-semibold">
                NT${item.final_total}
              </span>
            </div>
          </div>
        ))}

        <div className="flex gap-2 mt-6">
          <input
            type="text"
            placeholder="輸入折價碼"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="border px-3 py-2"
          />

          <button
            onClick={handleClickCoupon}
            disabled={couponLoading}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            {couponLoading ? "套用中..." : "套用"}
          </button>
        </div>

        {couponInfo.infoState && (
          <p className="text-green-600 mt-2">
            已套用優惠券：{couponInfo.info}
          </p>
        )}

        <div className="flex justify-between items-center w-full px-6 mt-8">
          <h3 className="text-2xl font-bold text-[#391A1A]">
            總金額: NT${Math.round(cartData?.final_total || 0)}
          </h3>

          <NavLink to="/checkout">
            <button className="bg-[#FF6E13] font-bold text-white px-6 py-3 rounded-md hover:scale-105 transition">
              下一步
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Cart;
