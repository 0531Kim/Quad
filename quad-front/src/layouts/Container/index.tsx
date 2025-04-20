import React from 'react'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { AUTH_PATH } from 'constant';
import './style.css';

//          Component: layout           //
export default function Container() {

    //          state: state of current page path name           //
    const {pathname} = useLocation();

    //          render: render layout           //
  return (
    <>
      <div className="screen-container">
        <div className="main-wrapper">
          {pathname !== AUTH_PATH() && <Header />}
          <Outlet />
        </div>
        {pathname !== AUTH_PATH() && <Footer />}
      </div>
    </>
  )
}
