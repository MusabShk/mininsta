// import React from "react"
// import "../styles.css"
// import {API} from "../backend";
// import Base from "../core/Base"

// export default function Home (){
//     console.log("API IS", API)

//     return(
//         <Base title="Home Page">
//             <h1 className="text-white">Hello front end</h1>
//         </Base>

//     )

// }
import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getPosts } from "./helper/coreapicalls";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllPosts = () => {
    getPosts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setPosts(data);
      }
    });
  };

  useEffect(() => {
    loadAllPosts();
  }, []);

  return (
    <Base title="Home Page" description="All Feeds">
      <div className="row ">
        <h1 className="text-white text-center">All of posts</h1>
        <div className="row">
          {posts.map((post, index) => {
            return (
              <div key={index}>
                <div className="row">
                  <div className="col-2"></div>
                  <div className="col-8 mb-4">
                    <Card post={post} />
                  </div>
                  <div className="col-2"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
}

////sending product in <Cart />
