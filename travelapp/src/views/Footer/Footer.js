import React, {useState, useEffect} from 'react';
import {store} from '../../businessLayer/Store';
import {Provider} from 'react-redux';
import StorageService from "../../services/StorageService";
import {addSiteFeedback} from "../../services/SiteFeedbacksService";
import {Link} from "react-router-dom";

function Footer() {

    const [feedbackName, setFeedbackName] = React.useState('');
    const [feedbackEmail, setFeedbackEmail] = React.useState('');
    const [feedbackText, setFeedbackText] = React.useState('');

    function addFeedback(event) {
        event.preventDefault();

        const feedback = {
            Name: feedbackName,
            Email: feedbackEmail,
            Text: feedbackText,
            Date: new Date().toISOString()
        };

        addSiteFeedback(feedback).then();
    }

    function clearFie(event) {
        event.preventDefault();

        const feedback = {
            Name: feedbackName,
            Email: feedbackEmail,
            Text: feedbackText,
            Date: new Date().toISOString()
        };

        addSiteFeedback(feedback).then();
    }

    return (
        <footer>
            <div className="wrapper">
                <div className="content">
                    <div className="footer_navpanel">
                        <a href="/">
                            <div className="logo logo_footer"></div>
                        </a>
                        <ul className="footer_navbar">
                            <Link to="/">
                                <li>About</li>
                            </Link>
                            <Link to="/">
                                <li>Countries</li>
                            </Link>
                            <Link to="/">
                                <li>Map</li>
                            </Link>
                            <li><a href="#contact_us">Contact us</a></li>
                        </ul>
                        <button className="btn_donate_for_volunteers">
                            <span>DONATE FOR THE PROJECT</span>
                        </button>
                    </div>
                    <div className="contact_us">
                        <ul className="footer_navbar_vertical">
                            <li><a href="#">About</a></li>
                            <li><a href="/">Map</a></li>
                        </ul>
                        <span
                            className="contact_us_title">What features do you want to see in the future?</span>
                        <form className="contact_us_form" method="POST" onSubmit={(e) => addFeedback(e)}>
                            <input
                                className="contact_form_item"
                                type="text"
                                name="contactName"
                                placeholder="Name"
                                required={true}
                                onInput={(e) => (setFeedbackName(e.target.value))}
                            />
                            <input
                                className="contact_form_item"
                                type="email"
                                name="contactEmail"
                                placeholder="Email"
                                required={true}
                                onInput={(e) => (setFeedbackEmail(e.target.value))}
                            />
                            <fieldset>
                                <legend>Please enter your message</legend>
                                <textarea className="contact_text_area"
                                          required={true}
                                          onInput={(e) => (setFeedbackText(e.target.value))}/>
                            </fieldset>
                            <button type="submit" className="btn_contact_submit">
                                send
                                <img src="assets/icons/arrow_right_submit.svg" alt="send"/>
                            </button>
                        </form>
                    </div>
                    <div className="travel_online_center">
                        <span className="online_center_title">Travel online center</span>
                        <p className="text color_white">132, Address District, Street</p>
                        <p className="text color_white mb-20">Open Daily 10:00 am - 5:00 pm</p>
                        <address>
                            <a href="tel:7021633433" className="text color_white"
                            >T(702) 163-3433</a
                            >
                        </address>
                        <address>
                            <a
                                href="mailto:zoo.online@gmail.com"
                                className="text color_white mb-20"
                            >travel.online@gmail.com</a
                            >
                        </address>
                        <ul className="footer_networks">
                            <li className="instagram">
                                <a href="https://www.instagram.com"></a>
                            </li>
                            <li className="twitter">
                                <a href="https://twitter.com"></a>
                            </li>
                            <li className="vk">
                                <a href="https://vk.com"></a>
                            </li>
                            <li className="youtube">
                                <a href="https://youtube.com"></a>
                            </li>
                        </ul>
                        <button className="btn_donate_for_volunteers">
                            <span>DONATE FOR VOLUNTEERS</span>
                        </button>
                    </div>
                    <div className="footer_copyrights">
                        <span className="copyrights_text mt-28">©Galushkin Alexander</span>
                        <span className="copyrights_text"
                        >©GRSU- 2022</span
                        >
                    </div>
                </div>
            </div>
        </footer>
    )
        ;
}

export default Footer;
