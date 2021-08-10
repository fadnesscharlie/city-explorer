import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import axios from 'axios';
import Weather from './Weather.js';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Movies from './Movies.js';

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
      src: '',
      weather: [],
      movies: [],
    };
  }

  // Create a on change to get target value, makes it able to break up the next function into 2 and call the state from the user info

  getCityInfo = async (e) => {
    e.preventDefault();
    // city_name is ID we gave form
    let cityChoice = e.target.city_name.value;
    console.log(cityChoice);

    try {
      console.log('Inside Try of Function');
      // let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&city=${cityChoice}&lat=${this.state.lat}$lon=${this.state.lon}&format=json`);

      let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${cityChoice}&format=json`);
      console.log('cityResults', cityResults);

      // ####### LOCAL ##########
      let movieData = await axios.get(`${process.env.REACT_APP_LOCAL_KEY}/movies?query=${cityChoice}`);
      console.log('movieData', movieData);

      let myData = await axios.get(`${process.env.REACT_APP_SERVER_KEY}/weather?city_name=${cityChoice}`);
      console.log('myData', myData);

      // ###### HEROKU ########
      // let movieData = await axios.get(`${process.env.REACT_APP_SERVER_KEY}/movies?query=${cityChoice}`);
      console.log('does this work?', movieData.data);

      this.setState({
        displayCity: true,
        city: cityChoice,
        lon: cityResults.data[0].lon,
        lat: cityResults.data[0].lat,
        name: cityResults.data[0].display_name,
        weather: myData.data,
        movies: movieData.data,
        errorMessage: '',

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

  handleChange = (e) => {
    let cityChoice = e.target.value;
    console.log(cityChoice);
    this.setState({
      city: cityChoice,
    })
  };

  getMovieData = async (e) => {
    e.preventDefault();
    try {
      // debugger;
      let movieData = await axios.get(`${process.env.REACT_APP_SERVER_KEY}/movies?query=${this.state.city}`);
      console.log('movieData', movieData);


      this.setState({
        movies: movieData.data,
        errorMessage: '',
        displayMovies : true,
      })


      this.pleaseWork();

    } catch (error) {
      console.log(error);
      this.setState({
        errorMessage: `Error occcuredin Movies : ${error}, Status: ${error}`,
      })
    }
  };

  getWeatherData = async (e) => {
    e.preventDefault();
    try {
      // let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&city=${this.state.city}&lat=${this.state.lat}$lon=${this.state.lon}&format=json`);
      // debugger;
      let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`);
      console.log('cityResults', cityResults);

      // let myData = await axios.get(`${process.env.REACT_APP_SERVER_KEY}/weather?city_name=${this.state.city}`);

      let myData = await axios.get(`${process.env.REACT_APP_SERVER_KEY}/weather?city=${this.state.city}&lat=${this.state.lat}&lon=${this.state.lon}`);

      console.log('myData', myData);

      this.setState({
        displayCity: true,
        lon: cityResults.data[0].lon,
        lat: cityResults.data[0].lat,
        name: cityResults.data[0].display_name,
        weather: myData.data,
        errorMessage: '',
      })

      this.pleaseWork();

    } catch (error) {
      console.log(error);
      this.setState({
        errorMessage: `Error occcured in Weather : ${error}, Status: ${error}`,
      })
    }
  };

  pleaseWork = () => {
    // e.preventDefault();
    // debugger;
    console.log('functions working')
    console.log(this.state);
  };

  functionCall = (e) => {
    e.preventDefault();
    // this.getCityInfo();
    this.pleaseWork();
    // this.handleChange();
    this.getMovieData();
    // this.getWeatherData();
  }

  render() {
    return (
      <>
        <h1>Welcome to City Explorer</h1>
        {/* Error message */}
        < section >
          {
            this.state.errorMessage ?
              <h5>{this.state.errorMessage}</h5> : ''
          }
        </section >
        {/* {this.pleaseWork()} */}

        <Form className="form"
        onSubmit={this.getWeatherData}
        >
          <Form.Group >
            <Form.Label >Enter a City </Form.Label>
            <Form.Control
              onChange={this.handleChange}
              className="formText"
              type="text"
              id="city_name"
              placeholder='Enter City Here' />
            <Form.Text
              className="text-muted formText">Enter a City to see its weather</Form.Text>

            <Button type="submit"
              // onClick={() => {
              //   this.getCityInfo();
              //   this.pleaseWork.bind();
              //   this.handleChange();
              //   this.getMovieData.bind();
              //   this.getWeatherData();
              // }}
            >Enter</Button>
          </Form.Group>
        </Form>

        <article>
          {/* If the user types a correct city, show the name */}
          {this.state.displayCity ?
            <h3>Your Chosen City: {this.state.name}</h3> : ''}
        </article>

        <aside>
          {/* If the user types a correct city, show the name */}
          {this.state.displayCity ? <img
            // src={this.state.src}
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.state.lat},${this.state.lon}&zoom=12`}
            alt="City"
          /> : ''}
        </aside>

        <article>
          {this.state.displayCity ?
            <h3>
              Lat: {this.state.lat},
              Lon: {this.state.lon}</h3> : ''}
        </article>

        <Weather
          weather={this.state.weather}
        />

        {
          this.state.displayMovies ?
            <Movies movies={this.state.movies} /> : ''
        }


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

