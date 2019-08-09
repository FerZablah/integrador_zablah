import React from 'react';
import { Button, Card } from 'react-bootstrap';
import fist from './fist.svg';

function App() {
  return (
    <div className="App" style={{ margin: 10 }}>
      <Card style={{ width: '18rem', backgroundColor: '#FF3434', borderRadius: 10 }}>
        <Card.Img src={fist} style={{ height: 35, width: 35, backgroundColor: 'white', borderRadius: 80, borderWidth: 1000 }} />
        <Card.Body>
          <Card.Title>Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the card's content.
    </Card.Text>
          <Button variant="primary">Go somewhere</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default App;
