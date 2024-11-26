import React, { useState } from "react";
import "./Navbar.css";
import menu_icon from "../../assets/menu.png";
import logo_icon from "../../assets/logo.png";
import search_icon from "../../assets/search.png";
import upload_icon from "../../assets/upload.png";
import more_icon from "../../assets/more.png";
import notification_icon from "../../assets/notification.png";
import profile_icon from "../../assets/jack.png";
import { Link } from "react-router-dom";

import moment from "moment";

export default function Navbar({ setsidebar }) {
  // const fetch_search = async () => {
  //   try {
  //     const search_url = `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${input}&key=${API_KEY}`;
  //     const res = await fetch(search_url);
  //     if (!res.ok) throw new Error("error searching");
  //     const data = await res.json();
  //     setdata(data.items);
  //     setloading(false);
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };

  // const [input, setinput] = useState("");
  // const [data, setdata] = useState([]);
  // const [loading, setloading] = useState(true);
  return (
    <>
      <nav className="flex-div">
        <div className="nav-left flex-div">
          <img
            className="menu-icon"
            src={menu_icon}
            alt=""
            onClick={() => {
              setsidebar((prevstate) => !prevstate);
            }}
          />
          <Link to={"/"}>
            <img className="logo-icon" src={logo_icon} alt="" />
          </Link>
        </div>
        <div className="nav-middle flex-div">
          <div className="search-box">
            <input
              className=""
              type="text"
              onChange={(e) => setinput(e.target.value)}
            />
            <img src={search_icon} alt="" onClick={()=>fetch_search()} />
          </div>
        </div>
        <div className="nav-right flex-div">
          <img src={upload_icon} alt="" />
          <img src={more_icon} alt="" />
          <img src={notification_icon} alt="" />
          <img className="user-icon" src={profile_icon} alt="" />
        </div>
      </nav>
      {/* <div>
        {loading ? (
          <div>loading....</div>
        ) : Array.isArray(data) && data.length > 0 ? (
          data.map((item, index) => {
            return (
              <Link
                key={index}
                to={`Player/${item.id}/${item.snippet?.categoryId}`}
              >
                <img src={item.snippet.thumbnails.medium.url} alt="" />
                <h3>{item.snippet?.title}</h3>
                <h2>{item.snippet?.channelTitle}</h2>
                <p>
                  {value_converter(item.statistics?.viewCount)} views &bull;{" "}
                  {moment(item.snippet.publishedAt).fromNow()}
                </p>
              </Link>
            );
          })
        ) : (
          <div>data is not available</div>
        )}
      </div> */}
    </>
  );
}
