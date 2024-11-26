import React, { useEffect, useState } from "react";
import "./Recommended.css";
function Recommended({ categoryId }) {
  const [apidata, setapidata] = useState([]);
  const [loading, setloading] = useState(true);
  const API_KEY = import.meta.env.VITE_API_KEY;
  const fetch_video = async () => {
    try {
      const Recommended_video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
      const res = await fetch(Recommended_video_url);
      if (!res.ok) throw new Error('failed to fetch')
      const data = await res.json();
      if(data.items){
        setapidata(data.items);
        console.log(data);

      }
      setloading(false);
    } catch (error) {
      console.log("errror", error);
      setloading(false);
    }
  };
  useEffect(() => {
    fetch_video();
    
  }, [categoryId]);
  return (
    <div className="Recommended">
      {loading ? (
        <div>loadinng...</div>
      ) : (
        apidata.map((item, index) => {
          console.log(item);
          console.log(item.snippet.thumbnails?.default?.url); // Check image URL

          return (
            <div key={index} className="side-vid-list">
               <img
                src={item.snippet ? item.snippet.thumbnails?.default?.url : "fallback.jpg"}
                alt="thumbnail"
              />
              <div className="video-info">
                <h4>
                  {item.snippet?.title || "no s"}
                </h4>
                <p>{item.snippet?.channelTitle || "Unknown Channel"}</p>

                <p></p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
export default Recommended;





// import React, { useEffect, useState } from "react";
// import "./Recommended.css";
// import { API_KEY } from "../../data";

// function Recommended({ categoryId }) {
//   const [apidata, setapidata] = useState([]);
//   const [loading, setloading] = useState(true);

//   const fetch_video = async () => {
//     try {
//       const Recommended_video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
//       const res = await fetch(Recommended_video_url);
      
//       if (!res.ok) throw new Error('Failed to fetch data');
      
//       const data = await res.json();
//       console.log(data);  // Check API response structure

//       if (data.items) {
//         setapidata(data.items);
//       }
//       setloading(false);
//     } catch (error) {
//       console.log("Error:", error);
//       setloading(false);
//     }
//   };

//   useEffect(() => {
//     if (categoryId) {
//       fetch_video();
//     }
//   }, [categoryId]);

//   return (
//     <div className="Recommended">
//       {loading ? (
//         <div>Loading...</div>
//       ) : apidata.length > 0 ? (
//         apidata.map((item, index) => (
//           <div key={index} className="side-vid-list">
//             <img
//               src={item.snippet ? item.snippet.thumbnails?.default?.url : "placeholder.jpg"}
//               alt="thumbnail"
//             />
//             <div className="video-info">
//               <h4>{item.snippet?.title || "No Title"}</h4>
//               <p>{item.snippet?.channelTitle || "Unknown Channel"}</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <div>No videos found</div>
//       )}
//     </div>
//   );
// }

// export default Recommended;

