import { useAuth } from "../../../context/AuthConText";
import MemberLogin from "./MemberLogin";

function MemberPage() {
  const { user, logout } = useAuth();

 
  if (!user) {
    return <MemberLogin />;
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FFF9E6]">
      <div className="w-[420px] bg-white border-2 rounded-md p-8 text-center">
        <h2 className="text-2xl font-bold mb-6">
          親愛的會員 {user.email} 您好!
        </h2>

        <button
          onClick={logout}
          className="w-full bg-green-500 text-white py-2 rounded mb-3"
        >
          登出
        </button>

        <button className="w-full bg-red-500 text-white py-2 rounded">
          訂單查詢
        </button>
      </div>
    </div>
  );
}

export default MemberPage;