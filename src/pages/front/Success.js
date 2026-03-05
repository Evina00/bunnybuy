import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Success() {
  const { orderId } = useParams();
  const [orderData, setOrderData] = useState({});

  const getCart = async (orderId) => {
    const res = await axios.get(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order/${orderId}`
    );
    console.log(res);
    setOrderData(res.data.order);
  };

  useEffect(() => {
    getCart(orderId);
  }, [orderId]);

  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <div className="bg-[#FFFCE0] min-h-screen py-16">
        <div className="max-w-6xl mx-auto flex gap-8">
          <div className="flex-1  p-8 ">
            <h2
              className="text-3xl text-[#391A1A]
              font-bold mb-6"
            >
              <i className="ri-checkbox-circle-line text-red-600 mr-2"></i>
              訂單結帳成功
            </h2>
            <p>
              親愛的顧客，您訂購的商品將進入出貨流程中，如果有任何訂單問題，歡迎致電客服，
              <br />
              專人為您服務，謝謝
            </p>

            <div className="mb-10">
              <p>客服: 0825-562-887</p>
              <p>服務時間: 周一至周日，08:00-17:00</p>
              <p>5秒內將您導至首頁</p>
            </div>

            <button
              onClick={() => navigate("/")}
              className="w-25 bg-[#FF6E13] text-white py-2 text-2xl rounded-md font-bold hover:opacity-90 transition"
            >
              回首頁
            </button>
          </div>

          <div className="w-80 border-2 border-[#7A3E1D] p-6 rounded-md bg-[#FFFCE0]">
            <h2
              className="text-xl font-bold
              text-[#391A1A] mb-4"
            >
              選購商品細節
            </h2>
            {Object.values(orderData?.products || {}).map((item) => {
              return (
                <div className="flex items-center gap-3 mb-6 " key={item.id}>
                  <img
                    src={item.product.imageUrl}
                    alt="img"
                    className="w-14 h-14 object-contain"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold">{item.product.title}</p>
                    <p className="text-sm text-right">X{item.qty}</p>
                    <p className="text-sm text-right">NT${item.total}</p>
                  </div>
                </div>
              );
            })}

            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>總金額：</span>
              <span className="text-red-600">NT${Math.round(orderData?.total)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Success;
