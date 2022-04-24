import React, {useState, useEffect} from 'react';
import LoginModal from '../Modal/LoginModal'
import SignInModal from '../Modal/SigninModal'
import {store} from '../../businessLayer/store';
import {Provider} from 'react-redux';


function Header() {

    return (
        <Provider store={store}>
            <header className="header">
                <div className="wrapper">
                    <div className="header_content">
                        <a href="index.html">
                            <div className="logo"/>
                        </a>
                        <ul className="navbar">
                            <li className="header_active"><a href="#"></a></li>
                            <li className="header_active"><a href="#">About</a></li>
                            <li><a href="/">Countries</a></li>
                            <li><a href="/">Map</a></li>
                            <li><a href="#contact_us">Contact Us</a></li>
                        </ul>
                        <LoginModal/>
                        <SignInModal/>
                    </div>
                </div>
            </header>
        </Provider>
    );
}

export default Header;
