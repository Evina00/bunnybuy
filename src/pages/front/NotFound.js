import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 將計時器存入變數
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    // 使用者提早點擊連結離開，清除此計時器以免記憶體洩漏
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="flex flex-col items-center justify-center text-center p-5 min-h-screen"
      style={{ backgroundColor: '#F7EEE9' }}
    >
    
      <Link to="/" className="mb-6 transition transform hover:scale-105 duration-200">
        <img 
          src="/weblogo.svg" 
          alt="logo" 
          className="w-36 h-auto"
        />
      </Link>

      <p className="text-2xl font-bold text-gray-500 mb-1">Oops!</p>
      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-6">
        找不到頁面
      </h1>
      
    
      <div className="mb-4">
        <Link 
          to="/" 
          className="inline-block bg-[#FF6E13] text-white px-6 py-2.5 rounded-full font-bold shadow-md hover:bg-[#e05e0f] hover:scale-105 transition duration-200"
        >
          立即返回首頁
        </Link>
      </div>
      
      
      <p className="text-gray-500 text-sm flex items-center gap-1 mt-2">
        <i className="ri-time-line animate-spin-slow"></i> 3 秒後自動返回首頁
      </p>
    </div>
  );
};

export default NotFound;