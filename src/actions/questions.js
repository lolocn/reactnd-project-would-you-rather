import { showLoading, hideLoading } from 'react-redux-loading'
import { saveQuestionAnswer, saveQuestion } from '../api/api'
import { updateUserAnswer, updateUserQuestion } from './users'

export const RECIEVE_QUESTIONS = 'RECIEVE_QUESTIONS'
export const UPDATE_QUESTION_ANSWER = 'UPDATE_QUESTION_ANSWER'
export const ADD_QUESTION = 'ADD_QUESTION'

export function recieveQuestions (questions) {
    return {
        type: RECIEVE_QUESTIONS,
        questions
    }
}

export function updateQuestionAnswer (authedUser, qid, answer) {
    return {
        type: UPDATE_QUESTION_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        question
    }
}

export function handleSaveQuestionAnswer(authedUser, qid, answer) {
    return (dispatch) => {
        dispatch(showLoading())
        saveQuestionAnswer(authedUser, qid, answer)
        .then(() => {
            dispatch(updateQuestionAnswer(authedUser, qid, answer))
            dispatch(updateUserAnswer(authedUser, qid, answer))
        })
        .then(() => dispatch(hideLoading()))
    }
}

export function handleSaveQuestion(question) {
    return (dispatch) => {
        dispatch(showLoading())
        saveQuestion(question)
        .then((question) => {
            dispatch(addQuestion(question))
            dispatch(updateUserQuestion(question))
        })
        .then(() => dispatch(hideLoading()))
    }
}