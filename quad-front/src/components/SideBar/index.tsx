import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef } from 'react';
import './style.css';

//          component: Input Box component          //
const SidebarBox = () => {


    //          render: Input Box component         //
    return(
        <div className="sidebar-box">
            <div className="sidebar-container">
                <div className="btn-box">
                    <div className="btn-container">
                        <div className="btn-icon">🏠</div>
                        <div className="btn-text">Home</div>
                    </div>
                </div>
                <div className="btn-box">
                    <div className="btn-container">
                        <div className="btn-icon">📚</div>
                        <div className="btn-text">Reviews</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default SidebarBox;