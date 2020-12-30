import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'

const TopAnalyzer = props => {


  return (
    <div className="App">
      <Container fluid>
      <div style={{padding:'3% 0'}}>
            <p>Your most listened to songs are {props.popularities[0]}% popular!</p>
            <p>Your most listened to artists are {props.popularities[1]}% popular!</p>
            <p>Your current top track is {props.tracksData[0].name} by {props.tracksData[0].artists[0].name} and it is {props.tracksData[0].popularity}% popular.</p>
            <p>Your current top artist is {props.artistsData[0].name} and they are {props.artistsData[0].popularity}% popular.</p>
            <p> You have an overall hipster score of {props.hipsterScore}</p>
            {props.hipsterScore > 75 && <p> Honestly..... I'm Impressed </p>}
            {props.hipsterScore <= 75 && props.hipsterScore > 50 && <p> I mean... nothing crazy, but not too bad, not too bad. </p>}
            {props.hipsterScore <= 50 && <p> Less than 50%.... not great </p>}
            <p>Below are your top Artists and Tracks along with their popularity scores!</p>
          </div>
            <Row>
            <Col>
              <ListGroup as="ul" className="p-5">
              <h3> Your Top artists:</h3>
                {props.artistsData.map((artist) => {
                  return(
                  <p>
                  <ListGroup.Item variant="dark"  style={{backgroundColor: '#1DB954'}}>
                  {artist.name}
                  <p style={{fontWeight: 'bold'}}>{artist.popularity}</p>
                  </ListGroup.Item>
                  </p>
                )
                })}
              </ListGroup>
            </Col>
            <Col>
            <ListGroup as="ul" className="p-5">
            <h3>Your Top Songs:</h3>
              {props.tracksData.map((track) => {
                return(
                <p>
                <ListGroup.Item variant="dark"  style={{backgroundColor: '#1DB954'}}>
                <p>{track.name} <p style={{fontWeight: 'bold'}}>{track.popularity}</p></p>
                </ListGroup.Item>
                </p>
              )
              })}
            </ListGroup>
            </Col>
            </Row>
      </Container>
    </div>
  );
}

export default TopAnalyzer;
