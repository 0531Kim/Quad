import React from 'react'
import './style.css';

//          component: Footer layout            //
export default function Footer() {

    //          event handler: handle insta icon btn click event            //
    const onInstaIconButtonClickHandler = () => {
        window.open('https://www.instagram.com');
    }

    //          event handler: handle naver blog icon btn click event            //
    const onNaverblogIconButtonClickHandler = () => {
        window.open('https://www.blog.naver.com');
    }
    //          render: Footer layout rendering         //
    return (
    <div id = 'footer'>
        <div className ='footer-container'>
            <div className ='footer-top'>
                <div className ='footer-logo-box'>
                    <div className = 'icon-box'>
                        <div className='icon quad-logo-white'></div>
                    </div>
                    <div className='footer-logo-text'>{'QUAD'}</div>
                </div>
                <div className ='footer-link-box'>
                    <div className='footer-email-link'>{'email@email.com'}</div>
                    <div className='icon-button' onClick={onInstaIconButtonClickHandler}>
                        <div className='icon insta-icon'></div>
                    </div>
                    <div className='icon-button' onClick={onNaverblogIconButtonClickHandler}>
                        <div className='icon naver-blog-icon'></div>
                    </div>
                </div>
            </div>
            <div className = 'footer-bottom'>
                <div className ='footer-copy-right'>{'Copyright 2024 KihyunKim. All Rights Reserved.'}</div>
            </div>
        </div>
    </div>
  )
}
