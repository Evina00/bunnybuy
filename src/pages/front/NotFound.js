import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3000);
  }, []);

  return (
    <div
      className=" flex-column  text-center p-5"
      style={{
        backgroundColor: '#F7EEE9',
        height: '100vh',
      }}
    >
      <Link to="/" >
        <img src='/weblogo.svg' alt="logo" />
      </Link>
      <p >Oops!</p>
      <h1 >找不到頁面</h1>
      <div>
        <Link to="/">
          立即返回首頁
        </Link>
      </div>
      <p>3秒後自動返回首頁</p>
    </div>
  );
};
export default NotFound;