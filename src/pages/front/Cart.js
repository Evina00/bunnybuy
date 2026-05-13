import axios from "axios";
import { useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";
import {
  MessageContext,
  handleSuccessMessage,
  handleErrorMessage,
} from "../../store/messageStore";

function Cart() {
  const { cartData, getCart } = useOutletContext();
  const [loadingItem, setLoadingItem] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [couponLoading, setCouponLoading] = useState(false);
  const [couponInfo, setCouponInfo] = useState({
  info: '',
  infoState: false,
}
)
  const messageData = useContext(MessageContext);
  const dispatch = messageData[1];


  const removeCartItem = async (id) => {
    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`
      );
      getCart();
      console.log(res);
      handleSuccessMessage(dispatch, res)
    } catch (error) {
      console.log(error);
      handleErrorMessage(dispatch, error)
    }
  };

  const removeAllCartItem = async () => {
    if (!window.confirm("確定要清空購物車內所有商品嗎？")) return;

    try {
      const res = await axios.delete(
        `/v2/api/${process.env.REACT_APP_API_PATH}/carts`
      );
      getCart();
      console.log(res);
      handleSuccessMessage(dispatch, res)
    } catch (error) {
      console.log(error);
      handleErrorMessage(dispatch, error)
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
      handleSuccessMessage(dispatch, res)
    } catch (error) {
      console.log(error);
      handleErrorMessage(dispatch, error)
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
        info: res.data.message,
        infoState: true,
      });

      getCart(); 
    } catch (error) {
      console.log(error);
      setCouponInfo({
        info: error?.response?.data?.message || "優惠券無效",
        infoState: false,
      });
    } finally {
      setCouponLoading(false);
    }
  };

  return (
    <div className="bg-[#FFFCE0] min-h-screen">
      <div className="flex flex-col items-center">
        <h3 className="text-3xl font-bold text-[#391A1A] pb-2 mt-8 inline-block border-b-[6px] border-[#F9E581] rounded-b-lg pb-1">
          購物車資訊
        </h3>

  {cartData?.carts?.length > 0 ? (
    <>
      {/* 清除全部按鈕 */}
      <div className="w-full max-w-[600px] flex justify-end px-8 mt-4">
        <button
          onClick={removeAllCartItem}
          className="text-red-500 border border-red-500 px-3 py-1 rounded-md hover:bg-red-500 hover:text-white transition flex items-center gap-1 text-sm font-bold"
        >
          <i className="ri-delete-bin-line"></i> 清除購物車
        </button>
      </div>

      {/*  購物車列表 */}
      {cartData.carts.map((item) => (
        <div
          key={item.id}
          className="bg-[#F9E581] mx-8 my-3 w-full max-w-[600px] flex items-start gap-4 p-4 relative rounded-sm shadow-sm"
        >
          <button onClick={() => removeCartItem(item.id)}>
            <i className="ri-close-line absolute top-2 right-2 text-xl"></i>
          </button>

          <img
            src={item.product.imageUrl}
            alt={item.product.title}
            className="w-32 h-32 object-cover rounded"
          />

          <div className="flex flex-col flex-1 pr-8">
            <p className="font-bold text-[#391A1A] text-lg mb-1">
              {item.product.title}
            </p>

            <span className="text-sm text-gray-700 line-clamp-1 mb-2">
              {item.product.content}
            </span>

            <select
              className="rounded-md px-2 py-1 text-sm bg-white border border-orange-200 w-20"
              value={item.qty}
              disabled={loadingItem.includes(item.id)}
              onChange={(e) => updateCartItem(item, Number(e.target.value))}
            >
              {[...new Array(20)].map((_, num) => (
                <option value={num + 1} key={num}>
                  {num + 1}
                </option>
              ))}
            </select>

            <span className="absolute bottom-4 right-4 text-red-600 font-bold text-lg">
              NT${item.final_total}
            </span>
          </div>
        </div>
      ))}
    </>
  ) : (
    /* 空狀態提示 */
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center">
      <h3 className="text-xl font-bold text-gray-700 mb-4">
        目前購物車沒有商品...快去逛逛吧！！
      </h3>
      <NavLink to="/">
        <button className="bg-[#FF6E13] font-bold text-white px-8 py-3 rounded-full hover:scale-105 transition shadow-lg">
          回首頁逛逛
        </button>
      </NavLink>
    </div>
  )}
     
        
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

        {couponInfo.info && (
          <p className={`mt-2 font-medium ${couponInfo.infoState ? "text-green-600" : "text-red-600"}`}>
            {couponInfo.info}
          </p>
        )}

        <div className="flex justify-center items-center w-full px-6 mt-8 gap-12">
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
