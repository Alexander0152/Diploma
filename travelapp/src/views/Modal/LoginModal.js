import React, {useState} from 'react'
import styles from './Modal.scss' // don't delete
import AccountService from "../../services/accountService";


function LogInModal() {

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');

    const user = {
        name: '',
        email: '',
        password: '',
        status: ''
    };

    const accountService = new AccountService();


    function addUserToDb(event) {
        event.preventDefault();
        accountService.addUser(this.user);
        // try {
        //     let data = {
        //         Name: this.name,
        //         Email: this.email,
        //         Password: this.password,
        //         Status: this.status
        //     };
        //     fetch('api/users/AddUser', {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify(data)
        //     })
        //
        // } catch (e) {
        //     this.setState({
        //         message: 'Such user already exist!',
        //     })
        // }
        // this.setState({
        //     message: 'You loged in successfully!',
        // })
    }

    return (
        <React.Fragment>
            <button className="btn btn-info btn_login" onClick={() => setIsOpen(true)}>Login</button>
            {isOpen && (<div className="modal">
                <div className="modal_body_login">
                    <h1 className="mb-20">Login</h1>
                    <form className="contact_us_form" method="POST" onSubmit={(e) => addUserToDb(e)}>
                        <input
                            className="form-control"
                            type="text"
                            name="contactName"
                            placeholder="Name"
                            required="true"
                            onInput={(e) => (user.name = e.target.value)}
                        />
                        <input
                            className="form-control"
                            type="email"
                            name="Email"
                            placeholder="Email"
                            required="true"
                            onInput={(e) => (user.email = e.target.value)}
                        />
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Password"
                            required="true"
                            onInput={(e) => (user.password = e.target.value)}
                        />
                        <input
                            className="form-control"
                            type="password"
                            name="password"
                            placeholder="Repeate password"
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
            </div>)}
        </React.Fragment>
    );
}

export default LogInModal;