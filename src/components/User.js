import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'
import { 
    Avatar,
    Button,
    Grid,
    } from '@material-ui/core'
class User extends Component {
    handleLogout = e => {
        e.preventDefault()
        const { dispatch, history } = this.props
        dispatch(setAuthedUser(null))
        history.push('/login')
    }
    handleLogin = e => {
        e.preventDefault()
        const{ history } = this.props
        history.push('/login')
    }
    render() {
        const { authedUser, users } = this.props
        if (authedUser) {
            return(
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
        } else {
            return(
                <Button color="inherit" onClick={this.handleLogin}>Login</Button>
            )
        }
    }
}

function mapStateToProps ({ authedUser, users }) {
    return {
        authedUser,
        users
    }
}

export default withRouter(connect(mapStateToProps)(User))