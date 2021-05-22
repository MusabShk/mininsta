import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { isAutheticated, signout } from "../auth/helper";
//withRouter in above line is used to use all routes in Routes.js with the links in this file

const currentTabs = (history, path) => {
  if (history.location.pathname === path) {
    //path=link  //history.location.pathname=the place where you are currently
    return { color: "#FFFFFF" }; //if both are same, then give one colour or give another colour
  } else {
    return { color: "#758283" };
  }
};
const currentTabsnavpills = (history, path) => {
  if (history.location.pathname === path) {
    //path=link  //history.location.pathname=the place where you are currently
    return "nav-item nav-pills"; //if both are same, then give one colour or give another colour
  } else {
    return "nav-item";
  }
};
const currentTabssignout = () => {
  //path=link  //history.location.pathname=the place where you are currently
  return { color: "#758283" }; //if both are same, then give one colour or give another colour
};

const Menu = ({ history }) => (
  // <div>
  //   <ul className="nav nav-tabs bg-dark">
  //     <li className="nav-item">
  //       <Link style={currentTabs(history,"/")} className="nav-link" to="/">
  //         Home
  //       </Link>
  //     </li>
  //     {isAutheticated() && (
  //     <li className="nav-item">
  //       <Link style={currentTabs(history,"/myposts")} className="nav-link" to="/myposts">
  //         My Posts
  //       </Link>
  //     </li>)}
  //     {!isAutheticated() && (
  //       <Fragment>
  //       <li className="nav-item">
  //         <Link style={currentTabs(history,"/signup")} className="nav-link" to="/signup">
  //           Signup
  //         </Link>
  //       </li>
  //       <li className="nav-item">
  //         <Link style={currentTabs(history,"/signin")} className="nav-link" to="/signin">
  //           Sign In
  //         </Link>
  //       </li>
  //       </Fragment>
  //     )}
  //     {isAutheticated() && (
  //         <li className="nav-item">
  //         <Link style={currentTabs(history,"/createpost")} className="nav-link" to="/createpost">
  //           Create post
  //         </Link>
  //       </li>
  //     )}
  //     {isAutheticated() && (
  //       <li className="nav-item">
  //         <span
  //           className="nav-link text-warning"
  //           onClick={() => {  //creating a function which first calls signout.signout(in index.js helper) is a middleware so we have to design a callback fcn
  //             signout(() => {
  //               history.push("/");  //redirecting to home
  //             });
  //           }}
  //         >
  //           Signout
  //         </span>
  //       </li>
  //     )}
  //   </ul>
  // </div>
  <div>
    <ul className="nav justify-content-center bg-white">
      <li className={currentTabsnavpills(history, "/")}>
        <a
          style={currentTabs(history, "/")}
          className="nav-link active"
          href="/"
        >
          <img src="/home.png" width="25" height="25" alt="" /> &nbsp;Home
        </a>
      </li>
      {isAutheticated() && (
        <li className={currentTabsnavpills(history, "/myposts")}>
          <a
            style={currentTabs(history, "/myposts")}
            className="nav-link active"
            href="/myposts"
          >
            <img src="/posts.png" width="25" height="25" alt="" /> &nbsp; My
            Posts
          </a>
        </li>
      )}
      {!isAutheticated() && (
        <Fragment>
          <li className={currentTabsnavpills(history, "/signup")}>
            <a
              style={currentTabs(history, "/signup")}
              className="nav-link active"
              href="/signup"
            >
              Signup
            </a>
          </li>
          <li className={currentTabsnavpills(history, "/signin")}>
            <a
              style={currentTabs(history, "/signin")}
              className="nav-link active"
              href="/signin"
            >
              Sign In
            </a>
          </li>
        </Fragment>
      )}
      {isAutheticated() && (
        <li className={currentTabsnavpills(history, "/createpost")}>
          <a
            style={currentTabs(history, "/createpost")}
            className="nav-link active"
            href="/createpost"
          >
            <img src="/create.png" width="25" height="25" alt="" /> &nbsp;
            Create post
          </a>
        </li>
      )}
      {isAutheticated() && (
        <li className="nav-item">
          <a
            style={currentTabssignout()}
            className="nav-link active"
            href="/"
            onClick={() => {
              //creating a function which first calls signout.signout(in index.js helper) is a middleware so we have to design a callback fcn
              signout(() => {
                history.push("/"); //redirecting to home
              });
            }}
          >
            Signout
          </a>
        </li>
      )}
    </ul>
  </div>
);

export default withRouter(Menu);
