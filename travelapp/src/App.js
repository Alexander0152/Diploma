import React, {useState, useEffect} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Fade} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import CountryCard from './views/CountryCards/CountryCard';
import LoginModal from './views/Modal/LoginModal'
import SignInModal from './views/Modal/SigninModal'
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import CountryPage from "./views/ContryPages/CountryPage";
import {imageHost} from "./constants/constants";
import ScrollToTop from "./scrollToTop/scrollToTop";
import {store} from './businessLayer/store';
import {Provider} from 'react-redux';

const fadeImages = [
    imageHost + '/others/hill.jpg',
    imageHost + '/others/dubai.jpg',
    imageHost + '/others/sea.jpg'
];

function App() {
    const [cards, setCards] = React.useState([
        {countryId: 1, countryName: 'USA', rating: 8.4, numberOfVoters: 300},
        {countryId: 2, countryName: 'Australia', rating: 8.8, numberOfVoters: 300},
        {countryId: 3, countryName: 'France', rating: 5.4, numberOfVoters: 300},
        {countryId: 2, countryName: 'Australia', rating: 8.8, numberOfVoters: 300}
    ]);

    const [feedbackName, setFeedbackName] = React.useState('');
    const [feedbackEmail, setFeedbackEmail] = React.useState('');
    const [feedbackText, setFeedbackText] = React.useState('');

    function sortByRating() {
        const sorted = [...cards].sort(function (a, b) {
            let keyA = new Number(a.rating),
                keyB = new Number(b.rating);
            if (keyA > keyB) return -1;
            if (keyA < keyB) return 1;
            return 0;
        });
        setCards(sorted);
    }

    function sortByAlphabet() {
        const sorted = [...cards].sort(function (a, b) {
            let keyA = new String(a.countryName),
                keyB = new String(b.countryName);
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
        });
        setCards(sorted);
    }

    const CardsPanel = () => <h1>Home Page</h1>;

    let pagePath = () => '/';

    function setCountryPagePass(cardName) {
        pagePath = cardName;
    }

    useEffect(() => {
        fetch('/api/countryinfo', {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setCards(result);
                },
                (error) => {
                    console.log(error);
                    setCards([{countryId: 1, countryName: "ERROR", rating: 3, numberofvoters: 300}]);
                }
            );
    }, [])

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

    function getCardByName(name) {
        return cards.filter(country => country.countryName === name)[0];
    }

    return (
        <Router>
            <Provider store={store}>
                <ScrollToTop/>
                <div className="App">
                    <header className="header">
                        <div className="wrapper">
                            <div className="header_content">
                                <a href="index.html">
                                    <div className="logo"></div>
                                </a>
                                <ul className="navbar">
                                    <li className="header_active"><a href="#"></a></li>
                                    <li className="header_active"><a href="#">About</a></li>
                                    <li><a href="/">Countries</a></li>
                                    <li><a href="pages/intermediate_page/map.html">Map</a></li>
                                    <li><a href="#contact_us">Contact Us</a></li>
                                </ul>
                                <LoginModal/>
                                <SignInModal/>
                            </div>
                        </div>
                    </header>
                    <Route exact path="/" component={CardsPanel}>
                        <section class="first_screen">
                            <div className="wrapper">
                                <div className="slide-container">
                                    <ul className="social_net">
                                        <li className="instagram">
                                            <a href="https://www.instagram.com"></a>
                                        </li>
                                        <li className="twitter">
                                            <a href="https://twitter.com"></a>
                                        </li>
                                        <li className="youtube">
                                            <a href="https://youtube.com"></a>
                                        </li>
                                        <li className="vk">
                                            <a href="https://vk.com"></a>
                                        </li>
                                    </ul>
                                    <Fade duration='3000' arrows={false}>
                                        <div className="each-fade">
                                            <div className="image-container">
                                                <p className="slide_title first_slide_title">Travel from home</p>
                                                <img src={fadeImages[0]} alt='slide1'/>
                                            </div>
                                        </div>
                                        <div className="each-fade">
                                            <div className="image-container">
                                                <p className="slide_title second_slide_title">Explore new places</p>
                                                <img src={fadeImages[1]} alt='slide2'/>
                                            </div>
                                        </div>
                                        <div className="each-fade">
                                            <div className="image-container">
                                                <p className="slide_title third_slide_title">Discover the world</p>
                                                <img src={fadeImages[2]} alt='slide3'/>
                                            </div>
                                        </div>
                                    </Fade>
                                </div>
                            </div>
                        </section>
                        <section className="cards">
                            <div className="panel_sort">
                                <button className="btn btn-info btn_sort" onClick={() => sortByRating()}>Sort by rating
                                </button>
                                <button className="btn btn-info btn_sort" onClick={() => sortByAlphabet()}>Sort by
                                    alphabet
                                </button>
                            </div>
                            <div className="cards_panel">
                                {cards.map((card) => {
                                    return <Link onClick={setCountryPagePass(card.countryName)}
                                                 to={pagePath}><CountryCard
                                        country={card} key={card.countryId} id={card.countryId}/> </Link>
                                })}
                            </div>
                        </section>
                    </Route>
                    <Route exact path="/Australia"
                           component={() => <CountryPage country={getCardByName('Australia')}/>}/>
                    <Route exact path="/Brazil" component={() => <CountryPage country={getCardByName('Brazil')}/>}/>
                    <Route exact path="/Canada" component={() => <CountryPage country={getCardByName('Canada')}/>}/>
                    <Route exact path="/Egypt" component={() => <CountryPage country={getCardByName('Egypt')}/>}/>
                    <Route exact path="/France" component={() => <CountryPage country={getCardByName('France')}/>}/>
                    <Route exact path="/Germany" component={() => <CountryPage country={getCardByName('Germany')}/>}/>
                    <Route exact path="/Greece" component={() => <CountryPage country={getCardByName('Greece')}/>}/>
                    <Route exact path="/Italy" component={() => <CountryPage country={getCardByName('Italy')}/>}/>
                    <Route exact path="/Japan" component={() => <CountryPage country={getCardByName('Japan')}/>}/>
                    <Route exact path="/Mexico" component={() => <CountryPage country={getCardByName('Mexico')}/>}/>
                    <Route exact path="/Russia" component={() => <CountryPage country={getCardByName('Russia')}/>}/>
                    <Route exact path="/Switzerland"
                           component={() => <CountryPage country={getCardByName('Switzerland')}/>}/>
                    <Route exact path="/UK" component={() => <CountryPage country={getCardByName('UK')}/>}/>
                    <Route exact path="/USA" component={() => <CountryPage country={getCardByName('USA')}/>}/>
                    <a name="contact_us"></a>
                    <footer>
                        <div class="wrapper">
                            <div class="content">
                                <div class="footer_navpanel">
                                    <a href="#about">
                                        <div class="logo logo_footer"></div>
                                    </a>
                                    <ul class="footer_navbar">
                                        <li><a href="#">About</a></li>
                                        <li><a href="/">Countries</a></li>
                                        <li><a href="/">Map</a></li>
                                        <li><a href="#contact_us">Contact us</a></li>
                                    </ul>
                                    <button class="btn_donate_for_volunteers">
                                        <span>DONATE FOR THE PROJECT</span>
                                    </button>
                                </div>
                                <div class="contact_us">
                                    <ul class="footer_navbar_vertical">
                                        <li><a href="#">About</a></li>
                                        <li><a href="/">Map</a></li>
                                    </ul>
                                    <span
                                        class="contact_us_title">What features do you want to see in the future?</span>
                                    <form class="contact_us_form" method="POST" onSubmit={(e) => addFeedbackToDb(e)}>
                                        <input
                                            class="contact_form_item"
                                            type="text"
                                            name="contactName"
                                            placeholder="Name"
                                            required=""
                                            onInput={(e) => (setFeedbackName(e.target.value))}
                                        />
                                        <input
                                            class="contact_form_item"
                                            type="email"
                                            name="contactEmail"
                                            placeholder="Email"
                                            required=""
                                            onInput={(e) => (setFeedbackEmail(e.target.value))}
                                        />
                                        <fieldset>
                                            <legend>Please enter your message</legend>
                                            <textarea class="contact_text_area"
                                                      onInput={(e) => (setFeedbackText(e.target.value))}></textarea>
                                        </fieldset>
                                        <button type="submit" class="btn_contact_submit">
                                            send
                                            <img src="assets/icons/arrow_right_submit.svg" alt="send"/>
                                        </button>
                                    </form>
                                </div>
                                <div class="travel_online_center">
                                    <span class="online_center_title">Travel online center</span>
                                    <p class="text color_white">132, Address District, Street</p>
                                    <p class="text color_white mb-20">Open Daily 10:00 am - 5:00 pm</p>
                                    <address>
                                        <a href="tel:7021633433" class="text color_white"
                                        >T(702) 163-3433</a
                                        >
                                    </address>
                                    <address>
                                        <a
                                            href="mailto:zoo.online@gmail.com"
                                            class="text color_white mb-20"
                                        >travel.online@gmail.com</a
                                        >
                                    </address>
                                    <ul class="footer_networks">
                                        <li class="instagram">
                                            <a href="https://www.instagram.com"></a>
                                        </li>
                                        <li class="twitter">
                                            <a href="https://twitter.com"></a>
                                        </li>
                                        <li class="vk">
                                            <a href="https://vk.com"></a>
                                        </li>
                                        <li class="youtube">
                                            <a href="https://youtube.com"></a>
                                        </li>
                                    </ul>
                                    <button class="btn_donate_for_volunteers">
                                        <span>DONATE FOR VOLUNTEERS</span>
                                    </button>
                                </div>
                                <div class="footer_copyrights">
                                    <span class="copyrights_text mt-28">©Galushkin Alexander</span>
                                    <span class="copyrights_text"
                                    >©GRSU- 2022</span
                                    >
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </Provider>
        </Router>
    );
}

export default App;
