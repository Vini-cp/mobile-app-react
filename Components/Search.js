import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, ActivityIndicator } from 'react-native'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import FilmItem from './FilmItem'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = ""
    this.state = { 
      films: [],
      isLoading: false
    }
  }

  _displayLoading() {
    if (this.state.isLoading) {
      return (
        <View style={ styles.loading_container }>
          <ActivityIndicator size='large' />
        </View>
      )
    }
  }

  _loadFilms() {
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
          this.setState({ 
            films: data.results,
            isLoading: false
          })
      })
    }
  }

  _searchTextInputChanged(text) {
    this.searchedText = text
  }

  render () {
    return (
      <View style={ styles.main_container }>
        <TextInput
          style={ styles.textinput }
          placeholder="Titre du filme"
          onChangeText={(text) => this._searchTextInputChanged(text)}
          onSubmitEditing={() => this._loadFilms()}
        />
        <Button title="Rechercher" onPress={() => this._loadFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}/>}
        />
        {this._displayLoading()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 50
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginBottom: 10,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 200,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default Search
