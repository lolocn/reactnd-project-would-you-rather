import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import { setAuthedUser } from './actions/authedUser'
import LoadingBar from 'react-redux-loading'
import { 
  Container,
  Toolbar,
  Paper,
  AppBar,
  Avatar,
  Button,
  Grid
  } from '@material-ui/core'
import Nav from './components/Nav'
import Login from './components/Login'
import Home from './components/Home'
import NewQuestion from './components/NewQuestion'
import LeaderBoard from './components/LeaderBoard'
import QuestionDetail from './components/QuestionDetail'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
class App extends Component {
  
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  handleLogout = e => {
    e.preventDefault()
    const { dispatch } = this.props
    dispatch(setAuthedUser(null))
  }
  render() {
    const {authedUser, users } = this.props
    return (
      <Container>
        <Router>
          <AppBar position="static">
            <Toolbar>
              <Grid container direction="row" justify="flex-start" alignItems="center">
                <Nav/>
              </Grid>
              {
                authedUser && (
                  <Grid container direction="row" justify="flex-end" alignItems="center">
                    <Grid>
                      <Avatar src={users[authedUser].avatarURL}/>
                    </Grid>
                    <Grid>
                      {users[authedUser].name}
                    </Grid>
                    <Grid>
                      <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
                    </Grid>
                  </Grid>
                )
              }
            </Toolbar>          
          </AppBar>
          <LoadingBar/>
          <Paper className='content'>
            <Switch>
              <Route path='/login' component={Login}></Route>
              <Route path='/leaderboard' component={LeaderBoard}></Route>
              <Route path='/add' component={NewQuestion}></Route>
              <Route path='/questions/:question_id' component={QuestionDetail}></Route>
              <Route path='/' component={Home}></Route>
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
