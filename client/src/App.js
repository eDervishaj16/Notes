import React, { Component } from 'react'

// Bootstrap & CSS
import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col } from 'reactstrap'
import './App.css';

// Redux
import { Provider } from 'react-redux'
import store from './store'

// Reducers
import { loadUser } from './actions/authActions'

// My Components
import AllNotes from './components/AllNotes'
import WritingSpace from './components/WritingSpace'
import Tools from './components/Tools'
import MyAlert from './components/MyAlert';


class App extends Component {

  // Load user directly when the app loads
  componentDidMount(){
    store.dispatch(loadUser())
  }
  
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
          </Container>
        </Provider>
    )
  }

}

export default App;
