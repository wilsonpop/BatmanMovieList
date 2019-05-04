import React, { PureComponent } from 'react'; 
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const styles = StyleSheet.create({
  thumbnailContainer: {
    height: 225,
    width: 170,
    marginTop: 20,
    marginHorizontal: 10,
    marginBottom: 50
  },
  poster: {
    height: 225,
    width: 170,
  },
  movieTitle: {
    color: '#fff',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center'
  }
});

export default class MovieThumbnail extends PureComponent {
  render() {
    const { movie } = this.props;

    if (!movie) {
      return (
        <View style={styles.thumbnailContainer}>
          <Image source={{ uri: 'https://static1.squarespace.com/static/59decda418b27ddf3baeb5ba/t/59df05c6a8b2b02752fad4dc/1507788230333/Black.jpg?format=1500w' }} style={styles.poster}/>
        </View>
      );
    } 

    return (
      <View style={styles.thumbnailContainer}>
        <TouchableOpacity onPress={() => this.props.showDetailPage(movie)}>
          <Image source={{ uri: movie.item.Poster }} style={styles.poster}/>
          <Text style={styles.movieTitle}>{movie.item.Title}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}