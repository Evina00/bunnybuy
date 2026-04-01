import React, { useState, useEffect } from 'react';

function ScrollUp () {

    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const styles = {
    button: {
      position: 'fixed',
      bottom: '40px',
      right: '40px',
      width: '48px',
      height: '48px',
      backgroundColor: '#f5c542',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
      display: isVisible ? 'flex' : 'none',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
      zIndex: 9999,
      transition: 'transform 0.4s ease, background-color 0.2s ease',
    },
    icon: {
      fontSize: '24px', 
    }
  };


    return (
    <button
      onClick={scrollToTop}
      style={styles.button}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#e6b83c';
        e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#f5c542';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
      aria-label="Back to top"
    >
      <i className="ri-arrow-up-fill" style={styles.icon}></i>
    </button>
    )

}

export default ScrollUp;