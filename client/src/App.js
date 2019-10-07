import React, { Component } from 'react'

// Bootstrap & CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'reactstrap'
import './App.css';

// Redux
import { Provider } from 'react-redux'
import store from './store'

// My Components
import AllNotes from './components/AllNotes'
import WritingSpace from './components/WritingSpace'
import Tools from './components/Tools'
import LogInForm from './components/LogInForm'


class App extends Component {
  
  render() {
    return(
      <Provider store={store}>
        <Container className = "container-fluid d-flex flex-column main-container">
            <Tools/>
          <Row className = "flex-grow-1">
            <Col className = "col-md-3 my-col allPrevNotes ">
                <AllNotes/>
              </Col>
              <Col className = "col-md-9 my-col textarea-holder">
                <WritingSpace/>
              </Col>
            </Row>
            <LogInForm/>
          </Container>
        </Provider>
    )
  }

}

export default App;
