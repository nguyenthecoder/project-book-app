import {
  WATCHLIST_FETCHED,
  WATCHLIST_FETCH_FAILED,
  WATCHLIST_UPDATED,
  WATCHLIST_UPDATE_FAILED
} from './index'

import { getWatchlist, addWatchlistItem, removeWatchlistItem } from '../../api/market'

const getWatchlistAction = () => {
  return dispatch => {
    getWatchlist().then(data => {
      console.log('watch list fetched ' + JSON.stringify(data))
      dispatch({
        type: WATCHLIST_FETCHED,
        payload: data
      })
    }).catch(err => {
      console.error(err)
      dispatch({
        type: WATCHLIST_FETCH_FAILED,
        payload: err
      })
    })
  }
}

const addWatchlistAction = (symbol) => {
  return dispatch => {
    addWatchlistItem(symbol).then(data => {
      dispatch({
        type: WATCHLIST_UPDATED,
        payload: symbol
      })
    }).catch(err => {
      dispatch({
        type: WATCHLIST_UPDATE_FAILED,
        payload: err
      })
    })
  }
}

const removeWatchlistAction = (symbol) => {
  return dispatch => {
    removeWatchlistItem(symbol).then(data => {
      dispatch({
        type: WATCHLIST_UPDATED,
        payload: symbol
      })
    }).catch(err => {
      dispatch({
        type: WATCHLIST_UPDATE_FAILED,
        payload: err
      })
    })
  }
}

export { getWatchlistAction, addWatchlistAction, removeWatchlistAction }