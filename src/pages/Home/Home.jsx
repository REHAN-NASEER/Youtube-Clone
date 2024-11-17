import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/Feed/Feed";
import "./Home.css";
export default function Home({ sidebar }) {

  const [category,setcategory]=useState(0)
  return (
    <>
      <div className="home">
        <Sidebar sidebar={sidebar} category={category} setcategory={setcategory} />
        <div>
          <Feed sidebar={sidebar} category={category}/>
        </div>
      </div>
    </>
  );
}

