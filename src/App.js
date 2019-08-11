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
async function queryMovies(input, property, categoria) {
  const snap = await firebase.database().ref('/peliculas').once('value');
  const movies = [];
  snap.forEach(function (childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    movies.push({ ...childData, key: childKey });
  });
  let arr = movies.filter((movie) => {
    let result = movie.nombre.toLowerCase().includes(input.toLowerCase()) || movie.director.toLowerCase().includes(input.toLowerCase());
    if(property !== 'todo')
      result = movie[property].toLowerCase().includes(input.toLowerCase());
    if(categoria)
      result = result && movie.categoria === categoria;
    return result;
  });

  return arr;
}

function deleteMovie(key){
  firebase.database().ref('/peliculas/'+key).set({});
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, queryMethod: 'Todo', movies: [], categoria: undefined };
  } 
  modifyMovie(modifiedMovie, key) {
    modifiedMovie.duracion = parseInt(modifiedMovie.duracion);
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
            onInput={() => this.handleInput()}
            aria-describedby="basic-addon2"
            ref='queryInput'
          />

          <DropdownButton
            as={InputGroup.Append}
            variant="warning"
            title={this.state.queryMethod}
            id="input-group-dropdown-2"
          >
            <Dropdown.Item onClick={() => this.setState({queryMethod: 'Todo'})}>Todo</Dropdown.Item>
            <Dropdown.Item onClick={() => this.setState({queryMethod: 'Nombre'})}>Nombre</Dropdown.Item>
            <Dropdown.Item onClick={() => this.setState({queryMethod: 'Director'})}>Director</Dropdown.Item>
          </DropdownButton>
        </InputGroup>
        <div className="d-flex justify-content-center" style={{width: '100%', marginTop: 20}}>
          <ButtonGroup aria-label="Basic example"  style={{marginTop: 10}}>
            <Button className={this.state.categoria === 'Amor' ? "Categoria-ButtonSelected border border-white" : "Categoria-Button border border-white"}  onClick={() => {
              this.setState({categoria: this.state.categoria === 'Amor' ? undefined : 'Amor'}, function () {
                this.refreshData();
              });
            }}
            >Amor</Button>
            <Button className={this.state.categoria === 'Horror' ? "Categoria-ButtonSelected border border-white" : "Categoria-Button border border-white"} onClick={() => {
              this.setState({categoria: this.state.categoria === 'Horror' ? undefined : 'Horror'}, function () {
                this.refreshData();
              });
            }} 
            >Horror</Button>
            <Button className={this.state.categoria === 'Acción' ? "Categoria-ButtonSelected border border-white" : "Categoria-Button border border-white"} onClick={() => {
              this.setState({categoria: this.state.categoria === 'Acción' ? undefined : 'Acción'}, function () {
                this.refreshData();
              });
            }} >Acción</Button>
          </ButtonGroup>
       
        <ButtonGroup style={{  marginLeft: 'auto', position: 'absolute', top: 76, right: 0, marginRight: 10}}aria-label="Basic example" >
          <Button variant="success" onClick={() => this.setState({showModal: true})}>Añadir</Button>
        </ButtonGroup>
        </div>
        <Row style={{padding: 30, marginBottom: 30}}>
          {
            this.state.movies.map((movie, idx) => {
              return (
                <div key={movie.key}>
                  <MovieCard 
                    className="card"
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
