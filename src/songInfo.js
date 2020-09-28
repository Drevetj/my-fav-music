import React from 'react';
import millisToMinutesAndSeconds from './millisToMinutesAndSeconds.js'
import FavoriteSong from './favoriteSong.js';

function SongInfo({searchInfo}) {
  const [songs, setSongs]       = React.useState([])
  const [error, setError]       = React.useState(null)
  const [favorite, setFavorite] = React.useState(JSON.parse(localStorage.getItem('favorite')) || '')

  React.useEffect(() => {
    if (!searchInfo.name) {
      return
    }

    fetchSongs(searchInfo.name, searchInfo.limit).then(
      songsData => {
        setSongs(songsData)
      },
      errorData => {
        setError(errorData)
      }
    )
  }, [searchInfo])

  function fetchSongs(name, limit) {
    const headers = {
      'Content-Type':  'application/json',
      'Authorization': 'Bearer key'
    }

    return window
      .fetch('https://api.spotify.com/v1/search?q=' + name + '&type=track&limit=' + limit, {
        headers
      })
      .then(r => r.json())
      .then(response => response.tracks.items)
  }

  function addToFavorite(song) {
    setFavorite(
      [
        ...favorite,
        {
          id:       song.id,
          img:      song.album.images[0].url,
          artist:   song.album.artists[0].name,
          name:     song.album.artists[0].name,
          duration: song.duration_ms
        }
      ]
    )
  }

  function onSongRemoved(song) {
    setFavorite(favorite.filter(f => f !== song))
  }

  return (
    <div>
      <FavoriteSong favorite={favorite} onSongRemoved={(song) => onSongRemoved(song)} />

      <table>
        <thead>
          <tr>
            <th>Image de l’album</th>
            <th>Artiste</th>
            <th>Titre de la chanson</th>
            <th>Durée de la chanson</th>
            <th>Favoris</th>
          </tr>
        </thead>

        <tbody>
          {songs.map(song => (
            <tr key={song.id}>
              <td><img
                   src={song.album.images[0].url}
                   alt="new"
                   width="50"
                   height="50"
                  />
              </td>
              <td>{song.album.artists[0].name}</td>
              <td>{song.name}</td>
              <td>{millisToMinutesAndSeconds(song.duration_ms)}</td>
              <td>
                <button onClick={() => addToFavorite(song)}>
                  Ajouter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default SongInfo;
