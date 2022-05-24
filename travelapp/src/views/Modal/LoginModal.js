import React, {useState} from 'react'
import styles from './Modal.scss' // don't delete
import AccountService from "../../services/AccountService";
import {Notifications} from "../../constants/constants";
import {changeIsAuthorize} from "../../businessLayer/actions/AuthorizeAction";
import {useDispatch} from "react-redux";
import StorageService from "../../services/StorageService";
import {useToasts} from 'react-toast-notifications';


function LogInModal() {

    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userRepeatPassword, setUserRepeatPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const accountService = new AccountService();

    const dispatch = useDispatch();
    const storageService = new StorageService();

    const {addToast} = useToasts();


    function addUserToDb(event) {
        event.preventDefault();

        if(userPassword !== userRepeatPassword){
            setErrorMessage(Notifications.account.passwordsDontMatch);
            return;
        }

        const user = {
            name: userName,
            email: userEmail,
            password: userPassword,
            status: 'user'
        };

        accountService.addUser(user).then((res) => {
            if (!res) {
                setErrorMessage(Notifications.account.userAlreadyExist)
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

    function closeModal() {
        setUserName('');
        setUserEmail('');
        setUserPassword('');
        setUserRepeatPassword('');
        setIsOpen(false);
        setErrorMessage(null);
    }

    return (
        <React.Fragment>
            <button className="btn btn-info btn_login" onClick={() => setIsOpen(true)}>Login</button>
            {isOpen && (<div className="modal">
                <div className="modal_body">
                    <h1 className="mb-20">Login</h1>
                    <form className="contact_us_form" method="POST" onSubmit={(e) => addUserToDb(e)}>
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
                            type="email"
                            name="Email"
                            placeholder="Email"
                            required={true}
                            value={userEmail}
                            onChange={(e) => (setUserEmail(e.target.value))}
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
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Repeat password"
                            required={true}
                            value={userRepeatPassword}
                            onChange={(e) => (setUserRepeatPassword(e.target.value))}
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

export default LogInModal;