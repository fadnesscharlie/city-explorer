import './App.css';
import React from 'react';
import axios from 'axios';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      displayCity: false,
      renderError: false,
      errorMessage: '',
      city: '',
      lon: 0,
      lat: 0,
      name: '',
      src: '',
    };
  }

  getCityInfo = async (e) => {
    e.preventDefault();

    try {
      let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`)
      console.log(cityResults.data[0]);

      this.setState({
        displayCity: true,
        lon: cityResults.data[0].lon,
        lat: cityResults.data[0].lat,
        name: cityResults.data[0].display_name,
        src: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`,
      })
    } catch (error) {
      console.log('error ', error.response)
      this.setState({
        renderError: true,
        errorMessage: `Error occcured: ${error.response.data.error}, Status: ${error.response.status}`,
      })
    }
  }

  handleChange = (e) => {
    this.setState({ city: e.target.value })
    console.log('City: ', this.state.city);
  };

  render() {
    return (
      <>
        <h1>hi</h1>
        <form onSubmit={this.getCityInfo}>
          <input onChange={this.handleChange} />
          <button>Explore</button>
        </form>
        {this.state.displayCity ? <h3>Your Chosen City: {this.state.name}</h3> : ''}

        {this.state.displayCity ? <h4>Lat: {this.state.lat}, Lon: {this.state.lon}</h4> : ''}
        {this.state.displayCity ? <img
          src={this.state.src}
          alt="City"
        /> : ''}
        {this.state.renderError ? <h5>{this.state.errorMessage}</h5> : ''}
      </>
    )
  }
}

export default App;
