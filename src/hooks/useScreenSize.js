import { useEffect, useState } from 'react';

const useScreenSize = () => {
//拿到當前視窗尺寸
  const defaultScreenSize = {
    screenWidth: window.innerWidth,
    screenHeight: window.innerHeight,
  };
  const [screenSize, setScreenSize] = useState(defaultScreenSize);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize({
        screenWidth: window.innerWidth,
        screenHeight: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize); //瀏覽器的視窗縮放事件
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
};

export default useScreenSize;