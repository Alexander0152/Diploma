import React, {useEffect, useState} from 'react'
import Feedbacks from '../Feedbacks/Feedbacks'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeIsAuthorize} from "../../businessLayer/actions/AuthorizeAction";
import StorageService from "../../services/StorageService";
import {ToastProvider, useToasts} from 'react-toast-notifications';
import AccountService from "../../services/AccountService";
import {Errors} from "../../constants/constants";

let message = '';
let pagePath = '/';

function SignInModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const dispatch = useDispatch();
    const storageService = new StorageService();
    const [errorMessage, setErrorMessage] = useState('');

    const accountService = new AccountService();

    const {addToast} = useToasts();

    function signIn(event) {
        event.preventDefault();
        // pagePath = '/Feedbacks';

        accountService.checkSignInUser(userName, userPassword).then((res) => {
            if (!res) {
                setErrorMessage(Errors.account.noSuchUser)
            } else {
                addToast('Signed in successfully', {appearance: 'success', autoDismiss: true});
                closeModel();
            }
        });
        // storageService.setUser(user);
        // dispatch(changeIsAuthorize(true));
        // setIsOpen(false);
        //
    }

    function setPass() {
        pagePath = '/Feedbacks';
    }

    function closeModel() {
        setIsOpen(false);
        setErrorMessage(null);
    }

    // useEffect(() => {
    //     setIsOpen(isOpen)
    // }, [])

    return (
        <Router>
            <React.Fragment>
                <button className="btn btn-info" onClick={() => setIsOpen(true)}>Sign in</button>
                {isOpen && (<div className="modal">
                    <Route exact path="/" component={Feedbacks}>
                        <div className="modal_body">
                            <h1 className="mb-20">Sign in</h1>
                            <form className="contact_us_form" method="POST" onSubmit={(e) => signIn(e)}>
                                <input
                                    className="form-control"
                                    type="text"
                                    name="contactName"
                                    maxLength="30"
                                    placeholder="Name"
                                    required={true}
                                    value={userName}
                                    onChange={(e) => (setUserName(e.target.value))}
                                />
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required={true}
                                    value={userPassword}
                                    onChange={(e) => (setUserPassword(e.target.value))}
                                />
                                <button type="submit" className="btn_contact_submit">
                                    send
                                    <img src="assets/icons/arrow_right_submit.svg" alt="send"/>
                                </button>
                            </form>
                            <p className="message">{errorMessage}</p>
                            <button id='modalClose' className="btn btn-primary"
                                    onClick={() => closeModel()}>Close
                            </button>
                        </div>
                    </Route>
                    <Route exact path="/Feedbacks" component={Feedbacks}></Route>
                </div>)}
            </React.Fragment>
        </Router>
    );
}

export default SignInModal;
// <Link onClick={() => setPass()} to={pagePath}>
//     <button type="submit" className="btn_contact_submit">
//         send
//         <img src="assets/icons/arrow_right_submit.svg" alt="send"/>
//     </button>
// </Link>