import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPlay, faAngleLeft,faAngleRight ,faPause} from '@fortawesome/free-solid-svg-icons'
import Songs from './Song'
// import {playAudio} from '../util' 


const Player = ({setSongs ,songs, audioRef,currentSong ,setIsPlaying, isPlaying,songInfo,setSonginfo,setCurrentSong}) => {
    
   const activeLibraryHandler = (nextPrev) =>{
        //Adding active to true
     const newSongs = songs.map((song) => {
      if(song.id === nextPrev.id) {
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
  }
   

    //event Handler
    const playSong = () =>{
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(!isPlaying)
        }
        else{
            audioRef.current.play();
            setIsPlaying(!isPlaying)
        }
    }
    const getTime = (time) => {
        return  (
            Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
        );
    };
  const dragHandler = (e) =>{
      audioRef.current.currentTime = e.target.value;
            setSonginfo({...songInfo,currentTime:e.target.value})
  }
  const skipTrackHandler = async (direction) => {
        let currentIndex = songs.findIndex((song) => song.id === currentSong.id);
        if(direction === 'skip-forward') {
           await setCurrentSong(songs[(currentIndex + 1) % songs.length]);
           activeLibraryHandler(songs[(currentIndex + 1) % songs.length]);
        }
        if(direction === 'skip-back') {
            if((currentIndex - 1) % songs.length === -1){
                await setCurrentSong(songs[songs.length - 1]);
                activeLibraryHandler(songs[songs.length - 1]);
                if(isPlaying) audioRef.current.play();
                return;
            }
            await setCurrentSong(songs[(currentIndex - 1) % songs.length]);
            activeLibraryHandler(songs[(currentIndex - 1) % songs.length]);
        }
        if(isPlaying) audioRef.current.play();
  }
  //adding styles 
    const trackAnim = {
        transform :   `translateX(${songInfo.animationPercentage}%)`
    };
    return(
        <div className="player">
            <div className="time-control">
                <p>{getTime(songInfo.currentTime)}</p>
                
                {/* //track code */}
                <div className="track" style={{background:`linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,}}>
                <input type="range" min={0} max={songInfo.duration || 0} value={songInfo.currentTime} onChange={dragHandler}/>
                <div  className="animate-track" style={trackAnim}>
                </div>
                </div>


                <p>{songInfo.duration ? getTime(songInfo.duration) : "0.00"}</p>
            </div>
            <div className="play-control">
                <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-back')} className="skip-back" size="2x" icon={faAngleLeft} />
                <FontAwesomeIcon onClick={playSong} className="play" size="2x" icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon onClick={()=>skipTrackHandler('skip-forward')} className="skip-forward" size="2x" icon={faAngleRight} />
            </div>
         </div>
    )
}
export default Player;