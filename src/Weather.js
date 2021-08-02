import React from 'react';

class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state={
      weatherShow: true,
    }
  }
  runthis = () => {
    this.props.renderWeather()
  }
  
  render() {
    // debugger;
    console.log('inside of weather component', this.props.weather);

    return (
      <>
        <h2>Hi</h2>
        {/* {this.props.renderWeather} */}
        {/* {this.runthis()} */}
        {this.state.weatherShow ? this.props.weather.map((city, idx) => <h5 key={idx}>{city.date}</h5>) : ''}


      </>
    )
  }
}

export default Weather;
