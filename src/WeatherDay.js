import React from 'react';
import './Weather.css';
import ListGroup from 'react-bootstrap/ListGroup'

class WeatherDay extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <>
        <ListGroup.Item variant="success">
          {item.time}; {item.forecast}
        </ListGroup.Item>
      </>
    )
  }
}

export default WeatherDay;
