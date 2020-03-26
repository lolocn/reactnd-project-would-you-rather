import { RECEIVE_USERS, UPDATE_USER_ANSWER, UPDATE_USER_QUESTION } from '../actions/users'

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVE_USERS:
            return {
                ...state,
                ...action.users
            }
        case UPDATE_USER_ANSWER: {
            const authedUser = action.authedUser
            const qid = action.qid
            const answer = action.answer
            const result = {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    answers: {
                        ...state[authedUser].answers,
                        [qid]: answer
                    }
                }
            }
            return result
        }
        case UPDATE_USER_QUESTION: {
            const authedUser = action.authedUser
            const qid = action.qid
            const result = {
                ...state,
                [authedUser]: {
                    ...state[authedUser],
                    questions: state[authedUser].questions.concat([qid])
                }
            }
            return result
        }
        default:
            return state
    }
} 