import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {changeIsAuthorize} from "../../businessLayer/actions/AuthorizeAction";
import StorageService from "../../services/StorageService";
import {useToasts} from 'react-toast-notifications';
import AccountService from "../../services/AccountService";
import {Notifications} from "../../constants/constants";

let message = '';
let pagePath = '/';

function SignInModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const accountService = new AccountService();

    const isAuthorized = useSelector((state) => state.authorization.isAuthorized);
    const dispatch = useDispatch();
    const storageService = new StorageService();

    const {addToast} = useToasts();

    function signIn(event) {
        event.preventDefault();

        accountService.checkSignInUser(userName, userPassword).then((res) => {
            if (!res) {
                setErrorMessage(Notifications.account.noSuchUser)
            } else {
                const user = {
                    id: res.id,
                    name: res.name,
                    email: res.email,
                    status: res.status,
                };

                dispatch(changeIsAuthorize(true, user));
                storageService.setUser(user);

                if (res.status === 'user') {
                    addToast(Notifications.account.signedIn, {appearance: 'success', autoDismiss: true});
                } else addToast(Notifications.account.signedInAdmin, {appearance: 'success', autoDismiss: true});
                closeModal();
            }
        });
    }

    function setPass() {
        pagePath = '/Feedbacks';
    }

    function closeModal() {
        setUserName('');
        setUserPassword('');
        setIsOpen(false);
        setErrorMessage(null);
    }

    return (
        <React.Fragment>
            <button className="btn btn-info" onClick={() => setIsOpen(true)}>Sign in</button>
            {isOpen && (<div className="modal">
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
                            onClick={() => closeModal()}>Close
                    </button>
                </div>
            </div>)}
        </React.Fragment>
    );
}

export default SignInModal;
// <Link onClick={() => setPass()} to={pagePath}>
//     <button type="submit" className="btn_contact_submit">
//         send
//         <img src="assets/icons/arrow_right_submit.svg" alt="send"/>
//     </button>
// </Link>

// <Router>
//     <React.Fragment>
//         <button className="btn btn-info" onClick={() => setIsOpen(true)}>Sign in</button>
//         {isOpen && (<div className="modal">
//             <Route exact path="/" component={Feedbacks}>
//                 <div className="modal_body">
//                     <h1 className="mb-20">Sign in</h1>
//                     <form className="contact_us_form" method="POST" onSubmit={(e) => signIn(e)}>
//                         <input
//                             className="form-control"
//                             type="text"
//                             name="contactName"
//                             maxLength="30"
//                             placeholder="Name"
//                             required={true}
//                             value={userName}
//                             onChange={(e) => (setUserName(e.target.value))}
//                         />
//                         <input
//                             className="form-control"
//                             type="password"
//                             name="password"
//                             placeholder="Password"
//                             required={true}
//                             value={userPassword}
//                             onChange={(e) => (setUserPassword(e.target.value))}
//                         />
//                         <button type="submit" className="btn_contact_submit">
//                             send
//                             <img src="assets/icons/arrow_right_submit.svg" alt="send"/>
//                         </button>
//                     </form>
//                     <p className="message">{errorMessage}</p>
//                     <button id='modalClose' className="btn btn-primary"
//                             onClick={() => closeModel()}>Close
//                     </button>
//                 </div>
//             </Route>
//             <Route exact path="/Feedbacks" component={Feedbacks}></Route>
//         </div>)}
//     </React.Fragment>
// </Router>