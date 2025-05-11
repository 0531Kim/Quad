import React, { useEffect, useRef } from 'react'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import { Outlet, useLocation, matchPath } from 'react-router-dom'
import { AUTH_PATH, OAUTH_PATH } from 'constant';
import './style.css';
import NavBar from 'components/NavBar';
import MainTop from 'components/MainTop';
import MainRight from 'components/MainRight';

//          Component: layout           //
export default function Container() {

    //          state: state of current page path name           //
    const {pathname} = useLocation();
    const navBarRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLElement>(null); // Footer is an HTML element

    const isOAuthPath = matchPath(
      { path: OAUTH_PATH(), end: false }, // match path pattern
      pathname
    );
    
    const isAuthPath = pathname === AUTH_PATH();

    useEffect(() => {
    const handleScroll = () => {
      if (!navBarRef.current || !footerRef.current) return;

      const navBar = navBarRef.current;
      const footer = footerRef.current;

      const navHeight = navBar.offsetHeight;
      const footerTop = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      if (footerTop < navHeight) {
        navBar.style.bottom = `${navHeight - footerTop}px`;
      } else {
        navBar.style.bottom = '0';
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
    }, []);


    //          render: render layout           //
  return (
    <>
      <div className="screen-container">
        <div className="main-wrapper">
          {!isAuthPath && !isOAuthPath && <div ref={navBarRef}><NavBar /></div>}  
          <div className={`main-box ${isAuthPath || isOAuthPath ? 'auth' : ''}`}>
            {!isAuthPath && !isOAuthPath && <Header />}  
            {!isAuthPath && !isOAuthPath && <MainTop />}
            <div className='main-content-area'>
              <Outlet />
              <MainRight />
            </div>
          </div>
        </div>
        <footer ref={footerRef}>
          {!isAuthPath && !isOAuthPath && <Footer />}
        </footer>
      </div>
    </>
  )
}
