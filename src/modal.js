
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form, InputGroup, FormControl, Row, Dropdown} from 'react-bootstrap';
class Editor extends React.Component {
    constructor(props) {
        super(props);
        if(props.movie){
            this.state = {
                showModal: props.showModal,
                duracion: props.movie.duracion,
                titulo: props.movie.titulo,
                reparto: props.movie.reparto,
                categoria: props.movie.categoria,
                director: props.movie.director,
                repartoInput: '',
                errorNombre: false
            };
        }
        else{
            this.state = {
                showModal: props.showModal,
                duracion: 60,
                titulo: '',
                reparto: [],
                categoria: 'Amor',
                director: '',
                repartoInput: ''
            };
        }
    }
    deleteReparto(name){
        const newReparto = this.state.reparto.filter((str) => {
            return str !== name;
        });
        this.setState({reparto: newReparto});
    }
    resetState(){
        if(this.props.new){  
            this.setState({
                duracion: 60,
                titulo: '',
                reparto: [],
                categoria: 'Amor',
                director: '',
                repartoInput: ''
            });
        }
    }
    onChange = (value, property) => {
        if(property==='titulo') this.setState({errorNombre: false});
        this.setState({ [property]: value });
    }
    renderEliminar(){
        if(!this.props.new)
        return(
            <Button variant="danger" style={{marginRight: '45%'}}onClick={() => {
                this.props.delete(this.props.movieKey);
                this.props.close();
                this.resetState();
            }}>
                Eliminar
            </Button>
        );
    }
    render() {
        const { reparto } = this.state;
        if(this.state.duracion > 2880) this.setState({duracion: 2880});
        return (
            <>
                <Modal show={this.props.showModal} onHide={() => {
                    this.props.close();
                    this.resetState();
                }} >
                    <Form style={{padding: 16}}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Título</Form.Label>
                            <Form.Control required isValid={false} value={this.state.titulo} onChange={(e) => this.onChange(e.target.value, 'titulo')}  type="text" maxLength="30" placeholder="Avengers: Endgame" ref='nombre' />
                            {this.state.errorNombre ?
                                <p style={{color: 'red'}}>{`La pelicula "${this.state.titulo}" dirigida por ${this.state.director} ya existe`}</p>
                                :
                                null
                            }
                            <Dropdown style={{marginTop: 10}}>
                                <Dropdown.Toggle variant="info" id="dropdown-basic">
                                    {this.state.categoria}
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={() => this.setState({categoria: 'Acción'})}>Acción</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setState({categoria: 'Amor'})}>Amor</Dropdown.Item>
                                    <Dropdown.Item onClick={() => this.setState({categoria: 'Horror'})}>Horror</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                            <Form.Label style={{marginTop: 10}}>Duración</Form.Label>
                            <br ></br>
                            <input type="number" onPaste={e => e.preventDefault()} onKeyDown={ e => (  e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 107 || e.keyCode === 109 || e.keyCode === 110 || e.keyCode === 187 || e.keyCode === 189) && e.preventDefault() } value={this.state.duracion} onChange={(e) => this.onChange(e.target.value, 'duracion')} name="quantity" min="1" placeholder="60" style={{width: 70, padding: 2, marginRight: 3}}></input>min
                            <br ></br>
                            <Form.Label style={{marginTop: 10}}>Director</Form.Label>
                            <Form.Control type="text"maxLength="30" value={this.state.director} onChange={(e) => this.onChange(e.target.value, 'director')} placeholder="Anthony Russo" ref='director' />
                            <Form.Label style={{marginTop: 10}}>Reparto</Form.Label>
                            
                            <InputGroup style={{ marginTop: 10 }}>
                                <FormControl
                                    placeholder={'Robert Downey Jr.'}
                                    aria-describedby="basic-addon2"
                                    ref='reparto'
                                    maxLength="30"
                                    value={this.state.repartoInput}
                                    onChange={(e) => this.onChange(e.target.value, 'repartoInput')}
                                />
                                <InputGroup.Append>
                                    <Button variant="success" disabled={this.state.repartoInput.length === 0} onClick={() => this.setState({repartoInput: '', reparto: [...this.state.reparto, ReactDOM.findDOMNode(this.refs.reparto).value]})}>Añadir</Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <div style={{marginTop: 10}}>
                                {reparto.map((field, idx) => {
                                    return (
                                        <div key={`${field}-${idx}`}>
                                            <Row style={{justifyContent: 'space-between', marginLeft: 10, marginRight: 0}}>
                                                <p>{field}</p>
                                                <Button style={{height: 35}}variant="danger" onClick={() => this.deleteReparto(field)}>Eliminar</Button>
                                            </Row>
                                        </div>
                                    );
                                })}
                            </div>
                        </Form.Group>
                    </Form>
                    <Modal.Footer>
                        {
                            this.renderEliminar()
                        }
                        <Button variant="secondary" onClick={() => {
                            this.props.close();
                            this.resetState();
                        }}>
                            Cancelar
                        </Button>
                        <Button disabled={this.state.titulo.length === 0 || this.state.director.length === 0 || this.state.reparto.length === 0} variant="primary" onClick={() => {
                            const duplicado = this.props.checarDuplicate(this.state.titulo, this.props.movieKey, this.state.director);
                            if(!duplicado){
                                this.props.save({
                                    nombre: this.state.titulo,
                                    director: this.state.director,
                                    duracion: this.state.duracion,
                                    categoria: this.state.categoria,
                                    reparto: this.state.reparto
                                }, this.props.movieKey);
                                this.props.close();
                                this.resetState();
                            }
                            else{
                                this.setState({errorNombre: true});
                            }
                        }
                        }>
                            Guardar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default Editor;