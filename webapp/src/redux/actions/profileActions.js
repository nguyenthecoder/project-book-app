import {
  PROFILE_FETCHED,
  PROFILE_FETCHED_FAILED
} from './index'

import { getProfile } from '../../api/profile'

const getProfileAction = () => {
  return dispatch => {
    getProfile().then(data => {
      console.log(data)
      dispatch({
        type: PROFILE_FETCHED,
        payload: data
      })
    }).catch(err => {
      console.error(err)
      dispatch({
        type: PROFILE_FETCHED_FAILED,
        payload: err
      })
    })
  }
}

export { getProfileAction }