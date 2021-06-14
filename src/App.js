import React,{useState,useRef} from 'react'

import './styles/app.scss'
import Player from './components/Player'
import Songs from './components/Song'
import data from './data'
import Library from './components/Library'
import Nav from './components/Nav'

function App() {
      //ref
      const audioRef = useRef(null);
      //state
    const [songs,setSongs] = useState(data());
    const [currentSong,setCurrentSong] = useState(songs[0])
    const [isPlaying,setIsPlaying] = useState(false)
    const[libraryStatus,setLibraryStatus] = useState(false)
    //state
    const [songInfo,setSonginfo] = useState({
        currentTime: 0,
        duration:0,
        animationPercentage:0,
    });
    
    //events
    const timeUpdateHandler = (e) =>{
        const current = e.target.currentTime;
        const duration = e.target.duration;

        //Calculating time Percentage
        const roundCurrent = Math.round(current);
        const roundDuration = Math.round(duration);
        const animation = Math.round((roundCurrent / roundDuration) * 100);


        setSonginfo({...songInfo, currentTime: current,duration, animationPercentage: animation})
    }
    const songEndHandler = async () =>{
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
           await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
        if(isPlaying) audioRef.current.play();
    }
    return(
        <div className={`App ${libraryStatus ? "library-active" : ""}`}>
        <Nav libraryStatus={libraryStatus} setLibraryStatus={setLibraryStatus} />
            <Songs currentSong={currentSong} />
            <Player setSongs={setSongs} songs={songs} songInfo={songInfo} setSonginfo={setSonginfo} audioRef={audioRef} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} />
            <Library libraryStatus={libraryStatus} setSongs={setSongs} isPlaying={isPlaying} audioRef={audioRef} songs={songs} setCurrentSong={setCurrentSong}/>
            <audio onEnded={songEndHandler} onTimeUpdate={timeUpdateHandler} onLoadedMetadata={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>

        </div>
    )
}
export default App