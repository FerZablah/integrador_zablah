import React from 'react';
import { Card, Collapse, Row, Col, Dropdown, Button, Form, DropdownButton, InputGroup } from 'react-bootstrap';
import bomb from './bomb.svg';
import ghost from './ghost.svg';
import heart from './heart.svg';
import film from './film.svg';
import './App.css';

class CardForm extends React.Component {
    constructor(props) {
        super(props);
        if(props.movieToEdit){
            const { categoria, duracion, director, reparto, nombre, movieKey} = props.movieToEdit;
            this.state={
                categoria,
                showCard: true,
                duracion,
                director,
                reparto,
                repartoInput: '',
                nombre,
                errorNombre: false,
                movieKey
            }
        }
        else {
            this.state={
                categoria: 'Categoria',
                showCard: true,
                duracion: 60,
                director: '',
                reparto: [],
                repartoInput: '',
                nombre: '',
                errorNombre: false
            }
        }
        console.log(this.state);
    }
    resetState(){
        this.setState({
            categoria: 'Categoria',
            showCard: true,
            duracion: 60,
            director: '',
            reparto: [],
            repartoInput: '',
            nombre: ''
        }, () => {
            this.props.cancel();
        });
    }
    onChange = (value, property) => {
        if(property==='nombre') this.setState({errorNombre: false});
        this.setState({ [property]: value });
      }
    getCategoryStyle(){
        switch(this.state.categoria){
            case 'Amor':
                return({
                    bgColor:'#EE5776',
                    iconCircleColor: 'white',
                    icon: heart
                });
            case 'Acción':
                return({
                    bgColor:'#FF3535',
                    iconCircleColor: 'white',
                    icon: bomb
                });
            case 'Horror':
                return({
                    bgColor:'#485460',
                    iconCircleColor: 'white',
                    icon: ghost
                });
            default:
                return({
                    bgColor:'#F79F1F',
                    iconCircleColor: 'white',
                    icon: film
                });

        }
            
    }
    deleteProtagonista(protagonista){
        const newReparto = this.state.reparto.filter((protagonistaState) => {
            return protagonistaState !== protagonista;
        });
        this.setState({reparto: newReparto});
    }
    validateInputs(){
        let bool = this.state.nombre !== '';
        bool = bool && this.state.director !== '';
        bool = bool && this.state.duracion > 0 && this.state.duracion < 2881;
        bool = bool && this.state.reparto.length > 0;
        bool = bool && this.state.categoria !== 'Categoria';
        return bool;
    }
    
