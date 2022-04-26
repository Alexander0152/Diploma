import React, {useState, useEffect} from 'react';
import {store} from '../../businessLayer/Store';
import {Provider} from 'react-redux';

function Footer() {

    const [feedbackName, setFeedbackName] = React.useState('');
    const [feedbackEmail, setFeedbackEmail] = React.useState('');
    const [feedbackText, setFeedbackText] = React.useState('');

    function addFeedbackToDb(event) {
        event.preventDefault();
        try {
            let data = {
                Name: feedbackName,
                Email: feedbackEmail,
                Text: feedbackText
            };
            fetch('api/feedback/AddFeedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            alert('Feedback send successfully!');
        } catch (e) {
            alert('Something goes wrong!');
        }
    };

    return (
        <footer>
            <div className="wrapper">
                <div className="content">
                    <div className="footer_navpanel">
                        <a href="#about">
                            <div className="logo logo_footer"></div>
                        </a>
                        <ul className="footer_navbar">
                            <li><a href="#">About</a></li>
                            <li><a href="/">Countries</a></li>
                            <li><a href="/">Map</a></li>
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
                        <form className="contact_us_form" method="POST" onSubmit={(e) => addFeedbackToDb(e)}>
                            <input
                                className="contact_form_item"
                                type="text"
                                name="contactName"
                                placeholder="Name"
                                required=""
                                onInput={(e) => (setFeedbackName(e.target.value))}
                            />
                            <input
                                className="contact_form_item"
                                type="email"
                                name="contactEmail"
                                placeholder="Email"
                                required=""
                                onInput={(e) => (setFeedbackEmail(e.target.value))}
                            />
                            <fieldset>
                                <legend>Please enter your message</legend>
                                <textarea className="contact_text_area"
                                          onInput={(e) => (setFeedbackText(e.target.value))}></textarea>
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
