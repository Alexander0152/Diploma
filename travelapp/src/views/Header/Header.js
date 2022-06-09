import React, {useState, useEffect} from 'react';
import LoginModal from '../Modal/LoginModal'
import SignInModal from '../Modal/SigninModal'
import {useSelector, useDispatch} from 'react-redux';
import StorageService from "../../services/StorageService";
import {changeIsAuthorize} from "../../businessLayer/actions/AuthorizeAction";
import {UserStatus} from "../../constants/constants";
import CountryCard from "../CountryCards/CountryCard";
import {Link} from "react-router-dom";


function Header() {
    const isAuthorized = useSelector((state) => state.authorization.isAuthorized);
    const user = useSelector((state) => state.authorization.user);
    const dispatch = useDispatch();
    const storageService = new StorageService();

    function signOut() {
        storageService.removeUser();
        dispatch(changeIsAuthorize(false));
    }

    useEffect(() => {
        const loggedUser = storageService.getUser();

        if (loggedUser) {
            dispatch(changeIsAuthorize(true, JSON.parse(loggedUser)));
        }
    }, [])

    return (
        <header className="header">
            <div className="wrapper">
                <div className="header_content">
                    <a href="/"
                    >
                        <div className="logo"/>
                    </a>
                    <ul className="navbar">
                        <Link to="/">
                            <li>About</li>
                        </Link>
                        <Link to="/">
                            <li>Countries</li>
                        </Link>
                        <Link to="/">
                            <li>Map</li>
                        </Link>
                        <li><a href="#contact_us">Contact Us</a></li>
                        {user.status === UserStatus.ADMIN && (
                            <Link to="/Feedbacks">
                                <li><a href="/Feedbacks">Feedbacks</a></li>
                            </Link>
                        )}
                    </ul>
                    {isAuthorized && (<><h3 className="user_name">{user.name}</h3>
                        <button className="btn btn-info btn-sign_out" onClick={() => signOut()}>Sign out</button>
                    </>)}
                    {!isAuthorized && <>
                        <LoginModal/>
                        <SignInModal/></>}
                </div>
            </div>
        </header>
    );
}

export default Header;
