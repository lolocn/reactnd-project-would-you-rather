import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import { setAuthedUser } from './actions/authedUser'
import LoadingBar from 'react-redux-loading'
import { 
  Container,
  Toolbar,
  Grid,
  AppBar,
  Avatar,
  Button
  } from '@material-ui/core'
import Nav from './components/Nav'
import Login from './components/Login'
import Home from './components/Home'
import NewQuestion from './components/NewQuestion'
import LeaderBoard from './components/LeaderBoard'
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
              <Nav/>
              {
                authedUser && (
                  <div>
                    <Avatar src={users[authedUser].avatarURL}/>
                    {users[authedUser].name}
                    <Button onClick={this.handleLogout}>Logout</Button>
                  </div>
                )
              }
            </Toolbar>          
          </AppBar>
          <LoadingBar/>
          <Grid
            container
            direction="row"
            justify="center"
            alignItems="flex-start"
            className="content"
          >
            <Grid container item xs={6}>
              <Switch>
                <Route path='/login' component={Login}></Route>
                <Route path='/leaderboard' component={LeaderBoard}></Route>
                <Route path='/add' component={NewQuestion}></Route>
                <Route path='/' component={Home}></Route>
              </Switch>     
            </Grid>
          </Grid>
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
