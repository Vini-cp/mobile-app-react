import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList } from 'react-native'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import FilmItem from './FilmItem'

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.searchedText = ""
    this.state = { films: [] }
  }

  _loadFilms() {
    if (this.searchedText.length > 0) { // Seulement si le texte recherché n'est pas vide
      getFilmsFromApiWithSearchedText(this.searchedText).then(data => {
          this.setState({ films: data.results })
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
        />
        <Button title="Rechercher" onPress={() => this._loadFilms()}/>
        <FlatList
          data={this.state.films}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item}) => <FilmItem film={item}/>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    marginTop: 20
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    marginTop: 40,
    marginBottom: 10,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5
  }
})

export default Search
