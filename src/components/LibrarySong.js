import React from 'react'

const LibrarySongs = ({song,songs,id,audioRef, setCurrentSong,isPlaying, setSongs,}) => {
    const songSelectHandler = async () => {
        const selectSong = songs.filter((state) =>
        state.id === id);
        await setCurrentSong(selectSong[0]);
    
    
        //Adding active to true
       const newSongs = songs.map((song) => {
        if(song.id === id) {
            return {
                ...song,
                active: true,
            }
        }
        else {
            return{
                ...song,
                active: false,
            };
        }
       });
       setSongs(newSongs);
        // conditions to check songs is playing or not
        if(isPlaying) audioRef.current.play();
        
        
    }
    return(
        <div onClick={songSelectHandler} className={`Library-song ${song.active ? 'selected' : ""}`}>
            <img src={song.cover} alt={song.name} />
            <div className="song-description">

            <h3>{song.name}</h3>
            <h4>{song.artist}</h4>
            </div>

        </div>
    )
}
export default LibrarySongs;