import React from 'react';
// import './Movie.css';

class Weather extends React.Component {
  constructor(props){
    super(props);
    this.state={
    }
  }
  render() {
    return (
      <>
        {this.props.movies.map((info, idx) =>
        <h5 
        className="weatherInfo" 
        key={idx}>
          {info.title}
          {info.overview}
          {info.votes}
          {info.totalVotes}
          {info.imageUrl}
          {info.popularity}
          {info.released}

          </h5>
        )}
      </>
    )
  }
}

export default Weather;
