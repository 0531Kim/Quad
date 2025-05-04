// NavBar.tsx
import React, { useEffect, useState, useRef } from 'react';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const navBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer');
      if (!footer || !navBarRef.current) return;

      const footerRect = footer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Check if footer is visible in viewport
      if (footerRect.top < windowHeight) {
        setIsFooterVisible(true);
        // Calculate how much of the footer is visible
        const visibleFooterHeight = windowHeight - footerRect.top;
        // Apply this as bottom padding to the navbar
        navBarRef.current.style.marginBottom = `${visibleFooterHeight}px`;
      } else {
        setIsFooterVisible(false);
        navBarRef.current.style.marginBottom = '0';
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className={`nav-bar-box ${isFooterVisible ? 'nav-bar-shrink' : ''}`} ref={navBarRef}>
      <div className='nav-bar-container'>
        <div className='nav-bar-logo-box'>
          <div className='nav-bar-logo-container'>
            <div className='nav-bar-logo'>
              <div className='icon quad-logo-green'></div>
            </div>
            <div className='nav-bar-logo-text'>QUAD</div>
          </div>
        </div>
        <div className='nav-bar-nav-box'>
          <div className='nav-bar-list-container'>
            <div className={`nav-bar-list-item ${pathname === '/' ? 'active' : ''}`}
                  onClick={() => navigate('/')}
            >
              <div className='nav-icon'>
                <i className="fa-regular fa-xl fa-house"></i>
              </div>
              <div className='nav-bar-text'>Home</div>
            </div>
            <div className={`nav-bar-list-item ${pathname.startsWith('/review') ? 'active' : ''}`}
                  onClick={() => navigate('/review')}
            >
              <div className='nav-icon'>
                <i className="fa-regular fa-xl fa-pencil"></i>
              </div>
              <div className='nav-bar-text'>Review</div>
            </div>  
          </div>
        </div>
      </div>
      <div className='nav-bar-bottom'>
        <div className='nav-bot-item'>
          <div className='nav-bot-icon'>
            <i className="fa-brands fa-xl fa-linkedin"></i>
          </div>
          <div className='nav-bot-text'>
            LinkedIn
          </div>
        </div>
        <div className='nav-bot-item'>
          <div className='nav-bot-icon'>
            <i className="fa-brands fa-xl fa-github"></i>
          </div>
          <div className='nav-bot-text'>
            GitHub
          </div>
        </div>
        <div className='nav-bot-item'>
          <div className='nav-bot-icon'>
            <i className="fa-solid fa-xl fa-envelope"></i>
          </div>
          <div className='nav-bot-text'>
            Email
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;