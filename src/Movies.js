import React from 'react';
import './Movie.css';
import Carousel from 'react-bootstrap/Carousel';
import Movie from './Movie';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  renderWeather = () => {
    let movieArr = this.props.movies.map((info, idx) => {
      return (
        <Carousel.Item key={idx}>
          <Movie info={info} />
        </Carousel.Item>
      )
    })
    return movieArr;
  }

  render() {
    return (
      <section>
        {this.props.displayMovies ?
          <Carousel fade>
            {this.renderWeather()}
          </Carousel>
          : ''}
      </section>
    )
  }
}

export default Movies;
