import React, { useEffect, useState } from "react";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import share from "../assets/share.png";
import save from "../assets/save.png";
import "./Video.css";
import { value_converter } from "../data";
import moment from "moment";
export default function Video({ videoId }) {
  const [apidata, setapidata] = useState(null);
  const API_KEY = import.meta.env.VITE_API_KEY;
  // fetching video details
  const fetch_detail = async () => {

    try {
      const video_detail_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
      const res = await fetch(video_detail_url);
      if(!res.ok) throw new Error("failed to fetch")
      const data = await res.json();
      setapidata(data.items[0]);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    fetch_detail();
  }, [videoId]);

  const [channeldata, setchanneldata] = useState(null);
  // fetching other detail
  const fetch_other_details = async () => {
    try {
      const other_details_url = ` https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY} `;
      const res = await fetch(other_details_url);
      if (!res.ok) throw new Error('failed to fetch')
      const data = await res.json();
      if (data.items && data.items.length > 0) {
        setchanneldata(data.items[0]);
      }
    } catch (error) {
      console.log("error in loading ", error);
    }
  };

  useEffect(() => {
    if (apidata) {
      fetch_other_details();
    }
  }, [apidata]);

  // Fetching Comments
  const [comments, setcomments] = useState([]);
  const fetching_comments = async () => {
    try {
      const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
      const res = await fetch(comment_url);
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json();
      setcomments(data.items || []);
    } catch (error) {
      console.log("error ", error);
    }
  };
  useEffect(() => {
    if (apidata) {
      fetching_comments();
    }
  }, [apidata]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameBorder="0"
        sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h3>{apidata ? apidata.snippet.title : "Title "}</h3>
      <div className="video-info">
        <p>
          {apidata ? value_converter(apidata.statistics.viewCount) : "Title "}{" "}
          &bull;
          { apidata ? moment(apidata.snippet.publishedAt).fromNow() : "unknowndate" } 
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apidata ? value_converter(apidata.statistics.likeCount) : "Likes "}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            share
          </span>
          <span>
            <img src={save} alt="" />
            save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={
            channeldata
              ? channeldata.snippet.thumbnails.default.url
              : "thumnail"
          }
          alt=""
        />
        <div>
          <p>{apidata ? apidata.snippet.channelTitle : "Chennel Name"}</p>
          <span>
            {channeldata
              ? value_converter(channeldata.statistics.subscriberCount)
              : "1M"}
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="video-description">
        <p>{apidata ? apidata.snippet.description : "Description  "}</p>

        <hr />
        <h3>
          {apidata
            ? apidata.statistics.commentCount + " Comments"
            : "Commments "}
        </h3>

        {comments.map((item, index) => {
          return (
            <div key={index} className="vid-comments">
              <img
                src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
                alt=""
              />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}
                  <span>
                    {moment(
                      item.snippet.topLevelComment.snippet.updatedAt
                    ).fromNow()}
                  </span>
                </h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import "./Video.css";
// import video1 from "../assets/video.mp4";
// import like from "../assets/like.png";
// import dislike from "../assets/dislike.png";
// import share from "../assets/share.png";
// import save from "../assets/save.png";
// import moment from "moment";
// import { API_KEY, value_converter } from "../data";

// export default function Video({ videoId }) {
//   const [apidata, setapidata] = useState(null);
//   const [channeldata, setchanneldata] = useState(null);
//   const [comments, setcomments] = useState([]);

//   const fetch_detail = async () => {
//     try {
//       const video_detail_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
//       const res = await fetch(video_detail_url);
//       if (!res.ok) throw new Error('Failed to fetch video details');
//       const data = await res.json();
//       setapidata(data.items[0]);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     fetch_detail();
//   }, [videoId]);

//   const fetch_other_details = async () => {
//     if (!apidata) return;
//     try {
//       const other_details_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apidata.snippet.channelId}&key=${API_KEY}`;
//       const res = await fetch(other_details_url);
//       if (!res.ok) throw new Error('Failed to fetch channel details');
//       const data = await res.json();
//       if (data.items && data.items.length > 0) {
//         setchanneldata(data.items[0]);
//       }
//     } catch (error) {
//       console.log("error in loading", error);
//     }
//   };

//   useEffect(() => {
//     fetch_other_details();
//   }, [apidata]);

//   const fetching_comments = async () => {
//     if (!apidata) return;
//     try {
//       const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=200&videoId=${videoId}&key=${API_KEY}`;
//       const res = await fetch(comment_url);
//       if (!res.ok) throw new Error('Failed to fetch comments');
//       const data = await res.json();
//       setcomments(data.items || []);
//     } catch (error) {
//       console.log("error", error);
//     }
//   };

//   useEffect(() => {
//     fetching_comments();
//   }, [apidata]);

//   return (
//     <div className="play-video">
//       <iframe
//         src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
//         frameBorder="0"
//         sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-presentation"
//         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//         referrerPolicy="strict-origin-when-cross-origin"
//         allowFullScreen
//       ></iframe>
//       <h3>{apidata ? apidata.snippet.title : "Title"}</h3>
//       <div className="video-info">
//         <p>
//           {apidata ? value_converter(apidata.statistics.viewCount) : "0"} &bull;{" "}
//           {apidata ? moment(apidata.snippet.publishedAt).fromNow() : "Unknown date"}
//         </p>
//         <div>
//           <span>
//             <img src={like} alt="like icon" />
//             {apidata ? value_converter(apidata.statistics.likeCount) : "Likes"}
//           </span>
//           <span>
//             <img src={dislike} alt="dislike icon" />
//           </span>
//           <span>
//             <img src={share} alt="share icon" /> share
//           </span>
//           <span>
//             <img src={save} alt="save icon" /> save
//           </span>
//         </div>
//       </div>
//       <hr />
//       <div className="publisher">
//         <img
//           src={channeldata ? channeldata.snippet.thumbnails.default.url : "/path/to/placeholder.jpg"}
//           alt={channeldata ? `${apidata.snippet.channelTitle} thumbnail` : "Thumbnail"}
//         />
//         <div>
//           <p>{apidata ? apidata.snippet.channelTitle : "Channel Name"}</p>
//           <span>{channeldata ? value_converter(channeldata.statistics.subscriberCount) : "1M"}</span>
//         </div>
//         <button>Subscribe</button>
//       </div>
//       <div className="video-description">
//         <p>{apidata ? apidata.snippet.description : "Description"}</p>
//         <hr />
//         <h3>{apidata ? `${apidata.statistics.commentCount} Comments` : "Comments"}</h3>
//         {comments.map((item, index) => (
//           item.snippet && item.snippet.topLevelComment ? (
//             <div key={index} className="vid-comments">
//               <img
//                 src={item.snippet.topLevelComment.snippet.authorProfileImageUrl}
//                 alt={`${item.snippet.topLevelComment.snippet.authorDisplayName}'s profile`}
//               />
//               <div>
//                 <h3>
//                   {item.snippet.topLevelComment.snippet.authorDisplayName}
//                   <span>{moment(item.snippet.topLevelComment.snippet.updatedAt).fromNow()}</span>
//                 </h3>
//                 <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
//                 <div className="comment-action">
//                   <img src={like} alt="like icon" />
//                   <span>{item.snippet.topLevelComment.snippet.likeCount}</span>
//                   <img src={dislike} alt="dislike icon" />
//                 </div>
//               </div>
//             </div>
//           ) : null
//         ))}
//       </div>
//     </div>
//   );
// }
