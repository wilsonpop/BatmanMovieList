import React from 'react';
import { FlatList, StyleSheet, Text, ScrollView, View } from 'react-native';
import MovieThumbnail from './components/movie-thumbnail/index';
import MovieDetail from './components/movie-detail/index';
import config from './config';

const { API_KEY } = config;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  scrollContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 25
  },
  text: {
    color: '#fff',
    fontSize: 20
  },
  header: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 70,
    marginBottom: 20,
    marginHorizontal: 20
  },
  movieList: {
    flexDirection: 'column'
  }
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      movies: [],
      selectedMovie: null
    };
  }

  displayDetailPage = (movie) => {
    this.setState({
      selectedMovie: movie
    });
  }

  dismissDetailPage = () => {
    this.setState({
      selectedMovie: null
    });
  }

  fetchMovies = async () => {
    try {
      const rawMovies = await fetch(`http://www.omdbapi.com/?apikey=${API_KEY}&s=Batman&page=2`);
      const movies = await rawMovies.json();
      await this.setState({
        loading: false,
        movies
      });
    } catch(error) {
      console.log('Error: Unable to retrieve movies');
    }
  };

  renderMovie = (movie) => {
    return (
     <MovieThumbnail movie={movie} showDetailPage={this.displayDetailPage}/>
    );
  };

  componentDidMount() {
    this.fetchMovies();
  }

  renderView() {
    const { movies, selectedMovie } = this.state;
    if (
      movies &&
      movies.Search &&
      movies.Search.length > 0 &&
      !selectedMovie
    ) {
      return (
        <ScrollView style={styles.scrollContainer}>
          <FlatList
            data={movies.Search}
            numColumns={2}
            renderItem={movie => this.renderMovie(movie)}
            style={styles.movieList}
            keyExtractor={(item, index) => index.toString()}
          />
        </ScrollView>
      );
    }

    if (selectedMovie) {
      return (
        <ScrollView style={styles.scrollContainer}>
          <MovieDetail movie={selectedMovie} dismissDetailPage={this.dismissDetailPage}/>
        </ScrollView>
      );
    }

    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  renderHeader() {
    if (this.state.selectedMovie) {
      return (
        <Text style={styles.header}>{this.state.selectedMovie.item.Title}</Text>
      );
    }

    return (
      <Text style={styles.header}>Batman Movies</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
          {this.renderHeader()}
          {this.renderView()}
      </View>
    );
  }
}