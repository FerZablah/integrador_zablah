import React from 'react';
import { InputGroup, DropdownButton, ButtonGroup, FormControl, Dropdown, Row, Button } from 'react-bootstrap';
import MovieCard from './MovieCard';
import './App.css';
import ReactDOM from 'react-dom';
import Editor from './modal';
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

function createMovie(movie) {
  var newMovieKey = firebase.database().ref('peliculas').push().key;
  firebase.database().ref('peliculas/' + newMovieKey).set(movie);
}
async function queryMovies(name, property, categoria) {
  const snap = await firebase.database().ref('/peliculas').once('value');
  const movies = [];
  snap.forEach(function (childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    movies.push({ ...childData, key: childKey });
  });
  let arr = movies.filter((value) => {
    if(categoria)
      return value[property].toLowerCase().includes(name.toLowerCase()) && value.categoria === categoria;
    return value[property].toLowerCase().includes(name.toLowerCase());
  });
  return arr;
}

function deleteMovie(key){
  firebase.database().ref('/peliculas/'+key).set({});
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, queryMethod: 'Nombre', movies: [], categoria: undefined };
  } 
  modifyMovie(modifiedMovie, key) {
    firebase.database().ref('/peliculas/' + key).set(modifiedMovie);
  }
  componentWillMount(){
    queryMovies('', this.state.queryMethod.toLowerCase(), this.state.categoria).then((res) => {
      this.setState({movies: res});
    });
  }
  handleDelete(key){
    deleteMovie(key);
  }
  refreshData(){
    queryMovies('', this.state.queryMethod.toLowerCase(), this.state.categoria).then((res) => {
      this.setState({movies: res});
    });
  }
  handleInput(){
    const input = ReactDOM.findDOMNode(this.refs.queryInput).value;
    queryMovies(input, this.state.queryMethod.toLowerCase(), this.state.categoria).then((res) => {
      this.setState({movies: res});
    });
  }
  handleClose(){
    this.setState({showModal: false});
    this.refreshData();
  }
  handleSave(movie){
    createMovie(movie);
  }
  render() {
    return (
      <div className="App" style={{ margin: 10 }}>
       <InputGroup>
          <FormControl
            placeholder={this.state.queryMethod === 'Nombre' ? 'Avengers' : 'Cuarón'}
            onInput={() => this.handleInput().bind(this)}
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
        <ButtonGroup aria-label="Basic example" style={{marginTop: 10}}>
          <Button onClick={() => {
            this.setState({categoria: this.state.categoria === 'Amor' ? undefined : 'Amor'}, function () {
              this.refreshData();
            });
          }} variant={this.state.categoria === 'Amor' ? "primary" : "secondary"}>Amor</Button>
          <Button onClick={() => {
            this.setState({categoria: this.state.categoria === 'Horror' ? undefined : 'Horror'}, function () {
              this.refreshData();
            });
          }} variant={this.state.categoria === 'Horror' ? "primary" : "secondary"}>Horror</Button>
          <Button  onClick={() => {
            this.setState({categoria: this.state.categoria === 'Acción' ? undefined : 'Acción'}, function () {
              this.refreshData();
            });
          }} variant={this.state.categoria === 'Acción' ? "primary" : "secondary"}>Acción</Button>
        </ButtonGroup>
        <ButtonGroup style={{justifyContent: 'flex-end'}}aria-label="Basic example" style={{marginTop: 10}}>
          <Button variant="success" onClick={() => this.setState({showModal: true})}>Subir</Button>
        </ButtonGroup>
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
        <Editor new showModal={this.state.showModal} save={this.handleSave} close={this.handleClose.bind(this)}></Editor>
      </div>
    );
  }

}

export default App;
