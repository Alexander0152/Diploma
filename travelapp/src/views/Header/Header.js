import React, {useState, useEffect} from 'react';
import LoginModal from '../Modal/LoginModal'
import SignInModal from '../Modal/SigninModal'
import {useSelector} from 'react-redux';


function Header() {
    const isAuthorized = useSelector((state) => state.authorization.isAuthorized);

    // useEffect(() => {
    //     alert(isAuthorized);
    // }, [])

    return (
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
                    {isAuthorized && (<h1>is authorized</h1>)}
                    {<><LoginModal/>
                        <SignInModal/></>}
                </div>
            </div>
        </header>
    );
}

export default Header;
