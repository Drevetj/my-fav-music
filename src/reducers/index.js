import { combineReducers } from 'redux';

function searchSong(state = {song: null, limit: 0}, action) {
  switch(action.type) {
    case 'SEARCH':
      return {
        song: action.payload.song,
        limit: state.limit + 10
      }
    default:
      return state
  }
}

const reducerApp = combineReducers({
  searchSong
});

export default reducerApp;
