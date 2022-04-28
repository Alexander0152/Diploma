import React, {useState, useEffect} from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Fade} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import CountryCard from './views/CountryCards/CountryCard';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import CountryPage from "./views/ContryPages/CountryPage";
import {imageHost} from "./constants/constants";
import ScrollToTop from "./scrollToTop/scrollToTop";
import {store} from './businessLayer/Store';
import {Provider} from 'react-redux';
import Header from "./views/Header/Header";
import Footer from "./views/Footer/Footer";
import { ToastProvider } from 'react-toast-notifications';

const fadeImages = [
    imageHost + '/others/hill.jpg',
    imageHost + '/others/dubai.jpg',
    imageHost + '/others/sea.jpg'
];

function App() {
    const [cards, setCards] = useState([
        {countryId: 1, countryName: 'USA', rating: 8.4, numberOfVoters: 300},
        {countryId: 2, countryName: 'Australia', rating: 8.8, numberOfVoters: 300},
        {countryId: 3, countryName: 'France', rating: 5.4, numberOfVoters: 300},
        {countryId: 2, countryName: 'Australia', rating: 8.8, numberOfVoters: 300}
    ]);

    const [feedbackName, setFeedbackName] = useState('');
    const [feedbackEmail, setFeedbackEmail] = useState('');
    const [feedbackText, setFeedbackText] = useState('');

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
                <ToastProvider>
                <ScrollToTop/>
                <div className="App">
                    <Header/>
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
                    <Footer/>
                </div>
                </ToastProvider>
            </Provider>
        </Router>
    );
}

export default App;
