import React from 'react';
import SongInfo from './SongInfo.js';
import { connect } from 'react-redux';
import { searchSong } from '../actions';

const SearchSong = ({ infos, onSubmitClick, moreSong }) => (
  <div>
    <form onSubmit={(event) => onSubmitClick(event)}>
      <div>
        <input id="songName" placeholder="Titre de la chanson"/>
      </div>
      <div className="p-20">
        <button type="submit">Valider</button>
      </div>
    </form>

    <hr />

    <SongInfo searchInfo={infos} />

    <div className="center p-20">
      <button onClick={() => moreSong(infos.song)}>Voir plus</button>
    </div>
  </div>
)

const mapStateToProps = state => {
  return {
    infos: {
      song: state.searchSong.song,
      limit: state.searchSong.limit
    }
  }
}

const mapDispatchToProps = dispatch => ({
  onSubmitClick: event => {
    event.preventDefault()
    let inputValue = event.target.elements.songName.value;
    dispatch(searchSong(inputValue))
  },

  moreSong: (song) => {
    dispatch(searchSong(song))
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchSong);
