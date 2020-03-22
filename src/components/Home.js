import React, { Component } from 'react'
import { Box, Tabs, Tab, Typography } from '@material-ui/core'
import { connect } from 'react-redux'
import QuestionList from './QuestionList'
class Home extends Component {

    state = {
        value: 0,
        unanswered: [],
        answered: []
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
        const { questions } = this.props
        let unanswered = []
        let answered = []
        if (questions) {
            const questionIds = Object.keys(questions)
            const questionList = questionIds.map(id => questions[id])
            questionList.forEach(question => {
                if (question.optionOne.votes.length > 0 || question.optionTwo.votes.length > 0) {
                    answered.push(question)
                } else {
                    unanswered.push(question)
                }
            })
        }
        this.setState({
            unanswered: unanswered,
            answered: answered
        })
    }

    render() {
        const { users } = this.props
        const { value, unanswered, answered } = this.state
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

function mapStateToProps ({ questions, users }) {
    return {
      questions,
      users
    }
  }

export default connect(mapStateToProps)(Home)