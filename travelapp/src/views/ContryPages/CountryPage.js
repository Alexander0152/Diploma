import React, {useEffect} from "react";
import CountryPageSlider from '../CountryPageSlider/CountryPageSlider'
import Map from '../Map/Map'
import RatingWidget from '../RatingWidget/RatingWidget'
import DataService from "../../services/DataService";

const card_container = {
    width: '300px',
    height: '300px',
    backgroundColor: 'red',
    backgroundSize: 'cover',
    marginBottom: '50px',
    padding: 0,
    borderRadius: '9px',
    color: 'white',
    boxShadow: '3px 3px 3px 3px black'
}

function CountryPage({country}) {
    const [countryInfo, setCountryInfo] = React.useState({});

    useEffect(() => {
        const dataService = new DataService();
        dataService.getCountryData().then((res) => {
            setCountryInfo(res);
        });

    }, [])

    return (
        <section class="country_card">
            <div className="wrapper">
                <main className="country-page__container">
                    <p className="country-page__title">{countryInfo.name}</p>
                    <h3>{countryInfo.capital}</h3>
                    <div className="country-page__intro__images">
                        <img className="country-page__intro__images__first" src="assets/images/USA_into1.jpg"
                             alt="USA image1"/>
                        <img className="country-page__intro__images__second" src="assets/images/USA_into2.jpg"
                             alt="USA image2"/>
                    </div>
                    <h1 className="country-page__info__title">Some information about {countryInfo.name}</h1>
                    <div className="country-page__info__content">
                        <div className="country-country-page__info__left">
                            <p className="country-page__info__left__text">{countryInfo.countryInfo}</p>
                            <div>
                                < RatingWidget country={country}/>
                                <iframe class="country-page__info__left__video" allow="accelerometer; autoplay; clipboard-write;
             encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""
                                        src={countryInfo.videoLink} frameborder="0"
                                        title="USA video">
                                </iframe>
                            </div>
                        </div>
                    </div>
                    <section className="country-page__gallery">
                        <h1 class="gallery-title">Sights</h1>
                        <CountryPageSlider/>
                        <h1 class="gallery-title">Map</h1>
                        <Map countryName={'USA'}/>
                    </section>
                </main>
            </div>
        </section>
    )
}

export default CountryPage;