import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../../context/AuthConText";

function Order() {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [openOrderIds, setOpenOrderIds] = useState([]);

  const getOrders = async () => {
    try {
      const res = await axios.get(
        `/v2/api/${process.env.REACT_APP_API_PATH}/orders`
      );
      setOrders(res.data.orders);
      
    } catch (error) {
      console.error("取得訂單失敗", error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const userOrders = orders.filter(
    (order) => order.user?.email === user?.email
  
  );

  const toggleOrder = (id) => {
    setOpenOrderIds((prev) =>
      prev.includes(id) ? prev.filter((orderId) => orderId !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-[#FFFBE6] p-6 mt-6 font-sans">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">我的訂單</h1>

        {userOrders.length > 0 ? (
          userOrders.map((order) => {
            const isExpanded = openOrderIds.includes(order.id);
            
            return (
              <div key={order.id} className="mb-6 border border-gray-400 rounded-sm overflow-hidden bg-white shadow-sm">
                <div
                  className="bg-[#E0E0E0] px-4 py-2 flex justify-between items-center cursor-pointer border-b border-gray-400"
                  onClick={() => toggleOrder(order.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-[#FF4D4F] font-semibold text-lg">
                      {order.is_paid ? "已付款" : "未付款"}
                    </span>
                    <span className="text-gray-600 text-lg">
                      | {new Date(order.create_at * 1000).toLocaleString()}
                    </span>
                  </div>
                  <i className={`ri-arrow-down-s-line text-2xl transition-transform duration-300 ${isExpanded ? "" : "-rotate-90"}`}></i>
                </div>

                <div className={`transition-all duration-300 overflow-hidden ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
                  <div className="p-4 space-y-1 text-[#333]">
                    <p className="text-lg"># {order.id}</p>
                    <p className="text-lg">聯絡人: {order.user?.name}</p>
                    <p className="text-lg">電話: {order.user?.tel}</p>
                    <p className="text-lg">地址: {order.user?.address}</p>
                    <p className="text-lg">
                      訂單狀態 : <span className="text-[#FF4D4F]">{order.is_paid ? "已付款" : "未付款"}</span>
                    </p>

                    <hr className="border-t border-gray-800 my-4" />

                    <div className="space-y-2">
                      {Object.values(order.products).map((item) => (
                        <div key={item.id} className="flex justify-between text-lg">
                          <span>{item.product.title}</span>
                          <span>X{item.qty}</span>
                        </div>
                      ))}
                    </div>

                    <div className="text-right mt-4 border-t pt-2">
                      <span className="text-[#FF4D4F] text-xl font-bold">
                        總金額: ${Math.round(order.total)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-10 text-gray-500">尚無訂單紀錄</div>
        )}
      </div>
    </div>
  );
}

export default Order;