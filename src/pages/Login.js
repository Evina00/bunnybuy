import { useState } from "react";
import { useForm } from 'react-hook-form';
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import useScreenSize from '../hooks/useScreenSize';

function Login() {
  const navigate = useNavigate();
  const [loginErrorMessage, setLoginErrorMessage] = useState(""); // 儲存登入失敗訊息
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { screenWidth } = useScreenSize();
  const isMobile = screenWidth < 1440; 

  // 使用 React Hook Form 的處理方式
  const onSubmit = async (data) => {
    try {
      const res = await axios.post("/v2/admin/signin", data);
      const { token, expired } = res.data;
      
      // 儲存 Token 到 Cookie
      document.cookie = `hexToken=${token}; expires=${new Date(expired)}; `;
      
      if (res.data.success) {
        navigate("/admin/products");
      }
    } catch (error) {
      setLoginErrorMessage(error.response?.data?.message || "登入失敗");
    }
  };

 return (
  <div className="bg-warning-subtle container-fluid min-vh-100 d-flex align-items-center justify-content-center ">
    {/* 寬度警告提示 */}
    {isMobile && (
      <div className="tipBox position-absolute top-0 w-100 text-center py-2 bg-warning">
        <span className="material-icons-outlined align-content-center me-2 fs-4">!!</span>
        建議使用裝置解析度寬 1440px 以上
      </div>
    )}

    {/* 登入卡片主體 */}
    <div className="row shadow-lg rounded-4 overflow-hidden bg-white w-100" style={{ maxWidth: '1000px' }}>
      
      <div className="col-md-6 d-flex flex-column align-items-center justify-content-center py-5 bg-white">
        <img 
          src="/weblogo.svg" 
          alt="logo" 
          style={{ width: '120px', height: 'auto' }}
          className="mb-3"
        />
        <h2 className="text-primary fw-bold">毛毛補給站</h2>
        <h4 className="text-secondary">後台管理系統</h4>
      </div>
      
      <div className="col-md-6 p-5 login-side position-relative text-white">
        <div className="login-overlay"></div>

        <div className="position-relative z-1">
          <h3 className="mb-4 fw-bold">Login</h3>
          
          {loginErrorMessage && (
            <div className="alert alert-danger py-2 border-0 shadow-sm">{loginErrorMessage}</div>
          )}

          <form className="loginForm" onSubmit={handleSubmit(onSubmit)}>
            {/* Email 欄位 */}
            <div className="form-floating mb-3">
              <input
                className={`form-control ${errors.username && 'is-invalid'}`}
                id="username"
                type="email"
                placeholder="name@example.com"
                {...register('username', {
                  required: '請填寫 Email',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Email 格式錯誤',
                  },
                })}
              />
              <label htmlFor="username" className="text-dark">Email address</label>
              {errors.username && (
                <div className="invalid-feedback fw-bold">{errors.username.message}</div>
              )}
            </div>

            {/* 密碼欄位 */}
            <div className="form-floating mb-3">
              <input
                className={`form-control ${errors.password && 'is-invalid'}`}
                id="password"
                type="password"
                placeholder="Password"
                {...register('password', {
                  required: '請填寫密碼',
                  minLength: { value: 6, message: '密碼至少 6 碼' },
                })}
              />
              <label htmlFor="password" className="text-dark">Password</label>
              {errors.password && (
                <div className="invalid-feedback fw-bold">{errors.password.message}</div>
              )}
            </div>

            <button type="submit" className="btn btn-lg btn-primary w-100 py-3 mt-2 shadow-sm fw-bold">
              登入系統
            </button>
          </form>

          <div className="mt-4 text-center">
            <Link to="/" className="text-primary text-decoration-none ">
              返回首頁
            </Link>
          </div>
          
          <div className="mt-5 text-primary small opacity-75 text-center">
            無商業用途且僅供作品展示<br />
            © 2026 毛毛補給站. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
);
  
}

export default Login;
