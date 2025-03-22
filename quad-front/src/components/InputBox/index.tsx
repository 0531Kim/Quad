import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef } from 'react';
import './style.css';


//          interface: Input component Properties           //
interface Props{
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    notification: boolean;

    buttonTitle?: string;

    icon?: 'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon';
    onIconButtonClick?: () => void;
    onValidButtonClick?: () => void;

    blueBox?: boolean;
    notificationMessage?: string;

    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;

    readOnly?: boolean;
}

//          component: Input Box component          //
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

    //          state: properties           //
    const {label, type, placeholder, value, notification, icon, notificationMessage, buttonTitle, blueBox, readOnly} = props;
    const {onChange, onIconButtonClick, onKeyDown, onValidButtonClick} = props;

    //          event handler: handle key event 
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(!onKeyDown) return;
        onKeyDown(event);
    }

    const buttonClass = value === '' ? 'input-box-button-disable' : 'input-box-button';
    const messageClass = (blueBox ? 'inputbox-blueMessage' : 'inputbox-redMessage')

    //          render: Input Box component         //
    return(
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className='input-outer-box'>
                <div className={notification ? (blueBox ? 'inputbox-container-blue-underbar' : 'inputbox-container-red-underbar') : 'inputbox-container'}>
                    <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler} readOnly={readOnly}/>
                    {onIconButtonClick !== undefined &&
                    <div className='icon-button' onClick={onIconButtonClick}>
                        {icon !== undefined && <div className={`icon ${icon}`}></div>}
                    </div>
                    }
                </div>
                <div className="button-box">
                    {buttonTitle !== undefined && onValidButtonClick !== undefined && <div className={buttonClass} onClick={onValidButtonClick}>{buttonTitle}</div>}
                </div>
            </div>
            {notification === true && <div className={messageClass} >{notificationMessage}</div>}            
        </div>
    )
});

export default InputBox;