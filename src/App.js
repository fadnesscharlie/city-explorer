import './App.css';
import React from 'react';
import axios from 'axios';
import Weather from './Weather.js';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css';
import Movies from './Movies.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCity: false,
      errorMessage: '',
      // city: '',
      lon: 0,
      lat: 0,
      name: '',
      src: '',
      weather: [],
      movies: [],
    };
  }

  getCityInfo = async (e) => {
    e.preventDefault();
    let cityChoice = e.target.city_name.value;

    try {
      let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&city=${cityChoice}&lat=${this.state.lat}$lon=${this.state.lon}&format=json`);

      let myData = await axios.get(`${process.env.REACT_APP_SERVER_KEY}/weather?city_name=${cityChoice}`);

      // ###### HEROKU ########
      let movieData = await axios.get(`${process.env.REACT_APP_SERVER_KEY}/movies?query=${cityChoice}`);

      // ####### LOCAL ##########
      // let movieData = await axios.get(`${process.env.REACT_APP_LOCAL_KEY}/movies?query=${cityChoice}`);

      console.log('does this work?', movieData.data);
 
      this.setState({
        displayCity: true,
        lon: cityResults.data[0].lon,
        lat: cityResults.data[0].lat,
        name: cityResults.data[0].display_name,
        weather: myData.data,
        movies: movieData.data,

        // Grab from city results not from state
        src: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${cityResults.data[0].lat},${cityResults.data[0].lon}&zoom=12`,
      })

    } catch (error) {
      console.log(error);
      this.setState({
        errorMessage: `Error occcured : ${error}, Status: ${error}`,

      })
    }
  }

  render() {
    return (
      <>
        <h1>Welcome to City Explorer</h1>
        {/* Error message */}
        <section>
          {this.state.errorMessage ? <h5>{this.state.errorMessage}</h5> : ''}
        </section>

        <Form className="form" onSubmit={this.getCityInfo}>
          <Form.Group >
            <Form.Label >Enter a City </Form.Label>
            <Form.Control
              className="formText"
              type="text"
              id="city_name"
              placeholder='Enter City Here' />
            <Form.Text
              className="text-muted formText">Enter a City to see its weather</Form.Text>

            <Button type="submit">Enter</Button>
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

        <Weather
          weather={this.state.weather}
        />
  
          {this.state.movies ? <Movies movies={this.state.movies} /> : ''}


        <footer> Made By: Charlie Fadness</footer>
      </>
    )
  }
}

export default App;


// this makes it so you dont have to use async and await

// axios.get.....
// .then(call back function, variable is what is stored)

// OR (just to satisfy the promise)

// .catch, catch method
//.catch(console.error);

