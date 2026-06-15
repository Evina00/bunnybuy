import { useOutletContext, useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Input } from "../../components/FormElements";
import axios from "axios";

function Checkout() {
  const { cartData } = useOutletContext();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { name, email, tel, address } = data;
    const form = {
      data: {
        user: {
          name,
          email,
          tel,
          address,
        },
      },
    };
    const res = await axios.post(
      `/v2/api/${process.env.REACT_APP_API_PATH}/order`,
      form
    );
    console.log(res);
    navigate(`/success/${res.data.orderId}`);
  };

  return (
    <>
      <div className="bg-[#FFFCE0] min-h-screen py-8 md:py-16 px-4 md:px-6">
        <div className="w-full max-w-6xl mx-auto !flex !flex-col-reverse md:!flex-row gap-8 !items-start">

          {/* 左側：宅配資料表單 */}
          <div className="w-full md:flex-1 bg-[#FCEB84] p-6 md:p-8  rounded-xl shadow-sm border">
            <h2
            className="text-2xl text-[#391A1A]
            font-bold mb-6"
            >
              宅配資料
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Input
                  id="email"
                  labelText="Email"
                  type="email"
                  aria-describedby="emailHelp"
                  placeholder="example@gmail.com"
                  register={register}
                  errors={errors}
                  className="w-full h-10 px-3 rounded-sm outline-none"
                  icon="ri-mail-fill"
                  rules={{
                    required: "Email 為必填",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Email 格式不正確",
                    },
                  }}
                />
              </div>

              <div>
                <Input
                  id="name"
                  type="text"
                  labelText="使用者名稱"
                  placeholder="請輸入使用者名稱"
                  errors={errors}
                  register={register}
                  icon="ri-user-fill"
                  rules={{
                    required: "使用者名稱為必填",
                    maxLength: {
                     required: "使用者名稱為必填",
                     maxLength: { value: 10, message: "使用者名稱長度不超過10" },
                    },
                  }}
                  className="w-full h-10 px-3 rounded-sm outline-none"
                />
              </div>

              <div>
                <Input
                  id="tel"
                  labelText="電話"
                  type="tel"
                  errors={errors}
                  register={register}
                  className="w-full h-10 px-3 rounded-sm outline-none"
                  placeholder="0933-123-123"
                  icon="ri-phone-fill"
                  rules={{
                    required: "電話為必填",
                    minLength: {
                      value: 6,
                      message: "電話不少於 6 碼",
                    },
                    maxLength: {
                      value: 12,
                      message: "電話不超過 12 碼",
                    },
                  }}
                />
              </div>

              <div>
                <Input
                  id="address"
                  labelText="地址"
                  type="address"
                  placeholder="請輸入宅配地址"
                  errors={errors}
                  register={register}
                  icon="ri-home-9-fill"
                  rules={{
                    required: "地址為必填",
                  }}
                  className="w-full h-10 px-3 rounded-sm outline-none "
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#FF6E13] text-white py-2 rounded-md font-bold hover:opacity-90 transition"
              >
                送出訂單
              </button>
            </form>
          </div>

         {/* 選購商品 */}
          <div className="w-full md:w-80 h-fit border-2 border-[#7A3E1D] p-6  rounded-xl bg-[#FFFCE0] shadow-sm">
            <h2
            className="text-xl font-bold
            text-[#391A1A] mb-4"
            >
              選購商品
            </h2>

            {cartData?.carts?.map((item) => {
              return (
                <div className="flex items-center gap-3 mb-6" key={item.id}>
                  <img
                    src={item.product.imageUrl}
                    alt="商品圖片"
                    className="w-14 h-14 object-contain"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-bold">{item.product.title}</p>
                    <p className="text-sm text-right">X{item.qty}</p>
                    <p className="text-sm text-right">NT${item.final_total}</p>
                  </div>
                </div>
              );
            })}

            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>總金額：</span>
              <span className="text-red-600">NT${Math.round(cartData?.final_total)}</span>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto flex justify-start items-center mt-6 md:mt-10 ">
          <Link className="text-dark mt-md-0 mt-3 no-underline" to="/cart">
            <button className="flex items-center gap-2 text-lg font-bold transform transition duration-300 ease-in-out hover:scale-110">
              <i className="ri-arrow-left-circle-line"></i> 繼續選購
            </button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default Checkout;
