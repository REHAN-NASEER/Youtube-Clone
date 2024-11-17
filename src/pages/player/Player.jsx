import React from "react";
import Video from "../../video/Video";
import './Player.css'
import Recommended from "../../components/Recommended/Recommended";
import { useParams } from "react-router-dom";
export default function Player() {
  const {videoId ,categoryId}=useParams()
  return(
    <div className="play-container">
      
      <Video videoId={videoId}/>
      <Recommended categoryId={categoryId}/>
    </div>
  )
}
