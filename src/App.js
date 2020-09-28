import React from 'react';
import logo from './logo.svg';
import './App.css';
import SongInfo from './songInfo.js';

function App() {
  const [searchInfo, setSearchInfo] = React.useState({name: '', limit: 10})

  function handleSubmit(event) {
    event.preventDefault()
    setSearchInfo({...searchInfo, name: event.target.elements.songName.value})
  }

  function reloadResearch() {
    setSearchInfo({...searchInfo, limit: searchInfo.limit + 10})
  }

  return (
    <div className='App'>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="songName">Titre de la chanson</label>
          <div>
            <input id="songName" />
            <button type="submit">Valider</button>
          </div>
        </form>
        <hr />

        <SongInfo searchInfo={searchInfo} />

        <button onClick={() => reloadResearch()}>Voir plus</button>
      </div>
    </div>
  );
}

export default App;
