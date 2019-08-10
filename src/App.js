import React from 'react';
import { InputGroup, DropdownButton, FormControl, Dropdown, Row } from 'react-bootstrap';
import MovieCard from './MovieCard';
import './App.css';
import ReactDOM from 'react-dom';
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
    nombre: 'EndGame',
    duracion: 60,
    director: 'Russo Brothers',
    categoria: 'Acción',
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
  const arr = movies.filter((value) => {
    return value[property].toLowerCase().includes(name.toLowerCase());
  })
  return arr;
}

function deleteMovie(key){
  firebase.database().ref('/peliculas/'+key).set({});
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, queryMethod: 'Nombre', movies: [] };
  } 
  modifyMovie(modifiedMovie, key) {
    firebase.database().ref('/peliculas/' + key).set(modifiedMovie);
  }
  componentWillMount(){
    queryMovies('', this.state.queryMethod.toLowerCase()).then((res) => {
      console.log('result', res);
      this.setState({movies: res});
    });
  }
  componentDidMount() {
    createMovie();
    /*queryMovies('Vengers', 'nombre').then((movies) => {
      modifyMovie({newObject: 'asdsad'}, movies[0].key);
      deleteMovie(movies[0].key);
    });*/
  }
  handleDelete(key){
    deleteMovie(key);
  }
  refreshData(){
    queryMovies('', this.state.queryMethod.toLowerCase()).then((res) => {
      console.log('result', res);
      this.setState({movies: res});
    });
  }
  handleInput(){
    const input = ReactDOM.findDOMNode(this.refs.queryInput).value;
    console.log(input);
    queryMovies(input, this.state.queryMethod.toLowerCase()).then((res) => {
      console.log('result', res);
      this.setState({movies: res});
    });
  }
  render() {
    return (
      <div className="App" style={{ margin: 10 }}>
       <InputGroup>
          <FormControl
            placeholder={this.state.queryMethod === 'Nombre' ? 'Avengers' : 'Cuarón'}
            onInput={() => this.handleInput()}
            aria-describedby="basic-addon2"
            ref='queryInput'
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
          {
            this.state.movies.map((movie, idx) => {
              return (
                <div key={movie.key}>
                  <MovieCard 
                    style={{margin: 10}}
                    titulo={movie.nombre}
                    director={movie.director}
                    duracion={movie.duracion}
                    categoria={movie.categoria}
                    reparto={movie.reparto}
                    save={this.modifyMovie}
                    movieKey={movie.key}
                    refresh={this.refreshData.bind(this)}
                    delete={this.handleDelete.bind(this)}
                  />
                </div>
              );
            })
          }
        </Row>
      </div>
    );
  }

}

export default App;
