import React, {useState, useEffect} from 'react';
import LoginModal from '../Modal/LoginModal'
import SignInModal from '../Modal/SigninModal'
import {useSelector, useDispatch} from 'react-redux';
import StorageService from "../../services/StorageService";
import {changeIsAuthorize} from "../../businessLayer/actions/AuthorizeAction";


function Header() {
    const isAuthorized = useSelector((state) => state.authorization.isAuthorized);
    const dispatch = useDispatch();
    const storageService = new StorageService();

    function signOut() {
        storageService.removeUser();
        dispatch(changeIsAuthorize(false));
    }

    useEffect(() => {
        const loggedUser = storageService.getUser();

        if (loggedUser) {
            dispatch(changeIsAuthorize(true));
        }

    }, [])

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
                    {isAuthorized && (<><h3 className="user_name">is ssssssrized</h3>
                        <button className="btn btn-info btn-sign_out" onClick={() => signOut()}>Sign out</button>
                    </>)}
                    {!isAuthorized && <><LoginModal/>
                        <SignInModal/></>}
                </div>
            </div>
        </header>
    );
}

export default Header;
