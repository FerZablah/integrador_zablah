import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import fist from './fist.svg';
import Editor from './modal';

import './App.css';

class MovieCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { showModal: false };
    }
    
    handleClick = () => {
        this.setState({showModal: true});
    }
    handleClose = () => {
        this.setState({showModal: false});
    }
    render() {
        return (
            <div style={{marginBottom: 30}}>
            <Card style={{ width: '18rem', backgroundColor: '#FF3434', borderRadius: 10, borderWidth: 0 }}>
                <Row style={{ height: '30px' }}>
                    <Col xs={{ span: 8, offset: 8 }} style={{ color: 'white', marginTop: '5%' }}>
                        <Row>
                            Acción
               <button onClick={this.handleClick} className="edit" type="submit" variant="primary" style={{ marginTop: 4, marginLeft: 4, height: 20, width: 33, fontSize: 10, textAlign: 'center', color: 'white', borderRadius: '10%' }}>edit</button>
                        </Row>
                    </Col>

                </Row>
                <Row>
                    <Card.Img className="iconCategoria" src={fist} style={{ height: 50, width: 50, backgroundColor: 'white', borderRadius: '100%', borderWidth: 100, marginLeft: 10, marginTop: 10, padding: 5 }} />
                    <hr className="divisor" style={{ backgroundColor: 'white', width: '100%', height: 10, opacity: 1 }} />
                </Row>
                <Card.Body style={{ marginTop: '18%', alignContent: 'flex-end', color: 'white' }}>
                    <Card.Title style={{ textAlign: 'left', fontSize: 24 }} >Endgame</Card.Title>
                    <Card.Text style={{ textAlign: 'left' }}>
                        87 min
            </Card.Text>
                    <div style={{ marginBottom: 10, height: 1 }}>

                    </div>
                    <div style={{ backgroundColor: 'rgba(255,255, 255, 0.1)', margin: -20, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, padding: '20px' }}>
                        <Row style={{ height: '30px' }}>
                            <Col xs={{ span: 4, offset: 0 }}>
                                <Card.Text style={{ textAlign: 'left', opacity: .5 }}>
                                    Director
                </Card.Text>
                            </Col>
                            <Col xs={{ span: 8, offset: 0 }}>
                                <Card.Text style={{ textAlign: 'left' }}>
                                    John Favreu
                </Card.Text>
                            </Col>
                        </Row>
                        <Row style={{ height: '30px', marginTop: '10px' }}>
                            <Col xs={{ span: 4, offset: 0 }}>
                                <Card.Text style={{ textAlign: 'left', lineHeight: '2px', opacity: .5 }}>
                                    Reparto
                </Card.Text>
                            </Col>
                            <Col xs={{ span: 8, offset: 0 }}>
                                <p style={{ textAlign: 'left', lineHeight: '2px' }}>
                                    Chris Evans
                </p>
                                <p style={{ textAlign: 'left', lineHeight: '2px' }}>
                                    Robert Downey Jr.
                </p>
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
                
        <Editor showModal={this.state.showModal} close={this.handleClose.bind(this)}></Editor>
            </Card>
            </div>
        );
    }
}
export default MovieCard;
