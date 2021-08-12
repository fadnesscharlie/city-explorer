import React from 'react';
import './Weather.css';
import ListGroup from 'react-bootstrap/ListGroup'
import WeatherDay from './WeatherDay';

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  render() {
    return (
      <>
        <article>
          {/* If the user types a correct city, show the name */}
          {this.props.displayCity ?
            <h3>Your Chosen City: {this.props.name}</h3> : ''}
        </article>

        <aside>
          {/* If the user types a correct city, show the name */}
          {this.props.displayCity ? <img
            src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATIONIQ_KEY}&center=${this.props.lat},${this.props.lon}&zoom=12`}
            alt={this.props.name}
          /> : ''}
        </aside>

        <article>
          {this.props.displayCity ?
            <h3>
              Lat: {this.props.lat},
              Lon: {this.props.lon}</h3> : ''}
        </article>
        {this.props.weather.map((item, idx) =>
          <ListGroup
            className="weatherInfo"
            key={idx}>
            <WeatherDay item={item} />
          </ListGroup>
        )}
      </>
    )
  }
}

export default Weather;
