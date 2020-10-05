export const searchSong = (song) => ({
  type: 'SEARCH',
  payload: {
    song: song
  }
});
