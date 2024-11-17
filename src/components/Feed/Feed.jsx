// import React, { useEffect, useState } from "react";
// import "./Feed.css";
// import { API_KEY, value_converter } from "../../data";
// import { Link } from "react-router-dom";
// import moment from "moment";
// function Feed({ sidebar, category }) {
//   const [data, setdata] = useState([]);

//   const [loading, setloading] = useState(true);
//   const [error, seterror] = useState(null);
//   const fetch_data = async (retryCount = 3) => {
//     try {
//       const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=200&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
//       const res = await fetch(video_url);
//       if (!res.ok) throw new Error("error ");
//       const data = await res.json();
//       if (data.items) {
//         setdata(data.items);
//         setloading(false);
//       } else {
//         throw new Error("items not found");
//       }
//     } catch (error) {
//       if (retryCount > 0) {
//         console.log(`trying to fetch remaining attempts ${retryCount}`);
//         fetch_data(retryCount - 1);
//       } else {
//         console.error("error fetching data", error);
//         seterror(error.message)
//         setloading(false);
//       }
//     }
//   };

//   useEffect(() => {
//     fetch_data();
//   }, [category]);

//   return (
//     <div className={`feed ${sidebar ? "" : "large-feed"}`}>
//       {loading ? (
//         <div>loading....</div>
//       ) : Array.isArray(data) && data.length > 0 ? (
//         data.map((item, index) => {
//           return (
//             <Link
//               key={index}
//               to={`Player/${item.id}/${item.snippet.categoryId}`}
//               className={`card card-link ${sidebar ? "" : "large-card"}`}
//             >
//               <img src={item.snippet.thumbnails.medium.url} alt="" />
//               <h3>{item.snippet.title}</h3>
//               <h2>{item.snippet.channelTitle}</h2>
//               <p>
//                 {value_converter(item.statistics.viewCount)} views &bull;{" "}
//                 {moment(item.snippet.publishedAt).fromNow()}
//               </p>
//             </Link>
//           );
//         })
//       ) : (
//         <div>data is not available</div>
//       )}
//     </div>
//   );
// }

// export default Feed;

import React, { useEffect, useState } from "react";
import "./Feed.css";
import { API_KEY, value_converter } from "../../data";
import { Link } from "react-router-dom";
import moment from "moment";

function Feed({ sidebar, category }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Retry logic for fetching data
  const fetch_data = async (retryCount = 3) => {
    try {
      const video_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=200&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
      const res = await fetch(video_url);

      if (!res.ok) throw new Error('Failed to fetch data from YouTube API');

      const data = await res.json();
      if (data.items) {
        setData(data.items);
        setLoading(false);
      } else {
        throw new Error('No items found');
      }
    } catch (error) {
      if (retryCount > 0) {
        console.log(`Retrying fetch... Attempts left: ${retryCount}`);
        fetch_data(retryCount - 1); // Retry the fetch
      } else {
        console.error("Error fetching data:", error);
        setError(error.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    // Log category to ensure it's correctly passed
    console.log("Fetching data for category:", category);
    setLoading(true);
    setError(null);
    fetch_data();
  }, [category]);

  return (
    <div className={`feed ${sidebar ? "" : "large-feed"}`}>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>{error}</div>
      ) : Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => (
          <Link
            key={index}
            to={`Player/${item.id}/${item.snippet.categoryId}`}
            className={`card card-link ${sidebar ? "" : "large-card"}`}
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h3>{item.snippet.title}</h3>
            <h2>{item.snippet.channelTitle}</h2>
            <p>
              {value_converter(item.statistics.viewCount)} views &bull;{" "}
              {moment(item.snippet.publishedAt).fromNow()}
            </p>
          </Link>
        ))
      ) : (
        <div>Data is not available</div>
      )}
    </div>
  );
}

export default Feed;
