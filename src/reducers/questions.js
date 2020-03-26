import { RECIEVE_QUESTIONS, UPDATE_QUESTION_ANSWER, ADD_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
    switch(action.type) {
        case RECIEVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case UPDATE_QUESTION_ANSWER:
            const authedUser = action.authedUser
            const qid = action.qid
            const answer = action.answer
            const result = {
                ...state,
                [qid]: {
                    ...state[qid],
                    [answer]: {
                      ...state[qid][answer],
                      votes: state[qid][answer].votes.concat([authedUser])
                    } 
                }
            }
            console.log(result)
            return result
        case ADD_QUESTION:
            const question = action.question
            return {
                ...state,
                [question.id]: question
            }
        default:
            return state
    }
}