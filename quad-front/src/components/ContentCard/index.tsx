import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef } from 'react';
import './style.css';


//          interface: Input component Properties           //
interface Props{
    name: string;
    viewCount: number;
    time: string;
    content: string;

    onNameClick?: () => void;
    onBoxClick?: () => void;
}

//          component: Input Box component          //
const ContentCard = (props: Props) => {

    //          state: properties           //
    const {name, viewCount, time, content} = props;
    const {onNameClick, onBoxClick} = props;

    //          render: Input Box component         //
    return(
        <div className='contentCard' onClick={onBoxClick}>
            <div className='content-card-top'>
                <div className='content-card-name' onClick={onNameClick}>{name}</div>
                <div className='content-card-view-box'>
                    <div className='content-card-view-number'>{viewCount}</div>
                    <div className='content-card-view-text'>views</div>
                </div>
                <div className='content-card-time'>
                    <div className='content-card-time-number'>{time}</div>
                    <div className='content-card-time-text'>min</div>
                </div>
            </div>
            <div className='content-card-bot'>
                <div className='content-card-content'></div>
            </div>
        </div>
    )
};

export default ContentCard;