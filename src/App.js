import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import LoadingBar from 'react-redux-loading'
import { 
  Container,
  Toolbar,
  Paper,
  AppBar,
  Grid
  } from '@material-ui/core'
import Nav from './components/Nav'
import Login from './components/Login'
import Home from './components/Home'
import NewQuestion from './components/NewQuestion'
import LeaderBoard from './components/LeaderBoard'
import QuestionDetail from './components/QuestionDetail'
import User from './components/User'
import NotFound from './components/NotFound'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Container>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Nav/>
              </Grid>
              <User></User>
            </Toolbar>          
          </AppBar>
          <LoadingBar/>
          <Paper className='content'>
            <Switch>
              <Route path='/404' component={NotFound}></Route>
              <Route path='/login' component={Login}></Route>
              <Route path='/leaderboard' component={LeaderBoard}></Route>
              <Route path='/add' component={NewQuestion}></Route>
              <Route path='/questions/:question_id' component={QuestionDetail}></Route>
              <Route path='/' component={Home} exact></Route>
            </Switch>     
          </Paper>
        </Router>
      </Container>
    )
  }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    loading: authedUser === null,
    authedUser,
    users
  }
}

export default connect(mapStateToProps)(App)
