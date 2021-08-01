import './App.css';
import React from 'react';
import axios from 'axios';

// npm i axios


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
      let cityResults = await axios.get(`https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&q=${this.state.city}&format=json`)

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
    e.preventDefault();
    let weatherInfo = e.target.city_name.value;
    let myData = await axios.get(`http://localhost:3001/weather?city_name=${weatherInfo}`);

    // let myData2 = await axios.get(`http://localhost:3001/weather, {
    //   params {
    //     lat:
    //     lon:
    //     city:
    //   }
    // }`);
    console.log(myData.data)

    this.setState({
      weather: myData.data,
    })
  }

  handleChange = (e) => {
    this.setState({ city: e.target.value })
  };

  render() {
    return (
      <>
        <h1>Welcome to City Explorer</h1>

        <form onSubmit={this.getData}>
          <input id="city_name" />
        <button>Get Data</button>

        </form>
          {this.state.weather.length !==0 
          ? this.state.weather.map((weather, index) => <h3 key={index}>{weather.city_name}</h3>) 
          : ''}


        <section>
          {this.state.renderError ? <h5>{this.state.errorMessage}</h5> : ''}
        </section>
        <form onSubmit={this.getCityInfo}>
          <input onChange={this.handleChange} />
          <button>Explore</button>
        </form>
        <article>
          {this.state.displayCity ? <h3>Your Chosen City: {this.state.name}</h3> : ''}
        </article>
        <aside>
          {this.state.displayCity ? <img
            src={this.state.src}
            alt="City"
          /> : ''}
        </aside>
        <article>
          {this.state.displayCity ? <h3>Lat: {this.state.lat}, Lon: {this.state.lon}</h3> : ''}
        </article>
        <footer> Made By: Charlie Fadness</footer>
      </>
    )
  }
}

export default App;
