import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {getSiteFeedbacks} from "../../services/SiteFeedbacksService";


function Feedbacks() {

    const [feedbacksList, setFeedbacks] = React.useState([
        { countryId: 1, Name: 'Some name', Email: "Some email", Country: "Some country", feedbackText: "some text" },
        { countryId: 1, Name: 'Some name', Email: "Some email", Country: "Some country", feedbackText: "some text" },
    ]);

    useEffect(() => {
        getSiteFeedbacks().then((res) => setFeedbacks(res));
    }, [])

    return (
        <section className="country_card siteFeedbacks_container">
            <div className="wrapper">
                <main className="country-page__container">
                    <h2 className="title">Feedbacks and suggestions</h2>
                    <table className="table">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Feedback</th>
                            <th>Date</th>
                        </tr>
                        {feedbacksList.map((item) => {
                            return <tr>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.text}</td>
                                <td>{String(item.date).replace('T', ' ')}</td>
                            </tr>
                        })}
                    </table>
                </main>
            </div>
        </section>
    )
}

export default Feedbacks;