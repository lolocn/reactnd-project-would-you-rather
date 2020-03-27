import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleSaveQuestionAnswer } from '../actions/questions'
import { withStyles } from '@material-ui/core/styles'
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
    Radio,
    Paper,
    Grid
} from '@material-ui/core'

class QuestionDetail extends Component {
    state = {
        answer: '',
        isAnswerd: false
    }
    handleChange = (e, newValue) => {
        e.preventDefault()
        this.setState({
            answer: newValue
        })
    }
    handleSubmit = e => {
        e.preventDefault()

        const { answer } = this.state
        const { question_id, authedUser, dispatch } = this.props

        dispatch(handleSaveQuestionAnswer(authedUser, question_id, answer))

        this.setState({
            answer,
            isAnswerd: true
        })

    }
    componentDidMount() {
        const { authedUser, users, question_id } = this.props
        if (authedUser) {
            const user = users[authedUser]
            const answeredIds = Object.keys(user.answers)
            let isAnswerd = false
            let answer = ''
            answeredIds.forEach(id => {
                if (id === question_id) {
                    isAnswerd = true
                    answer = user.answers[question_id]
                }
            })
            this.setState({
                isAnswerd,
                answer
            })
        }
    }
    getPercent(a, b) {
        const sum = a + b
        return Math.round((a / sum) * 100)
    }
    render() {
        const { answer, isAnswerd } = this.state
        const { authedUser, users, questions, question_id, classes } = this.props
        const question = questions[question_id]
        if (!authedUser) {
            return <Redirect to='/login' />
        }
        if (!question) {
            return <Redirect to='/404' />
        }
        if (!isAnswerd) {
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
                                <FormControlLabel value="optionOne" control={<Radio/>} label={question.optionOne.text} />
                                <FormControlLabel value="optionTwo" control={<Radio/>} label={question.optionTwo.text} />
                            </RadioGroup>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                        <Button color="primary" onClick={this.handleSubmit}>Submit</Button>
                    </CardActions>
                </Card>
            )
        } else {
            return (
                <Card>
                    <CardHeader
                        avatar={
                            <Avatar alt={users[question.author].name} src={users[question.author].avatarURL} />
                        }
                        title= {'Asked by ' + users[question.author].name}
                    >
                    </CardHeader>
                    <Divider/>
                    <CardContent className={classes.root}>
                        <Grid
                            container
                            direction="column"
                            justify="flex-start"
                            alignItems="flex-start"
                            spacing={1}
                        >
                            <Grid className={classes.gridcontent}>
                                <strong>Result</strong>
                            </Grid>
                            <Grid className={classes.gridcontent}>
                                <Paper className={classes.paper + ' ' + (answer === 'optionOne' ? classes.voted : '')}>
                                    <strong>Would you rather {question.optionOne.text}</strong>
                                    <div>
                                        <div>   
                                            {question.optionOne.votes.length} out of {question.optionOne.votes.length + question.optionTwo.votes.length} votes
                                        </div>
                                        <div>
                                            {this.getPercent(question.optionOne.votes.length, question.optionTwo.votes.length)}% users voted this option
                                        </div>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid className={classes.gridcontent}>
                                <Paper className={classes.paper +  ' ' + (answer === 'optionTwo' ? classes.voted : '')}>
                                    <strong>Would you rather {question.optionTwo.text}</strong>
                                    <div>
                                        {question.optionTwo.votes.length} out of {question.optionOne.votes.length + question.optionTwo.votes.length} votes
                                    </div>
                                    <div>
                                        { this.getPercent(question.optionTwo.votes.length, question.optionOne.votes.length)}% users voted this option
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            )
        }
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

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    gridcontent: {
        padding: theme.spacing(1),
        width: '100%',
    },
    paper: {
        padding: theme.spacing(1),
        color: 	'#666666',
        width: '100%',
    },
    voted: {
        backgroundColor: '#CCFF99',
        color: '#227700'
    }
})

export default connect(mapStateToProps)(withStyles(styles)(QuestionDetail))