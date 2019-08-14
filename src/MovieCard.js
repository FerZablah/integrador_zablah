import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import bomb from './bomb.svg';
import ghost from './ghost.svg';
import heart from './heart.svg';
import Editor from './modal';
import './App.css';
import CardForm from './cardForm';

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
                    bgColor:'#FF637D',
                    iconCircleColor: 'white',
                    icon: heart
                });
            case 'Acción':
                return({
                    bgColor:'rgb(0,186,173)',
                    iconCircleColor: 'white',
                    icon: bomb
            });
            case 'Horror':
                return({
                    bgColor:'#5d6d7e',
                    iconCircleColor: 'white',
                    icon: ghost
                });
            default: 
                return({
                    bgColor:'#EE5776',
                    iconCircleColor: 'white',
                    icon: heart
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
        if(this.state.edit){
            const movieToEdit = {
                categoria: this.props.categoria,
                duracion: this.props.duracion,
                director: this.props.director,
                reparto: this.props.reparto,
                nombre: this.props.titulo,
                movieKey: this.props.movieKey
            }
            return (
                <CardForm
                    className="card"
                    movieToEdit={movieToEdit}
                    style={{margin: 10}}
                    save={this.props.save}
                    refresh={this.props.refresh}
                    delete={this.props.delete}
                    checarDuplicate={this.props.checarDuplicate}
                    showModal={true}
                    editMode
                    cancel={() => this.setState({edit: false})}
                />
            );
        }
        return (
            <div style={{marginBottom: 30, marginRight: 30}} >
            <Card className="overflow-hidden" style={{ width: '18rem', backgroundColor: style.bgColor, borderRadius: 10, height: 300, borderWidth: 0 }} >
                <Row style={{ height: '30px' }}>
                    <Col xs={{ span: 8, offset: 8 }} style={{ color: 'white', marginTop: '5%' }}>
                        <Row>
                            {this.props.categoria}
               <button onClick={() => this.setState({edit: true})} className="edit" ref="editButton" type="submit" variant="primary" style={{ marginTop: 4, marginLeft: 4, height: 20, width: 33, fontSize: 10, textAlign: 'center', color: 'white', borderRadius: '10%' }}>edit</button>
                        </Row>
                    </Col>

                </Row>
                <Row>
                    <Card.Img className="iconCategoria" src={style.icon} style={{ color: 'red', height: 50, width: 50, backgroundColor: style.iconCircleColor, borderRadius: '100%', borderWidth: 100, marginLeft: 10, marginTop: 10, padding: 5 }} />
                    <hr className="divisor" style={{ backgroundColor: 'white', width: '100%', height: 10, opacity: 1 }} />
                </Row>
                <Card.Body style={{ margin: 0, marginTop: '18%', height: 'auto', alignContent: 'flex-end', color: 'white' }}>
                    <Card.Title style={{ textAlign: 'left', fontSize: 24 }} >{this.props.titulo}</Card.Title>
                    <Card.Text style={{ textAlign: 'left' }}>
                        {this.props.duracion} min
            </Card.Text>
                </Card.Body>
                <Card.Footer style={{ backgroundColor: 'rgba(255,255, 255, 0.1)', height: 400, padding: '8px' }}>
                        <Row style={{ height: '30px' }}>
                            <Col xs={{ span: 4, offset: 0 }}>
                                <Card.Text style={{ textAlign: 'left', opacity: .8, color: 'white' }}>
                                    <b>Director</b>
                            </Card.Text>
                            </Col>
                            <Col xs={{ span: 8, offset: 0 }}>
                                <Card.Text style={{ textAlign: 'left', color: 'white' }}>
                                   {this.props.director}
                </Card.Text>
                            </Col>
                        </Row>
                        <Row style={{ height: 'auto', marginTop: '10px' }}>
                            <Col xs={{ span: 4, offset: 0 }}>
                                <Card.Text style={{ textAlign: 'left', lineHeight: '2px', opacity: .8, color: 'white' }}>
                                    <b>Reparto</b>
                                 </Card.Text>
                            </Col>
                            <Col xs={{ span: 8, offset: 0 }}>
                            {this.props.reparto.map((field, idx) => {
                                if(idx>2)
                                    return(
                                        <div key={`${field}-${idx}`}>
                                            <p style={{ textAlign: 'left', lineHeight: '2px', color: 'white' }}>
                                                ...
                                            </p>
                                        </div>
                                    )
                                    return (
                                        <div key={`${field}-${idx}`}>
                                            <p style={{ textAlign: 'left', lineHeight: '2px', color: 'white' }}>
                                                {field}
                                            </p>
                                        </div>
                                    );
                                })}
                            </Col>
                        </Row>
                    </Card.Footer>
            </Card>
            </div>
        );
    }
}
export default MovieCard;
