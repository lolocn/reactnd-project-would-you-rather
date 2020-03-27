import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
    Box,
    Select,
    Button
} from '@material-ui/core'
import { setAuthedUser } from '../actions/authedUser'
import { withRouter } from 'react-router-dom'
class Login extends Component {

    state = {
        user: ''
    }

    handleChange = (event) => {
        const selUser = event.target.value
        this.setState(() => ({user: selUser}))
    }

    handleLogin = (event) => {
        event.preventDefault()
        const { user } = this.state
        if (user) {
            const { dispatch, history } = this.props
            dispatch(setAuthedUser(user))
            history.goBack()
        } else {
            alert("Please select a user to login")
        }
    }

    render() {
        const { user } = this.state
        const { userList } = this.props
        return (
            <Box color="text.primary">
                <h1>Welcome to Would You Rather App!</h1>
                <p>
                    <strong>Please Sign in</strong>
                </p>
                <Select
                    native
                    value={user}
                    onChange={this.handleChange}
                    >
                        <option key='' value=''></option>
                    {
                        userList
                        ? userList.map(user => {
                            return (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            )
                        })
                        : ''
                    }
                </Select>
                <Button onClick={this.handleLogin} variant="contained" color="primary">Login</Button>
            </Box>
        )
    }
}

function mapStateToProps ({ authedUser, users }) {
    const userIds = Object.keys(users)
    const userList = userIds.map(id => users[id])
    return {
      authedUser,
      userList
    }
  }
export default withRouter(connect(mapStateToProps)(Login))