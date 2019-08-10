
import React from 'react';
import ReactDOM from 'react-dom';
import { Modal, Button, Form, InputGroup, FormControl, Row, Dropdown} from 'react-bootstrap';
class Editor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: props.showModal, reparto: ['aaa','bbb','cccc','dddd'], categoria: 'Amor' };
    }
    deleteReparto(name){
        const newReparto = this.state.reparto.filter((str) => {
            return str !== name;
        });
        this.setState({reparto: newReparto});
    }
    render() {
        const { reparto } = this.state;
        return (
            <>
                <Modal show={this.props.showModal} onHide={this.props.close} >
                    <Form style={{padding: 16}}>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Título</Form.Label>
                            <Form.Control type="text" placeholder="Avengers: Endgame" ref='nombre' />
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
                            <input type="number" name="quantity" min="1" placeholder="60" style={{width: 50, padding: 2, marginRight: 3}}></input>min
                            <br ></br>
                            <Form.Label style={{marginTop: 10}}>Director</Form.Label>
                            <Form.Control type="text" placeholder="Anthony Russo" ref='director' />
                            <Form.Label style={{marginTop: 10}}>Reparto</Form.Label>
                            
                            <InputGroup style={{ marginTop: 10 }}>
                                <FormControl
                                    placeholder={'Robert Downey Jr.'}
                                    aria-describedby="basic-addon2"
                                    ref='reparto'
                                />
                                <InputGroup.Append>
                                    <Button variant="success" onClick={() => this.setState({reparto: [...this.state.reparto, ReactDOM.findDOMNode(this.refs.reparto).value]})}>Añadir</Button>
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
                        <Button variant="secondary" onClick={this.props.close}>
                            Cancelar
                </Button>
                        <Button variant="primary" onClick={() => /*this.props.close*/console.log(ReactDOM.findDOMNode(this.refs.director))}>
                            Guardar
                </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default Editor;