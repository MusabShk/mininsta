import React, { useState } from "react";
import Base from "../core/Base";
import { Link, Redirect } from "react-router-dom";
import { signin, authenticate, isAutheticated } from "../auth/helper";

const Signin = () => {
  const [values, setValues] = useState({
    //values are name,email....
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password, error, loading, didRedirect } = values; //destructuring the values

  const { user } = isAutheticated();

  const handleChange = (name) => (event) => {
    //writing one function for all changes which are made in the input fields
    setValues({ ...values, error: false, [name]: event.target.value }); //anytime you want to manupulate the values we use setValue
  }; //...values-(this will loads all values) //setting error:false
  //whatever we pass to handleChange it will update that value

  const onSubmit = (event) => {
    event.preventDefault(); //default action when we click submit is prevented
    setValues({ ...values, error: false, loading: true }); //we load all values
    signin({ email, password }) //fcn which we created in auth/helper
      .then((data) => {
        //as we will be getting some data on success
        if (data.error) {
          //if we get error
          setValues({ ...values, error: data.error, loading: false });
        } else {
          //if no errors
          authenticate(data, () => {
            //authenticate(function in helper)   //there is next in this function therefore we fire a callback fcn
            setValues({
              ...values,
              didRedirect: true,
            });
          });
        }
      })
      .catch(console.log("signin request failed")); //if any error,we console.log
  };

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light">Email</label>
              <input
                onChange={handleChange("email")}
                className="form-control"
                type="email"
                value={email}
              />
            </div>

            <div className="form-group">
              <label className="text-light">Password</label>
              <input
                onChange={handleChange("password")}
                className="form-control"
                type={showPassword ? "text" : "password"}
                value={password}
              />
              <p></p>
            </div>
            {/* {password && ( */}
            {/* <button
              type="button"
              className="btn btn-primary"
              // data-bs-toggle="modal"
              // data-bs-target="#exampleModal"
              onClick={() => setShowPassword((prevValue) => !prevValue)}
            >
              Show password
            </button> */}
            {/* )} */}

            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                // value=""
                id="flexCheckChecked"
                checked={showPassword}
                onClick={() => setShowPassword((prevValue) => !prevValue)}
              />
              <label className="form-check-label" for="flexCheckChecked">
                Show Password
              </label>
            </div>

            {/* <div
              className="modal fade"
              id="exampleModal"
              tabIndex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5
                      className="modal-title"
                      id="exampleModalLabel"
                      style={{ color: "grey" }}
                    >
                      Password which you have entered is ....
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <h5 style={{ color: "black" }}>{password}</h5>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-warning"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div> */}
            {/* <p>
              <a
                className="btn btn-primary"
                data-bs-toggle="collapse"
                href="#collapseExample"
                role="button"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Link with href
              </a>
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Button with data-bs-target
              </button>
            </p> */}
            <div className="collapse" id="collapseExample">
              <div className="card card-body">
                Some placeholder content for the collapse component. This panel
                is hidden by default but revealed when the user activates the
                relevant trigger.
              </div>
            </div>
            <p />
            <button onClick={onSubmit} className="btn btn-success w-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  };

  const performRedirect = () => {
    if (didRedirect) {
      //if its true
      if (user) {
        return <Redirect to="/myposts" />;
      }
    }
    if (isAutheticated()) {
      return <Redirect to="/" />; //to home page
    }
  };

  const loadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
    );
  };

  const errorMessage = () => {
    return (
      //coping the div from the signup form
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <div
            className="alert alert-danger"
            style={{ display: error ? "" : "none" }}
          >
            {error}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Base title="Signin page" description="A page for user to sign in!">
      {loadingMessage()}
      {errorMessage()}
      {signInForm()}
      {performRedirect()}
      {/* <p className="text-white text-center">{JSON.stringify(values)}</p> */}
    </Base>
  );
};

export default Signin;
