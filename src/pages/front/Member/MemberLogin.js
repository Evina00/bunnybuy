import { useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function MemberLogin() {
  const [mode, setMode] = useState("login");

  return (
    <section className="min-h-screen flex items-center justify-center bg-[#FFF9E6] ">
      <div className="w-full max-w-[420px] bg-white border-2  rounded-xl p-6  md:p-8 sm:m-8 mx-auto shadow-md">
        <div className="flex gap-6 mb-6 text-2xl md:text-2xl font-bold">
          <button
            onClick={() => setMode("login")}
            className={mode === "login" ? "text-red-500" : "text-gray-400"}
          >
            登入
          </button>
          <button
            onClick={() => setMode("register")}
            className={mode === "register" ? "text-red-500" : "text-gray-400"}
          >
            註冊
          </button>
        </div>

        <h3 className="text-xl font-semibold mb-6">使用/註冊您的帳號</h3>

        {mode === "login" ? <LoginForm /> : <RegisterForm />}
      </div>
    </section>
  );
}
