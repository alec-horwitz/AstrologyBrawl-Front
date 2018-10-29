const shuffleSongList = (songs) => {

  let songsToShuffle = [...songs]

  let shuffledSongs = []
  let songsToShuffleLength = songsToShuffle.length
  const maxSongs = songsToShuffleLength

  for (var i = 0; i < maxSongs; i++) {
    let song = songsToShuffle[Math.floor(Math.random()*songsToShuffleLength)];
    shuffledSongs = [...shuffledSongs, song]
    let index = songsToShuffle.indexOf(song)
    songsToShuffle = [...songsToShuffle.slice(0,index), ...songsToShuffle.slice(index+1)];
    songsToShuffleLength = songsToShuffle.length
  }

  return shuffledSongs
}



const menu = [
  {name: "Basique", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688270&color=%23080000&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false", duration: 218000},
  {name: "Moon", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688271&color=%23080000&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false", duration: 228000000},
  {name: "Unsaid", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688272&color=%23080000&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false", duration: 228000},
  {name: "Intermezzo", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688276&color=%23080000&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false", duration: 37000},
  {name: "Inutile et Indispensable", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688278&color=%23080000&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false", duration: 298000},
  {name: "Fisticuffs At Dawn", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688280&color=%23080000&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false", duration: 62000},
  {name: "Start Shootin'", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688282&color=%23080000&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false", duration: 216000},
]
const battle = [
  {name: "Oblivion", url: "https://www.youtube.com/embed/s6WGNd8QR-U", duration: 311000},
  {name: "Divinations", url: "https://www.youtube.com/embed/uxelXPg961M", duration: 240000},
  {name: "Quintessence", url: "https://www.youtube.com/embed/4BgxBFwiLWI", duration: 327000},
  {name: "The Czar: Usurper / Escape / Martyr / Spiral", url: "https://www.youtube.com/embed/skJJGqnhlpM", duration: 654000},
  {name: "Ghost of Karelia", url: "https://www.youtube.com/embed/ITKcZEhP-7o", duration: 324000},
  {name: "Crack the Skye", url: "https://www.youtube.com/embed/I8zOmFqWGCY", duration: 354000},
  {name: "The Last Baron", url: "https://www.youtube.com/embed/Jw7gQUbyhjY", duration: 780000},
]

export const menuSongs = shuffleSongList(menu)

export const battleSongs = shuffleSongList(battle)



// export const menuSongs = [
//   "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/96467",
// ]
//
// export const battleSongs = [
//   "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/15434317&color=%23080000&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
//   "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/159357796&color=%23080000&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
//   "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/397487961&color=%23080000&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
//   "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/97356900&color=%23080000&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false&show_teaser=false&visual=false",
// ]


// LITTLE_PEOPLE = [
//   {name: "Basique", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688270", duration: 218000},
//   {name: "Moon", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688271", duration: 228000},
//   {name: "Unsaid", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688272", duration: 228000},
//   {name: "Intermezzo", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688276", duration: 37000},
//   {name: "Inutile et Indispensable", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688278", duration: 298000},
//   {name: "Fisticuffs At Dawn", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688280", duration: 62000},
//   {name: "Start Shootin'", url: "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1688282", duration: 216000},
// ]
//
//
// MASTODON = [
//   {name: "Oblivion", url: "https://www.youtube.com/embed/s6WGNd8QR-U", duration: 311000},
//   {name: "Divinations", url: "https://www.youtube.com/embed/uxelXPg961M", duration: 240000},
//   {name: "Quintessence", url: "https://www.youtube.com/embed/4BgxBFwiLWI", duration: 327000},
//   {name: "The Czar: Usurper / Escape / Martyr / Spiral", url: "https://www.youtube.com/embed/skJJGqnhlpM", duration: 654000},
//   {name: "Ghost of Karelia", url: "https://www.youtube.com/embed/ITKcZEhP-7o", duration: 324000},
//   {name: "Crack the Skye", url: "https://www.youtube.com/embed/I8zOmFqWGCY", duration: 354000},
//   {name: "The Last Baron", url: "https://www.youtube.com/embed/Jw7gQUbyhjY", duration: 780000},
// ]
