import React, {useEffect, useState} from 'react'
import Feedbacks from '../Feedbacks/Feedbacks'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {useDispatch} from "react-redux";
import {changeIsAuthorize} from "../../businessLayer/actions/AuthorizeAction";

let message = '';
let pagePath = '/';

function SignInModal() {
    const [isOpen, setIsOpen] = useState(false);
    const dispatch = useDispatch();

    function signIn(event) {
        alert('worked');
        event.preventDefault();
        // pagePath = '/Feedbacks';

        dispatch(changeIsAuthorize(true));
        alert('worked');
    }

    function setPass() {
        pagePath = '/Feedbacks';
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
                                    placeholder="Name"
                                    required="true"
                                />
                                <input
                                    className="form-control"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required="true"
                                />
                                <button type="submit" className="btn_contact_submit">
                                    send
                                    <img src="assets/icons/arrow_right_submit.svg" alt="send"/>
                                </button>
                            </form>
                            <p className="message">{message}</p>
                            <button id='modalClose' className="btn btn-primary"
                                    onClick={() => setIsOpen(false)}>Close
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