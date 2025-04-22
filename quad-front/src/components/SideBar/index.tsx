import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef } from 'react';
import './style.css';

import { useLocation, useNavigate } from "react-router-dom";

const SidebarBox = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  return (
    <div className="sidebar-container">
      <div
        className={`btn-container ${pathname === '/' ? 'active' : ''}`}
        onClick={() => navigate('/')}
      >
        <div className="btn-icon">🏠</div>
        <div className="btn-text">Home</div>
      </div>
      <div
        className={`btn-container ${pathname.startsWith('/review') ? 'active' : ''}`}
        onClick={() => navigate('/review')}
      >
        <div className="btn-icon">📚</div>
        <div className="btn-text">Reviews</div>
      </div>
    </div>
  );
};

export default SidebarBox;