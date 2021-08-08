import React from 'react';
import './Movie.css';
import Carousel from 'react-bootstrap/Carousel';

class Movies extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  renderWeather = () => {
    let movieArr = this.props.movies.map((info, idx) => {
      return (
        <Carousel.Item>
        <img
          className="d-block w-100"
          src={info.imageUrl}
          alt={info.title}
          />
        <Carousel.Caption className="caption">
          <h2>{info.title}</h2>
          <p>{info.released}</p>
          <p>{info.overview}</p>
          <p>{info.votes}</p>
          <p>{info.totalVotes}</p>
          <p>{info.popularity}</p>
        </Carousel.Caption>
      </Carousel.Item>
          )
        })
        return movieArr;
      }

  render() {
    return (
      <section>
        <Carousel fade>
          {this.renderWeather()}
        </Carousel>

      </section>
    )
  }
}

export default Movies;
