import React from "react";
import Menu from "./Menu";

//mt:margin
//py:pading on y axis
//btn-lg:large button
const Base = ({
  title = "My Title",
  description = "My desription",
  className = "text-white p-4",
  children,
}) => (
  <div>
    <Menu />
    <div className="container-fluid">
      <div className="jumbotron text-white text-center">
        <h2 className="display-4">{title}</h2>
        <p className="lead">{description}</p>
      </div>
      <div className={className}>{children}</div>
    </div>
    <footer className="footer mt-auto py-3">
      {/* <div className="container-fluid bg-warning text-white text-center py-3">
        <h4>Feel free to share your thoughts !!</h4>
        
      </div> */}
      <div className="container">
        <span className="text-muted">
          <span className="text-white">Insta WebApp</span>
        </span>
      </div>
    </footer>
  </div>
);

export default Base;
