import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import bomb from './bomb.svg';
import ghost from './ghost.svg';
import heart from './heart.svg';
import Editor from './modal';
import ReactDOM from 'react-dom';

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
        this.props.refresh();
    }
    getCategoryStyle(){
        switch(this.props.categoria){
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
        }
            
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
        return (
            <div style={{marginBottom: 30, marginRight: 30}} >
            <Card style={{ width: '18rem', backgroundColor: style.bgColor, borderRadius: 10, height: 'auto', borderWidth: 0 }} >
                <Row style={{ height: '30px' }}>
                    <Col xs={{ span: 8, offset: 8 }} style={{ color: 'white', marginTop: '5%' }}>
                        <Row>
                            {this.props.categoria}
               <button onClick={this.handleClick} className="edit" ref="editButton" type="submit" variant="primary" style={{ marginTop: 4, marginLeft: 4, height: 20, width: 33, fontSize: 10, textAlign: 'center', color: 'white', borderRadius: '10%' }}>edit</button>
                        </Row>
                    </Col>

                </Row>
                <Row>
                    <Card.Img className="iconCategoria" src={style.icon} style={{ color: 'red', height: 50, width: 50, backgroundColor: style.iconCircleColor, borderRadius: '100%', borderWidth: 100, marginLeft: 10, marginTop: 10, padding: 5 }} />
                    <hr className="divisor" style={{ backgroundColor: 'white', width: '100%', height: 10, opacity: 1 }} />
                </Row>
                <Card.Body style={{ marginTop: '18%', alignContent: 'flex-end', color: 'white' }}>
                    <Card.Title style={{ textAlign: 'left', fontSize: 24 }} >{this.props.titulo}</Card.Title>
                    <Card.Text style={{ textAlign: 'left' }}>
                        {this.props.duracion} min
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
                                   {this.props.director}
                </Card.Text>
                            </Col>
                        </Row>
                        <Row style={{ height: 'auto', marginTop: '10px' }}>
                            <Col xs={{ span: 4, offset: 0 }}>
                                <Card.Text style={{ textAlign: 'left', lineHeight: '2px', opacity: .5 }}>
                                    Reparto
                                 </Card.Text>
                            </Col>
                            <Col xs={{ span: 8, offset: 0 }}>
                            {this.props.reparto.map((field, idx) => {
                                    return (
                                        <div key={`${field}-${idx}`}>
                                            <p style={{ textAlign: 'left', lineHeight: '2px' }}>
                                                {field}
                                            </p>
                                        </div>
                                    );
                                })}
                            </Col>
                        </Row>
                    </div>
                </Card.Body>
                
        <Editor showModal={this.state.showModal} delete={this.props.delete} close={this.handleClose.bind(this)} save={this.props.save} movie={this.props} movieKey={this.props.movieKey}></Editor>
            </Card>
            </div>
        );
    }
}
export default MovieCard;
