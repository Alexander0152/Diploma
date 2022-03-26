import React from "react";
import {imageHost} from "../../constants/constants";

const card_container = {
  width: '300px',
  height: '300px',
  backgroundSize: 'cover',
  marginBottom: '50px',
  padding: 0,
  borderRadius: '9px',
  color: 'white',
  boxShadow: '3px 3px 3px 3px black'
}

const rating_block = {
  display: 'block',
  position: 'relative',
  width: '300px',
  height: '80px',
  marginTop: '170px',
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.373)'
}

const rating = {
  paddingTop: '20px',
  color: 'white',
}

function CountryCard({ country }) {
  const imagePass = imageHost + '/' + country.countryName + '/' + country.countryName + '.jpg';
  const newStyles = { ...card_container, ...{ backgroundImage: `url(${imagePass})` } };
  return (
    <div className="card_item" style={newStyles}>
      <h3>{country.countryName}</h3>
      <div style={rating_block}>
      <h4 style={rating}>Rating: {country.rating}</h4>
      </div>
    </div>
  )
}

export default CountryCard;