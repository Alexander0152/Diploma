import React from 'react';
import ImageGallery from 'react-image-gallery';


class CountryPageSlider extends React.Component {
  render() {
    return <ImageGallery items={this.props.slides} />;
  }
}

export default CountryPageSlider;