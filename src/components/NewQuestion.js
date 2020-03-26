import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleSaveQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { 
    Card,
    CardHeader, 
    CardContent,
    CardActions,
    Divider,
    Button,
    TextField, } from '@material-ui/core'

class NewQuestion extends Component {

    state = {
        optionOneText: '',
        optionTwoText: '',
        toHome: false
    }
    handleSubmit = e => {
        e.preventDefault()
        const { optionOneText, optionTwoText } = this.state
        const { authedUser, dispatch } = this.props

        dispatch(handleSaveQuestion({ optionOneText, optionTwoText, author: authedUser }))

        this.setState(() => ({
            optionOneText,
            optionTwoText,
            toHome: true
        }))

    }

    handleChangeOne = e => {
        const text = e.target.value
        this.setState({
            optionOneText: text
        })
    }
    handleChangeTwo = e => {
        const text = e.target.value
        this.setState({
            optionTwoText: text
        })
    }
    render() {
        
        const { optionOneText, optionTwoText, toHome } = this.state

        if (toHome === true) {
            return <Redirect to='/' />
        }

        return (
            <Card>
                <CardHeader title='Create New Question'>
                </CardHeader>
                <Divider/>
                <CardContent>
                    <div>Complete the question:</div><br/>
                    <div><strong>Would You Rather...</strong></div><br/>
                    <TextField label='Option One' fullWidth value={optionOneText} onChange={this.handleChangeOne}></TextField>
                    <br/><strong>or</strong><br/>
                    <TextField label='Option Two' fullWidth value={optionTwoText} onChange={this.handleChangeTwo}></TextField>
                </CardContent>
                <CardActions>
                    <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                </CardActions>
            </Card>
        )
    }
}

function mapStateToProps ({ authedUser}) {
  
    return {
        authedUser,
    }
}

export default connect(mapStateToProps)(NewQuestion)