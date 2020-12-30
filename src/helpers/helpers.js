export function determinePopularity(tracks, artists) {
  var tracksPopularity = 0;
  var artistsPopularity = 0;
  var i = 0;
  var j = 0;
  tracks.forEach((track) => {
    tracksPopularity += track.popularity;
    i += 1;
  })
  artists.forEach((artist) => {
    artistsPopularity += artist.popularity;
    j += 1;
  })

   return [ 100 - (tracksPopularity/i + artistsPopularity/j)/2 , [tracksPopularity/i , artistsPopularity/j] ];
}
