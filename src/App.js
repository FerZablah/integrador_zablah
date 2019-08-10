import React from 'react';
import { InputGroup, DropdownButton, FormControl, Dropdown, Row } from 'react-bootstrap';
import MovieCard from './MovieCard';
import './App.css';
import * as firebase from 'firebase';
firebase.initializeApp({
  apiKey: "AIzaSyDYMYYByMXC0FApCX0srt6BpyKcFt87dd8",
  authDomain: "peliculas-a22b6.firebaseapp.com",
  databaseURL: "https://peliculas-a22b6.firebaseio.com",
  projectId: "peliculas-a22b6",
  storageBucket: "",
  messagingSenderId: "620664334343",
  appId: "1:620664334343:web:8f3f0361f621f68b"
});

function createMovie() {
  var newMovieKey = firebase.database().ref('peliculas').push().key;
  firebase.database().ref('peliculas/' + newMovieKey).set({
    nombre: 'Vengers',
    duracion: 'Pryev',
    director: 'imageUrl',
    categoria: 'amor',
    reparto: [
      'Hola', 'Adios'
    ]
  });
}
async function queryMovies(name, property) {
  const snap = await firebase.database().ref('/peliculas').once('value');
  const movies = [];
  snap.forEach(function (childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    movies.push({ ...childData, key: childKey });
  });
  console.log(movies);
  const regexp = new RegExp(name, 'i');
  const arr = movies.filter(x => regexp.test(x[property]));
  console.log(arr);
  return arr;
}

function modifyMovie(modifiedMovie, key) {
  firebase.database().ref('/peliculas/' + key).set(modifiedMovie);
}

function deleteMovie(key){
  firebase.database().ref('/peliculas/'+key).set({});
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, queryMethod: 'Nombre' };
  } 
  componentDidMount() {
    /*createMovie();
    queryMovies('Vengers', 'nombre').then((movies) => {
      modifyMovie({newObject: 'asdsad'}, movies[0].key);
      deleteMovie(movies[0].key);
    });*/
  }
  render() {
    return (
      <div className="App" style={{ margin: 10 }}>´
       <InputGroup>
          <FormControl
            placeholder={this.state.queryMethod === 'Nombre' ? 'Avengers' : 'Cuarón'}
            aria-describedby="basic-addon2"
          />

          <DropdownButton
            as={InputGroup.Append}
            variant="outline-secondary"
            title={this.state.queryMethod}
            id="input-group-dropdown-2"
          >
            <Dropdown.Item onClick={() => this.setState({queryMethod: 'Nombre'})}>Nombre</Dropdown.Item>
            <Dropdown.Item onClick={() => this.setState({queryMethod: 'Director'})}>Director</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
        <Row style={{padding: 30, marginBottom: 30}}>
          <MovieCard style={{margin: 10}}/>
          <div style={{width: 30, height: 10, marginBottom: 30}}></div>
          <MovieCard style={{margin: 10}}/>
          <div style={{width: 30, height: 10}}></div>
          <MovieCard style={{margin: 10}}/>
          <div style={{width: 30, height: 10}}></div>
          <MovieCard style={{margin: 10}}/>
          <div style={{width: 30, height: 10}}></div>
          <MovieCard style={{margin: 10}}/>
          <div style={{width: 30, height: 10}}></div>
          <MovieCard style={{marginTop: 10}}/>
          <div style={{width: 30, height: 10}}></div>
          <MovieCard style={{margin: 10}}/>
          <div style={{width: 30, height: 10}}></div>
          <MovieCard style={{margin: 10}}/>
        </Row>
      </div>
    );
  }

}

export default App;
