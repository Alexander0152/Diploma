import React from 'react'
import styles from './Modal.module.css'


export default class LogInModal extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            message: ''
        }
        this.name = 'ds';
        this.email = 'sssd';
        this.password = 'ds';
        this.status = 'user';
    }

    addUserToDb = (event) => {
        event.preventDefault();
        try {
            let data = {
                Name: this.name,
                Email: this.email,
                Password: this.password,
                Status: this.status
            };
            fetch('api/users/AddUser', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

        } catch (e) {
            this.setState({
                message: 'Such user already exist!',
            })
        }
        this.setState({
            message: 'You loged in successfully!',
        })
    };

    render() {
        return (
            <React.Fragment>
                <button className="btn btn-info btn_login" onClick={() => this.setState({ isOpen: true })}>Login</button>
                {this.state.isOpen && (<div className={styles.modal}>
                    <div className={styles.modal_body_login}>
                        <h1 className="mb-20">Login</h1>
                        <form class="contact_us_form" method="POST" onSubmit={(e) => this.addUserToDb(e)}>
                            <input
                                className="form-control"
                                type="text"
                                name="contactName"
                                placeholder="Name"
                                required="true"
                                onInput={(e)=>(this.name = e.target.value)}
                            />
                            <input
                                className="form-control"
                                type="email"
                                name="Email"
                                placeholder="Email"
                                required="true"
                                onInput={(e)=>(this.email = e.target.value)}
                            />
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="Password"
                                required="true"
                                onInput={(e)=>(this.password = e.target.value)}
                            />
                            <input
                                className="form-control"
                                type="password"
                                name="password"
                                placeholder="Repeate password"
                                required="true"
                            />
                            <button type="submit" className={styles.btn_contact_submit}>
                                send
                <img src="assets/icons/arrow_right_submit.svg" alt="send" />
                            </button>
                        </form>
                        <p className={styles.message}>{this.state.message}</p>
                        <button id='modalClose' className="btn btn-primary" onClick={() => this.setState({ isOpen: false })}>Close</button>
                    </div>
                </div>)}
            </React.Fragment>
        )
    }
}