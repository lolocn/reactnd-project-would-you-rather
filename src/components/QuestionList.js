import React from 'react'
import { List } from '@material-ui/core'
import Question from './Question'


function QuestionList(props) {
    const { questions, users } = props
    return (
        <List>
            {
                questions && questions.map(question => (
                    <Question key={question.id} question={question} user={users[question.author]}/>
                ))
            }
        </List>
    )
}

export default QuestionList