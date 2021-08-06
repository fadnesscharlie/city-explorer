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
        {this.props.weather.map((info, idx) =>
        <h5 
        className="weatherInfo" 
        key={idx}>
          {info.date}; {info.des}
          </h5>
        )}
      </>
    )
  }
}

export default Weather;
