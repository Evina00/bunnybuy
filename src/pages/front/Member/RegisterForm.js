import { useState } from "react";
import { useForm } from "react-hook-form";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../data/Firebase/firebase";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    setMessage("");

    try {
      await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      setIsSuccess(true);
      setMessage("註冊成功，請直接登入!!");
    } catch (error) {
      console.error(error);

      switch (error.code) {
        case "auth/email-already-in-use":
          setMessage("此 Email 已被註冊");
          break;
        case "auth/invalid-email":
          setMessage("Email 格式錯誤");
          break;
        case "auth/weak-password":
          setMessage("密碼至少 6 碼");
          break;
        default:
          setMessage("註冊失敗，請稍後再試");
      }

      setIsSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Email"
          className="w-full border px-3 py-2 rounded"
          {...register("email", {
            required: "請輸入 Email",
            pattern: {
              value: /^\S+@\S+$/i,
              message: "Email 格式不正確",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <input
          type="password"
          placeholder="密碼（至少 6 碼）"
          className="w-full border px-3 py-2 rounded"
          {...register("password", {
            required: "請輸入密碼",
            minLength: {
              value: 6,
              message: "密碼至少 6 碼",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {message && (
        <p
          className={`text-sm ${
            isSuccess ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-orange-500 text-white py-2 rounded hover:opacity-90 disabled:opacity-50"
      >
        {loading ? "註冊中..." : "註冊"}
      </button>
    </form>
  );
}
