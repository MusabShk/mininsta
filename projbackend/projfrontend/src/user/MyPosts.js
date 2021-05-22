// import React from "react"
// import Base from "../core/Base"

// const MyPosts=()=>{
//     return (
//         <Base title="My posts " description="See your feeds here">

//         </Base>

//     )
// }

// export default MyPosts
// import React, { useState, useEffect } from "react";
// import "../styles.css";
// import { API } from "../backend";
// import Base from "../core/Base";
// import Card from "../core/Card";
// import { getMyPosts } from "./helper/userapicalls";
// import { isAutheticated } from "../auth/helper";
// // import StripeCheckout from "./StripeCheckout";

// const MyPosts = () => {
//   const [posts, setPosts] = useState([]);  //empty array
//   const [reload, setReload] = useState(false);
//   const { user,token } = isAutheticated();

//   useEffect(() => {
//     setPosts(getMyPosts(user._id));
//   }, [reload]);

//   const loadAllPosts = () => {
//     return (
//       <div>
//         <h2>This section shows your posts</h2>
//         {posts.map((post, index) => (    //maping all one by one
//           <Card
//           key={index}
//           post={post}
//           editPost={true}
//           deletePost={true}
//           setReload={setReload}
//           reload={reload}
//           />  //calling card.js **we have to send all the values**
//         ))}
//       </div>
//     );
//   };
// //   const loadCheckout = () => {
// //     return (
// //       <div>
// //         <h2>This section for checkout</h2>
// //       </div>
// //     );
// //   };

//   return (
//     <Base title="Your feeds" description="See all your posts">
//       <div className="row text-center">
//         <div className="col-6">{loadAllPosts()}</div>
//         <div className="col-6">Checkout Section</div>
//       </div>
//     </Base>
//   );
// };

// export default MyPosts;

/////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "../core/Base";
import Card from "../core/Card";
// import { getPosts } from "./helper/coreapicalls";
import { getMyPosts } from "./helper/userapicalls";
import { isAutheticated } from "../auth/helper";

export default function MyPosts() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const { user, token } = isAutheticated();
  const [reload, setReload] = useState(false);

  const loadAllPosts = () => {
    const data = getMyPosts(user._id, token);

    if (data.error) {
      return setError(data.error);
    }
    return data;
    // getMyPosts(user._id,token).then(data => {
    //   if (data.error) {
    //     setError(data.error);
    //   } else {
    //       console.log(data);
    //     return (data)
    //     // setPosts(data);
    //   }
    // });
  };

  useEffect(() => {
    loadAllPosts().then((data) => {
      setPosts(data.myposts);
    });
  }, [reload]);

  const loadAllPostss = () => {
    return (
      <div className="row text-center">
        <h1 className="text-white">All my posts</h1>
        <div className="row">
          {posts.map((post, index) => {
            return (
              <Card
                key={index}
                post={post}
                editPost={true}
                deletePost={true}
                setReload={setReload}
                reload={reload}
              />
            );
          })}
        </div>
      </div>
    );
  };
  ////calling card.js **we have to send all the values**
  //   <div key={index} className="col-4 mb-4">
  //     <Card post={post}/>
  //   </div>//sending product in <Cart />
  return (
    <Base title="Home Page" description="All Feeds">
      <div className="row text-center">
        <div className="col-2"></div>
        <div className="col-8">{loadAllPostss()}</div>
        <div className="col-2"></div>
      </div>
    </Base>
  );
}
