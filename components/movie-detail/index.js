import React, { PureComponent } from 'react'; 
import { Image, StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import config from '../../config';

const { API_KEY } = config;

const styles = StyleSheet.create({
  detailsContainer: {
    justifyContent: 'center',
    alignItems: 'center'
  },  
  thumbnailContainer: {
    height: 500,
    width: 337,
    marginVertical: 20
  },
  poster: {
    height: 500,
    width: 337,
  },
  detailHeader: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 10,
    textAlign: 'center'
  },
  detailLabel: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center'
  },
  button: {
    height: 75,
    width: 250,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLabel: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

export default class MovieThumbnail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      movieDetails: null
    };
  }

  componentDidMount() {
    this.fetchMovieDetails();
  }

  fetchMovieDetails = async () => {
    try {
      const { movie } = this.props;

      if (!movie) {
        throw new Error('Unexpected error! Could not find movie selected.')
      }

      const rawMovieDetails = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&i=${movie.item.imdbID}`);
      const movieDetails = await rawMovieDetails.json();
      await this.setState({
        loading: false,
        movieDetails
      });
    } catch (error) {
      console.log('error', error)
    }
  };

  render() {
    const { movieDetails } = this.state;

    if (!movieDetails) {
      return (
        <View style={styles.container}>
          <Text>An error occured!</Text>
        </View>
      );
    } 

    return (
    <View style={styles.detailsContainer}>
      <View style={styles.thumbnailContainer}>
        <Image source={{ uri: movieDetails.Poster }} style={styles.poster}/>
      </View>
        <Text style={styles.detailHeader}>Rated:</Text>
        <Text style={styles.detailLabel}>{movieDetails.Rated}</Text>
        <Text style={styles.detailHeader}>Country:</Text>
        <Text style={styles.detailLabel}>{movieDetails.Country}</Text>
        <Text style={styles.detailHeader}>Released:</Text>
        <Text style={styles.detailLabel}>{movieDetails.Released}</Text>
        <Text style={styles.detailHeader}>Genre:</Text>
        <Text style={styles.detailLabel}>{movieDetails.Genre}</Text>
        <Text style={styles.detailHeader}>Director:</Text>
        <Text style={styles.detailLabel}>{movieDetails.Director}</Text>
        <Text style={styles.detailHeader}>Actors:</Text>
        <Text style={styles.detailLabel}>{movieDetails.Actors}</Text>
        <TouchableOpacity onPress={() => this.props.dismissDetailPage()} style={styles.button}>
          <Text style={styles.buttonLabel}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}