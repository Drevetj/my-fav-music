import React from 'react';
import millisToMinutesAndSeconds from './MillisToMinutesAndSeconds.js'

function FavoriteSong({ favorite, onSongRemoved }) {
  React.useEffect(() => {
    window.localStorage.setItem('favorite', JSON.stringify(favorite))
  }, [favorite])

  if (favorite.length > 0) {
    return (
      <table>
        <thead>
          <tr>
            <th>Image de l’album</th>
            <th>Artiste</th>
            <th>Titre de la chanson</th>
            <th>Durée de la chanson</th>
          </tr>
        </thead>

        <tbody>
          {favorite.map(song => (
            <tr key={song.id}>
              <td><img
                   src={song.img}
                   alt="new"
                   width="50"
                   height="50"
                  />
              </td>
              <td>{song.name}</td>
              <td>{song.name}</td>
              <td>{millisToMinutesAndSeconds(song.duration)}</td>
              <td>
                <button onClick={() => onSongRemoved(song)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  } else {
    return (null)
  }
}

export default FavoriteSong;
