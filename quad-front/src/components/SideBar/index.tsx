import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef } from 'react';
import './style.css';

//          interface: props            //
interface Props{
    onMenuClick: (menu: 'home' | 'review') => void;
}

//          component: Input Box component          //
const SidebarBox = ({ onMenuClick }: Props) => {
    //          render: Input Box component         //
    return(
        <div className="sidebar-box">
            <div className="sidebar-container">
                <div className="btn-box">
                    <div className="btn-container" onClick={() => onMenuClick('home')}>
                        <div className="btn-icon">🏠</div>
                        <div className="btn-text">Home</div>
                    </div>
                </div>
                <div className="btn-box">
                    <div className="btn-container" onClick={() => onMenuClick('review')}>
                        <div className="btn-icon">📚</div>
                        <div className="btn-text">Reviews</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SidebarBox;