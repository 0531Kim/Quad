import React, { ChangeEvent, Dispatch, KeyboardEvent, SetStateAction, forwardRef } from 'react';
import './style.css';


//          interface: Input component Properties           //
interface Props{
    label: string;
    type: 'text' | 'password';
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    error: boolean;

    buttonTitle?: string;

    icon?: 'eye-light-off-icon' | 'eye-light-on-icon' | 'expand-right-light-icon';
    onButtonClick?: () => void;
    onValidButtonClick?: () => void;

    message?: string;

    onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
}

//          component: Input Box component          //
const InputBox = forwardRef<HTMLInputElement, Props>((props: Props, ref) => {

    //          state: properties           //
    const {label, type, placeholder, value, error, icon, message, buttonTitle} = props;
    const {onChange, onButtonClick, onKeyDown, onValidButtonClick} = props;

    //          event handler: handle key event 
    const onKeyDownHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if(!onKeyDown) return;
        onKeyDown(event);
    }

    const buttonClass = value === '' ? 'input-box-button' : 'input-box-button-disable';
    const messageClass = error ? 'inputbox-message' : 'inputbox-message-ok'

    //          render: Input Box component         //
    return(
        <div className='inputbox'>
            <div className='inputbox-label'>{label}</div>
            <div className='input-outer-box'>
                <div className={error ? 'inputbox-container-error' : 'inputbox-container'}>
                    <input ref={ref} type={type} className='input' placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDownHandler}/>
                    {onButtonClick !== undefined &&
                    <div className='icon-button' onClick={onButtonClick}>
                        {icon !== undefined && <div className={`icon ${icon}`}></div>}
                    </div>
                    }
                </div>
                <div className="button-box">
                    {buttonTitle !== undefined && onValidButtonClick !== undefined && <div className={buttonClass} onClick={onValidButtonClick}>{buttonTitle}</div>}
                </div>
            </div>
            {message !== undefined && <div className={messageClass}>{message}</div>}            
        </div>
    )
});

export default InputBox;