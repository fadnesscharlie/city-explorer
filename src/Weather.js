import React from 'react';
import './Weather.css';

class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render() {
    return (
      <>
        {/* Returns to App the three days of weather for the appropriate city */}
        {this.props.weather.map((city, idx) => <h5 className="weatherInfo" key={idx}>{city.date}</h5>)}
      </>
    )
  }
}

export default Weather;
