import React, { Component } from 'react'
import { connect } from 'react-redux'
import { 
    Card, 
    CardHeader, 
    CardContent,
    CardActions,
    Button, 
    Avatar, 
    RadioGroup, 
    FormControl, 
    FormLabel, 
    FormControlLabel, 
    Divider,
    Radio } from '@material-ui/core'

class QuestionDetail extends Component {
    state = {
        answer: ''
    }
    handleChange = (e, newValue) => {
        e.preventDefault()
        this.setState({
            answer: newValue
        })
    }
    render() {
        const { answer } = this.state
        const { authedUser, users, questions, question_id } = this.props
        const question = questions[question_id] 
        return (
            <Card>
                <CardHeader 
                    avatar={
                        <Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
                    }
                    title= {users[question.author].name}
                    subheader='asks you a question'
                >
                </CardHeader>
                <Divider/>
                <CardContent>
                    <FormControl>
                        <FormLabel>
                            Would You Rather
                        </FormLabel>
                        <RadioGroup aria-label="answer" name="answer" value={answer} onChange={this.handleChange}>
                            <FormControlLabel value="opitonOne" control={<Radio/>} label={question.optionOne.text} />
                            <FormControlLabel value="opitonTwo" control={<Radio/>} label={question.optionTwo.text} />
                        </RadioGroup>
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button color="primary">Submit</Button>
                </CardActions>
            </Card>
        )
    }
}

function mapStateToProps ({ authedUser, users, questions }, props) {
    const { question_id } = props.match.params
  
    return {
        question_id,
        authedUser,
        users,
        questions
    }
  }

export default connect(mapStateToProps)(QuestionDetail)