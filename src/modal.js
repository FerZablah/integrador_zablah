
import React from 'react';
import { Modal, Button, Form} from 'react-bootstrap';

class Editor extends React.Component {

    constructor(props) {
        
        super(props);
        
        console.log(props, 'constructor');
        this.state = { showModal: props.showModal };
    }
    render() {
        console.log(this.props);
        return (
            <>
                <Button variant="primary" onClick={this.handleShow}>
                    Launch demo modal
            </Button>

                <Modal show={this.props.showModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
    </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="formBasicChecbox">
                            <Form.Check type="checkbox" label="Check me out" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
  </Button>
                    </Form>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }
}

export default Editor;