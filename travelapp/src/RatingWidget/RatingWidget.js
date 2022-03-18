import React, { Component } from 'react';


const ul = {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'center',
}

class RatingWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 0
        };
    }

    updateRating(rating) {
        this.setState({ rating });

        let numberOfVoters= this.props.country.numberOfVoters;
        let prevRating = this.props.country.rating;
        let newRating = (numberOfVoters*prevRating + 1*rating)/(numberOfVoters + 1);
        newRating = 1*(newRating.toPrecision(3));

        let data = {
            CountryId: this.props.country.countryId,
            Rating: newRating,
            NumberOfVoters: this.props.country.numberOfVoters + 1
        };

        fetch('/api/countryInfo/UpdateCountry', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
    }

    render() {
        const { rating } = this.state;
        return (
            <div className="rating">
                <h1>Set rating:</h1>
                <ul style={ul}>
                    <li onClick={this.updateRating.bind(this, 1)} className={(rating >= 1) ? 'selected' : ''}>&#9733;</li>
                    <li onClick={this.updateRating.bind(this, 2)} className={(rating >= 2) ? 'selected' : ''}>&#9733;</li>
                    <li onClick={this.updateRating.bind(this, 3)} className={(rating >= 3) ? 'selected' : ''}>&#9733;</li>
                    <li onClick={this.updateRating.bind(this, 4)} className={(rating >= 4) ? 'selected' : ''}>&#9733;</li>
                    <li onClick={this.updateRating.bind(this, 5)} className={(rating >= 5) ? 'selected' : ''}>&#9733;</li>
                    <li onClick={this.updateRating.bind(this, 6)} className={(rating >= 6) ? 'selected' : ''}>&#9733;</li>
                    <li onClick={this.updateRating.bind(this, 7)} className={(rating >= 7) ? 'selected' : ''}>&#9733;</li>
                    <li onClick={this.updateRating.bind(this, 8)} className={(rating >= 8) ? 'selected' : ''}>&#9733;</li>
                    <li onClick={this.updateRating.bind(this, 9)} className={(rating >= 9) ? 'selected' : ''}>&#9733;</li>
                    <li onClick={this.updateRating.bind(this, 10)} className={(rating >= 10) ? 'selected' : ''}>&#9733;</li>
                </ul>
            </div>
        )
    }
}

export default RatingWidget;