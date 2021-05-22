import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import {
  deleteAPost,
  likePost,
  pullLike,
  pushLike,
  getUser,
  getUserName,
} from "./helper/postHelper";
import { isAutheticated } from "../auth/helper";
import { check } from "express-validator";

const Card = ({
  post,
  editPost = false,
  deletePost = false,
  // lik = true,
  // unlik = false,
  setReload = (f) => f,
  //   function(f){return f}
  reload = undefined,
}) => {
  //will be taking product to get the product image
  const { user, token } = isAutheticated();
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(post.count);
  // const [wait, setWait] = useState(false);
  const [load, setLoad] = useState(false);
  const [likes, setLikes] = useState();
  const [usr, setUsr] = useState();
  // const [lik, setLik] = useState();
  // const [unlik, setUnlik] = useState();
  const [whichheart, setWhichheart] = useState();

  useEffect(() => {
    // if (wait === true || load === true) return;
    if (user) {
      getUser(user._id, token).then((data) => {
        // const check = () => {
        if (data.likedpost.includes(post._id)) {
          // return true;
          setWhichheart(true);
        } else {
          // return false;
          setWhichheart(false);
        }
        // setWait(false);
        // setLoad(false);
        // };
        // setWhichheart(check());
        // setWait(false);
        // setLoad(false);
        // const check2 = () => {
        //   if (data.likedpost.includes(post._id)) {
        //     return true;
        //   } else {
        //     return false;
        //   }
        // };
        // setLik(check1());
        // setUnlik(check2());
      });
    }
  }, [likes]);

  useEffect(() => {
    // setValues({...values,});
    // preload();
    setLikes(post.likes);
  }, []);

  // if (user) {
  //   getUser(user._id, token).then((data) => {
  //     const check = () => {
  //       if (data.likedpost.includes(post._id)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     };
  //     setWhichheart(check());
  //     // const check2 = () => {
  //     //   if (data.likedpost.includes(post._id)) {
  //     //     return true;
  //     //   } else {
  //     //     return false;
  //     //   }
  //     // };
  //     // setLik(check1());
  //     // setUnlik(check2());
  //   });
  // }

  // getUser(user._id, token).then((data) => {
  //   const check1 = () => {
  //     if (data.likedpost.includes(post._id)) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   };
  //   const check2 = () => {
  //     if (data.likedpost.includes(post._id)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };
  //   setLik(check1());
  //   setUnlik(check2());
  // });
  // getUser(user._id, token).then((data) => {
  //   const check1 = () => {
  //     if (data.likedpost.includes(post._id)) {
  //       return false;
  //     } else {
  //       return true;
  //     }
  //   };
  //   const check2 = () => {
  //     if (data.likedpost.includes(post._id)) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   };
  //   setLik(check1());
  //   setUnlik(check2());
  // });

  // const check1 = () => {
  //   if (user.likedpost.includes(post._id)) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };
  // const check2 = () => {
  //   if (user.likedpost.includes(post._id)) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  // console.log(user);
  const postTitle = post ? post.title : "A photo";
  const postBody = post ? post.body : "Default description";
  //   const cartPrice=product?product.price:"DEFAULT"

  const editaPost = () => {
    // editAPost(post._id,user._id,token,post, () => setRedirect(true));  //we send product to "addItemToCart" fcn in carthelper //after it we as it has next we have call back fcn so we setRedirect true
    setRedirect(true);
  };

  const getARedirect = (redirect) => {
    if (redirect) {
      return <Redirect to={`/updatepost/${post._id}`} />;
    }
  };

  const showEditPost = (editPost) => {
    return (
      editPost && (
        <button
          onClick={editaPost}
          className="btn btn-block btn-outline-success mt-2 mb-2"
        >
          Edit Post
        </button>
      )
    );
  };

  // console.log(post);
  // console.log(user);
  // const preload = () => {
  //   setLikes(post.likes);
  // };

  // useEffect(() => {
  //   if (user) {
  //     getUser(user._id, token).then((data) => {
  //       const check = () => {
  //         if (data.likedpost.includes(post._id)) {
  //           return true;
  //         }
  //         if (!data.likedpost.includes(post._id)) {
  //           return false;
  //         }
  //       };
  //       setWhichheart(check());
  //       setWait(false);
  //       setLoad(false);
  //       // const check2 = () => {
  //       //   if (data.likedpost.includes(post._id)) {
  //       //     return true;
  //       //   } else {
  //       //     return false;
  //       //   }
  //       // };
  //       // setLik(check1());
  //       // setUnlik(check2());
  //     });
  //   }
  // }, []);

  //user, setWhichheart, post._id, post.likes
  // const likeit = () => {
  //   var lk = likes;
  //   // console.log(lk);
  //   lk = lk + 1;
  //   // console.log(lk);
  //   setLikes(lk);
  //   // console.log(likes);
  //   likePost(post._id, token, lk);
  //   setUnlik(true);
  //   setLik(false);
  //   pushLike(user._id, token, post._id);
  // };
  // const unlikeit = () => {
  //   var lk = likes;
  //   // console.log(lk);
  //   lk = lk - 1;
  //   // console.log(lk);
  //   setLikes(lk);
  //   // console.log(likes);
  //   likePost(post._id, token, lk);
  //   setUnlik(false);
  //   setLik(true);
  //   pullLike(user._id, token, post._id);
  // };

  const loadingSpinner = () => {
    return (
      load && (
        <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>
      )
    );
  };

  const logic = async () => {
    if (load) return;
    // if (wait) return;
    // setWait(true);
    setLoad(true);
    loadingSpinner();
    var lk = likes;
    if (whichheart === true) {
      lk = lk - 1;

      await pullLike(user._id, token, post._id);
      setLikes(lk);
      await likePost(post._id, token, lk);
    }
    if (whichheart === false) {
      lk = lk + 1;

      await pushLike(user._id, token, post._id);
      setLikes(lk);
      await likePost(post._id, token, lk);
    }

    // setWait(false);
    setLoad(false);
  };

  const showHeart = (whichheart) => {
    // console.log("hehehe");
    // if (wait === true) {
    //   <div class="spinner-border" role="status">
    //     <span class="sr-only"></span>
    //   </div>;
    // }
    if (load) return;

    if (whichheart === true) {
      return (
        <img
          src="/unlike.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
          onClick={() => {
            logic();
          }}
        />
      );
    }
    if (whichheart === false) {
      return (
        <img
          src="/like.png"
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt=""
          onClick={() => {
            logic();
          }}
        />
      );
    }
  };

  // const showLikeit = (lik) => {
  //   // const l = 1;
  //   return (
  //     lik && (
  //       <img
  //         src="/like.png"
  //         width="30"
  //         height="30"
  //         className="d-inline-block align-top"
  //         alt=""
  //         onClick={() => {
  //           likeit();
  //         }}
  //       />
  //     )
  //   );
  // };
  // const showUnlikeit = (unlik) => {
  //   // const l = 1;
  //   return (
  //     unlik && (
  //       <img
  //         src="/unlike.png"
  //         width="30"
  //         height="30"
  //         className="d-inline-block align-top"
  //         alt=""
  //         onClick={() => {
  //           unlikeit();
  //         }}
  //       />
  //     )
  //   );
  // };
  // //.then((data) => {
  //   if (data.error) {
  //     console.log(data.error);
  //   } else {
  //     console.log(data);
  //   }
  // });
  const showDeletePost = (deletePost) => {
    return (
      deletePost && (
        <button
          onClick={() => {
            deleteAPost(post._id, user._id, token);
            setReload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2"
        >
          Delete Post
        </button>
      )
    );
  };
  // console.log(post.postedBy._id, "klklkl");
  // const displayName = () => {
  //   getUser(post.postedBy._id, token).then((data) => {
  //     {
  //       return <h5>{data.name}</h5>;
  //     }
  //   });
  // };
  return (
    <div className="card text-white bg-warning border border-dark">
      <div>
        <h4>{post.postedBy.name}</h4>
      </div>
      <div className="text-center">
        <div className="card-header lead">
          <h2 className="text-dark">{postTitle}</h2>
        </div>
        <div className="card-body">
          <div className="row bg-white">
            {getARedirect(redirect)}
            <ImageHelper post={post} />
          </div>
          <div className="row">
            <nav className="navbar navbar-light bg-warning">
              {isAutheticated() && (
                <a className="navbar-brand">
                  {/* {showLikeit(lik)}
                  {showUnlikeit(unlik)} */}
                  {loadingSpinner()}
                  {showHeart(whichheart)}

                  <h6>{likes}Likes</h6>
                </a>
              )}
            </nav>
          </div>
          {/* <div className="row text-dark text-left">
          
        </div> */}
          <div className="row">
            <p className="lead bg-dark text-white font-weight-normal text-wrap">
              {postBody}
            </p>
          </div>
          {/* <p className="btn btn-success rounded  btn-sm px-4">$ {cartPrice}</p> */}
          <div className="row">
            <div className="col-12">{showEditPost(editPost)}</div>
            <div className="col-12">{showDeletePost(deletePost)}</div>
          </div>
          {/* {isAutheticated() && <div className="row">{displayName()}</div>} */}
        </div>
      </div>
    </div>
  );
};

export default Card;
