function RegisterForm() {
  return (
    <div className="space-y-4">
      <div>
        <label className="block mb-1">帳號</label>
        <input
          placeholder="請輸入電子郵件"
          className="w-full bg-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block mb-1">密碼</label>
        <input
          type="password"
          placeholder="請輸入密碼"
          className="w-full bg-gray-300 px-3 py-2"
        />
      </div>

      <button className="w-full bg-orange-500 text-white py-2 rounded-md text-lg font-bold">
        註冊
      </button>
    </div>
  );
}
export default RegisterForm;