    handleClose(){
        this.setState({showCard: false});
        this.setState({
            showCard: false
        }, () => {
            this.forceUpdate();
        });

    }
    render() {
        let style = this.getCategoryStyle();
        if(!style){
            style={
                bgColor:'#EE5776',
                iconCircleColor: 'white',
                icon: heart
            }
        }
        const canSave = this.validateInputs();
        return (
            <Collapse in={this.props.showModal}>
            <Card style={{ width: '18rem', backgroundColor: style.bgColor, borderRadius: 10, height: 'auto', borderWidth: 0, marginRight: 30, marginBottom: 20 }} >
                <Row style={{ height: '30px' }}>
                    <Col xs={{ span: 8, offset: 6 }} style={{ color: 'white', marginTop: '5%' }}>
                    <DropdownButton
                        as={InputGroup.Append}
                        variant="primary"
                        title={this.state.categoria}
                        id="input-group-dropdown-2"
                    >
                        <Dropdown.Item onClick={() => this.setState({categoria: 'Amor'})}>Amor</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.setState({categoria: 'Acción'})}>Acción</Dropdown.Item>
                        <Dropdown.Item onClick={() => this.setState({categoria: 'Horror'})}>Horror</Dropdown.Item>
                    </DropdownButton>
                    
                    </Col>

                </Row>
                <Row>
                    <Card.Img className="iconCategoria" src={style.icon} style={{ color: 'red', height: 50, width: 50, backgroundColor: style.iconCircleColor, borderRadius: '100%', borderWidth: 100, marginLeft: 10, marginTop: 10, padding: 5 }} />
                    <hr className="divisor" style={{ backgroundColor: 'white', width: '100%', height: 10, opacity: 1 }} />
                </Row>
                <Card.Body style={{ marginTop: '18%', alignContent: 'flex-end', color: 'white' }}>
                <Form.Group className="d-flex flex-column bd-highlight mb-3" controlId="formBasicEmail">
                
                <Form.Control value={this.state.nombre} onChange={(e) => this.onChange(e.target.value, 'nombre')} type="text" maxLength="30"  style={{heigh: 10, fontSize: 14}} placeholder="Avengers" ref='nombre' />
                    {this.state.errorNombre ?
                        <p style={{color: 'white', padding: 10, borderRadius: 10, textAlign: 'left', backgroundColor: 'rgba(255,0,0,0.3)'}}>{`La pelicula "${this.state.nombre}" dirigida por ${this.state.director} ya existe`}</p>
                        :
                        null
                    }
                    <div style={{width: 100, marginTop: 10}}>
                        <input type="number"
                            onPaste={e => e.preventDefault()}
                            onKeyDown={ e => (  e.keyCode === 69 || e.keyCode === 190 || e.keyCode === 107 || e.keyCode === 109 || e.keyCode === 110 || e.keyCode === 187 || e.keyCode === 189) && e.preventDefault() }
                            value={this.state.duracion} onChange={(e) => this.onChange(e.target.value, 'duracion')}
                            name="quantity" min="1" placeholder="60" 
                            style={{alignSelf: 'flex-start', width: 70, padding: 2, marginRight: 3}}
                        />
                        min 
                    </div>
                                
                    <div style={{ marginBottom: 10, height: 1 }}>

                    </div>
                    </Form.Group>
                    <div style={{ backgroundColor: 'rgba(255,255, 255, 0.1)', margin: -20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: '20px' }}>
                        <Row style={{ height: 'auto' }}>
                            <Col xs={{ span: 4, offset: 0 }}>
                                <Card.Text style={{ textAlign: 'left', opacity: .5 }}>
                                    Director
                                </Card.Text>
                            </Col>
                            <Col xs={{ span: 8, offset: 0 }}>
                            <Form.Control value={this.state.director} onChange={(e) => this.onChange(e.target.value, 'director')} type="text" maxLength="30"  style={{heigh: 10, fontSize: 14}} placeholder="Anthony Russo" ref='director' />
                            </Col>
                        </Row>
                        <Row style={{ height: 'auto', marginTop: '10px' }}>
                            <Col xs={{ span: 4, offset: 0 }}>
                                <Card.Text style={{ textAlign: 'left', lineHeight: '2px', opacity: .5 }}>
                                    Reparto
                                 </Card.Text>
                            </Col>
                            <Col xs={{ span: 8, offset: 0 }} style={{alignItems: 'end'}} >
                                <Row style={{margin: 0, marginTop: 10, alignItems: 'center'}}>
                                    <Form.Control onChange={(e) => this.onChange(e.target.value, 'repartoInput')} type="text" maxLength="30" value={this.state.repartoInput} style={{width:'70%', heigh: 10, fontSize: 14}} placeholder="Anthony Russo" ref='director' />
                                    <button onClick={() => {
                                        if(this.state.repartoInput !== '' && !this.state.reparto.includes(this.state.repartoInput))
                                            this.setState({reparto: [...this.state.reparto, this.state.repartoInput], repartoInput: ''});
                                    }}
                                    className="edit" style={{margin: 0, marginLeft: 10, padding: 0, width:'20%', height:30, borderRadius: 90, textAlign: 'center', color: 'white', backgroundColor: 'green', fontSize: 20}}>+</button>
                                </Row>
                                {
                                    this.state.reparto.map((protagonista) => {
                                        return(
                                            <Row key={protagonista} style={{margin: 0, marginTop: 10, alignItems: 'center'}}> 
                                                <p style={{margin: 0, borderRadius: 10, padding: 3, width:'70%', textAlign: 'left', backgroundColor: 'rgba(255,255,255, 0.3)'}}>{protagonista}</p>
                                                <button onClick={() => this.deleteProtagonista(protagonista)} className="edit" style={{margin: 0, marginLeft: 10, padding: 0, width:'20%', height:30, borderRadius: 90, textAlign: 'center', color: 'white', backgroundColor: 'red', fontSize: 20}}>-</button>
                                            </Row>
                                        )
                                    })
                                }
                            </Col>
                            <Button variant="danger" onClick={() => {
                                    this.props.delete(this.state.movieKey);
                            }} style={{margin: 0, marginRight: 10, marginLeft: 'auto', marginTop: 10}}>Borrar</Button>
                            <Button variant="secondary" onClick={() => {
                                    this.props.cancel();
                                    this.resetState();
                            }} style={{margin: 0, marginRight: 10, marginLeft: 'auto', marginTop: 10}}>Cancelar</Button>
                            <Button variant="success" disabled={!canSave} onClick={() => {
                                const duplicado = this.props.checarDuplicate(this.state.nombre, this.props.movieKey, this.state.director);
                                if(!duplicado){
                                    this.props.save({
                                        nombre: this.state.nombre,
                                        director: this.state.director,
                                        duracion: this.state.duracion,
                                        categoria: this.state.categoria,
                                        reparto: this.state.reparto
                                    }, this.state.movieKey);
                                    this.resetState();
                                    this.props.cancel();
                                }
                                else{
                                    this.setState({errorNombre: true});
                                }
                            }
                            } style={{margin: 0, marginRight: 10, marginLeft: 'auto', marginTop: 10}}>Guardar</Button>
                        </Row>
                    </div>
                </Card.Body>
            </Card>
            </Collapse>
        );
    }
}
export default CardForm;
