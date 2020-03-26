import React, { Component } from 'react'
import { Box, Tabs, Tab, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import QuestionList from './QuestionList'
class Home extends Component {

    state = {
        value: 0,
    }
    handleChange = (e, newValue) => {
        e.preventDefault()
        // console.log(newValue)
        this.setState({
            value: newValue
        })
    }
    a11yProps(index) {
        return {
          id: `tab-${index}`,
          'aria-controls': `tabpanel-${index}`,
        };
    }

    componentDidMount() {
        
    }

    categorizeQuestions() {
        const { questions, users, authedUser } = this.props
        let unanswered = []
        let answered = []
        if (questions && authedUser) {
            const user = users[authedUser]
            const answeredIds = Object.keys(user.answers)
            const questionIds = Object.keys(questions)
            const questionList = questionIds.map(id => questions[id])
            questionList.forEach(question => {
                let found = false
                answeredIds.forEach(id => {
                    if (question.id === id) {
                        found = true
                    }
                }) 
                if (found) {
                    answered.push(question)
                } else {
                    unanswered.push(question)
                }
            })
        }
        unanswered.sort((a, b) => b.timestamp - a.timestamp)
        answered.sort((a, b) => b.timestamp - a.timestamp)
        return { unanswered, answered }
    }

    render() {
        const { users } = this.props
        const { value } = this.state
        const { unanswered, answered } = this.categorizeQuestions()
        return (
            <Box>
                <Tabs
                    value={value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={this.handleChange}>
                    <Tab label="Unanswered Questions" {...this.a11yProps(0)}/>
                    <Tab label="Answered Questions" {...this.a11yProps(1)}/>
                </Tabs>
                <TabPanel value={value} index={0}>
                <QuestionList questions={unanswered} users={users}/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <QuestionList questions={answered} users={users}/>
                </TabPanel>
            </Box>
        )
    }
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        {...other}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </Typography>
    );
  }

function mapStateToProps ({ questions, users, authedUser }) {
    return {
      questions,
      users,
      authedUser
    }
  }

export default connect(mapStateToProps)(Home)