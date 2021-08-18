import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import axios from 'axios';
import Weather from './Weather.js';
import Movies from './Movies.js';
import SearchForm from './SearchForm.js'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayCity: false,
      displayMovies: false,
      errorMessage: '',
      city: '',
      lon: 0,
      lat: 0,
      name: '',
      weather: [],
      movies: [],
    };
  }

  // Sets state for city the user types in
  handleChange = (e) => {
    let cityChoice = e.target.value;
    this.setState({
      city: cityChoice,
    })
  };

  getMovieData = async (e) => {
    e.preventDefault();
    try {
      // Movie API Call
      let movieData = await axios.get(`${process.env.REACT_APP_SERVER_KEY}/movies?query=${this.state.city}`);

      this.setState({
        movies: movieData.data,
        errorMessage: '',
        displayMovies: true,
      })

    } catch (error) {
      console.log(error);
      this.setState({
        errorMessage: `Error occcured in Movies : ${error}, Status: ${error}`,
      })
    }
  };

  getWeatherData = async (e) => {
    e.preventDefault();
    try {
      // Get Map API Call
      let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);

      this.setState({
        displayCity: true,
        lon: cityResults.data[0].lon,
        lat: cityResults.data[0].lat,
        name: cityResults.data[0].display_name,
        errorMessage: '',
      })

    } catch (error) {
      console.log(error);
      this.setState({
        errorMessage: `Error occcured in Weather : ${error}, Status: ${error}`,
      })
    }
  };

  getMapData = async (e) => {
    // Weather API Call
    let myData = await axios.get(`${process.env.REACT_APP_SERVER_KEY}/weather?lat=${this.state.lat}&lon=${this.state.lon}`);

    this.setState({
      weather: myData.data,
    })
  }

  // Run multiple functions in onSubmit
  functionCall = (e) => {
    e.preventDefault();
    this.getWeatherData(e);
    this.getMapData(e);
    this.getMovieData(e);
  }

  render() {
    return (
      <>
        <h1>Welcome to City Explorer</h1>

        <section>{this.state.errorMessage ? <h5>{this.state.errorMessage}</h5> : ''}</section >

        <SearchForm
          functionCall={this.functionCall}
          handleChange={this.handleChange}
        />
        <Weather
          weather={this.state.weather}
          displayCity={this.state.displayCity}
          name={this.state.name}
          lat={this.state.lat}
          lon={this.state.lon}
        />

        <Movies
          displayMovies={this.state.displayMovies}
          movies={this.state.movies}
        />

        < footer > Made By: Charlie Fadness</footer >
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
