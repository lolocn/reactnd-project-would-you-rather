import { getInitialData } from '../api/api'
import { receiveUsers } from '../actions/users'
import { recieveQuestions } from '../actions/questions'
import { showLoading, hideLoading } from 'react-redux-loading'

export function handleInitialData () {
    return (dispatch) => {
      dispatch(showLoading())
      return getInitialData()
        .then(({ users, questions }) => {
          dispatch(receiveUsers(users))
          dispatch(recieveQuestions(questions))
          dispatch(hideLoading())
        })
    }
  } 