import { Outlet, useNavigate, Link } from "react-router-dom";
import { useEffect, useReducer,useState } from "react";
import axios from "axios";
import Message from "../../components/Message";
import {
  MessageContext,
  messageReducer,
  initState,
} from "../../store/messageStore";

function Dashboard() {
   const [isAuth, setIsAuth] = useState(false);

  const navigate = useNavigate();
  const reducer = useReducer(messageReducer, initState);
 

  // 同步取出 Token
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("hexToken="))
    ?.split("=")[1];

  const logout = () => {
    // 將 Cookie 清除
    document.cookie = `hexToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
    navigate("/login");
  };

  useEffect(() => {
    // 沒有 Token，回登入頁
    if (!token) {
      navigate("/login");
      return;
    }
  
    axios.defaults.headers.common["Authorization"] = token;

    // 後端身份驗證
    (async () => {
      try {
        await axios.post("/v2/api/user/check");
        setIsAuth(true);
      } catch (error) {
        console.error("驗證失敗:", error.response?.data);
        // 驗證失敗 ，清除 Cookie 並導回登入
        document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        navigate("/login");
      }
    })();
  }, [navigate, token]);


  

  return (
    <MessageContext.Provider value={reducer}>
      <Message />
      <nav className="navbar navbar-dark py-2 px-3 shadow-sm" style={{ backgroundColor: '#FF6E13' }}>
  <div className="container-fluid d-flex align-items-center justify-content-between">
    
    
    <p className="navbar-brand text-white mb-0 fs-6 fs-md-5 fw-bold">
      毛毛補給站 <span className="text-white-50 fw-normal mx-1">|</span> 後台管理系統
    </p>
    
    
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn btn-sm btn-light fw-bold px-3 py-1.5 shadow-sm"
        onClick={logout}
      >
        登出
      </button>
    </div>

  </div>
</nav>
      <div className="d-flex bg-orange-300" style={{ minHeight: "calc(100vh - 56px)" }}>
        <div className="bg-light" style={{ width: "200px" }}>
          <ul className="list-group list-group-flush">
            <Link
              className="list-group-item list-group-item-action py-3"
              to="/admin/products"
            >
              <i className="bi bi-cup-fill me-2" />
              產品列表
            </Link>
            <Link
              className="list-group-item list-group-item-action py-3"
              to="/admin/coupons"
            >
              <i className="bi bi-ticket-perforated-fill me-2" />
              優惠卷列表
            </Link>
            <Link
              className="list-group-item list-group-item-action py-3"
              to="/admin/orders"
            >
              <i className="bi bi-receipt me-2" />
              訂單列表
            </Link>
          </ul>
        </div>

        <div className="w-100 p-4">
          {isAuth ? (
            <Outlet />
          ) : (
            <div className="d-flex justify-content-center align-items-center h-100">
              <p className="text-secondaryf w-bold fs-5">確認權限中...</p>
            </div>
          )}
        </div>
      </div>
    </MessageContext.Provider>
  );
}

export default Dashboard;
