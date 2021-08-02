import './App.css';
import React from 'react';
import axios from 'axios';
import Weather from './Weather.js';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';

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
      weather: [],
    };
  }

  getCityInfo = async (e) => {
    e.preventDefault();
    try {
      //   Variable                get     server/wesbite
      let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);

      this.setState({
        displayCity: true,
        lon: cityResults.data[0].lon,
        lat: cityResults.data[0].lat,
        name: cityResults.data[0].display_name,
        // Grab from city results not from state
        src: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${cityResults.data[0].lat},${cityResults.data[0].lon}&zoom=12`,
      })
    } catch (error) {
      this.setState({
        renderError: true,
        errorMessage: `Error occcured: ${error.response.data.error}, Status: ${error.response.status}`,
      })
    }
  }

  getData = async (e) => {
    try {
      e.preventDefault();
      let weatherInfo = e.target.city_name.value;
      let myData = await axios.get(`http://localhost:3001/weather?city_name=${weatherInfo}`);
      this.setState({
        weather: myData.data,
      })

    } catch (error) {
      this.setState({
        renderError: true,
        errorMessage: `Error occcured: ${error.response.data.error}, Status: ${error.response.status}`,
      })
    }
  }
  
  // Updates city for Location Form
  handleChange = (e) => {
    this.setState({ city: e.target.value })
  };

  render() {
    return (
      <>
        <h1>Welcome to City Explorer</h1>

        {/* Form to ask the user on the three cities in our database */}
        <Form className="form" onSubmit={this.getData}>
          <Form.Group >
            <Form.Label >Enter a City</Form.Label>
            <Form.Control
              className="formText"
              type="text"
              id="city_name"
              placeholder='Please Enter onme of the three cities' />
            <Form.Text
              className="text-muted formText">Enter 'Seattle', 'Paris', or 'Amman'</Form.Text>
            <Button type="submit" onClick={this.handleChange}>Enter</Button>
          </Form.Group>
        </Form>

        {/* Weather component to display the three days of weather */}
        <Weather
          weather={this.state.weather}
        />
        
        {/* Error message */}
        <section>
          {this.state.renderError ? <h5>{this.state.errorMessage}</h5> : ''}
        </section>

        {/* Form to show the user different cities and their location */}
        <Form className="form" onSubmit={this.getCityInfo}>
          <Form.Group >
            <Form.Label>Please Enter a City</Form.Label>
            <Form.Control
              className="formText"
              onChange={this.handleChange}
              placeholder='Please Enter a City' />
            <Form.Text
              className="text-muted formText">Enter a city to explore its location</Form.Text>
            <Button type="submit">Explore</Button>
          </Form.Group>
        </Form>

        <article>
          {/* If the user types a correct city, show the name */}
          {this.state.displayCity ? <h3>Your Chosen City: {this.state.name}</h3> : ''}
        </article>
        <aside>
          {/* If the user types a correct city, show the name */}
          {this.state.displayCity ? <img
            src={this.state.src}
            alt="City"
          /> : ''}
        </aside>
        <article>
          {/* If the user types a correct city, show the location through latitude and longitude */}
          {this.state.displayCity ? <h3>Lat: {this.state.lat}, Lon: {this.state.lon}</h3> : ''}
        </article>
        <footer> Made By: Charlie Fadness</footer>
      </>
    )
  }
}

export default App;
