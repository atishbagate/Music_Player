import React from 'react'
import LibrarySongs from './LibrarySong';
const Library = ({ libraryStatus ,songs,setSongs ,setCurrentSong,audioRef,isPlaying}) =>{
    return(
        <div className={`library ${libraryStatus ? 'active-library': ''} `}>
            <h2>Library</h2>
            <div className="library-songs">
                {
                    songs.map((song)=>(
                        <LibrarySongs 
                        songs={songs} 
                        setCurrentSong={setCurrentSong} 
                        song={song} 
                        id={song.id}
                        key={song.id}
                        audioRef={audioRef}
                        isPlaying={isPlaying}
                        setSongs={setSongs}
                        
                        />
                    ))
                }
            </div>
        </div>
    )
}

export default Library;