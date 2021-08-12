import React from 'react';
import './Movie.css';
import Carousel from 'react-bootstrap/Carousel';

class Movies extends React.Component {
  render() {
    const { info } = this.props;
    return (
      <>
        <img
          className="d-block w-100"
          src={info.imageUrl}
          alt={info.title}
        />
        <Carousel.Caption className="caption">
          <h2>{info.title}</h2>
          <p>{info.d}</p>
          <p>{info.overview}</p>
          <p>{info.votes}</p>
          <p>{info.totalVotes}</p>
          <p>{info.popularity}</p>
        </Carousel.Caption>
      </>
    )
  }
}

export default Movies;
