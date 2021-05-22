// import React from "react"
// import Base from "../core/Base"


// const CreatePost=()=>{
//     return (
//         <Base title="Create a post" description="Fill in the required fields">
        
//         </Base>

//     )
// }

// export default CreatePost

import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {  createaPost } from "./helper/userapicalls";
import { isAutheticated } from "../auth/helper/index";


const AddPost = () => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    title: "",
    body: "",
    photo: "",
    // categories: [],
    // category: "",
    loading: false,
    error: "",
    createdPost: "",
    getaRedirect: false,
    formData: ""
  });

  const {
    title,
    body,
    // price,
    // stock,
    // categories,
    // category,
    loading,
    error,
    createdPost,
    getaRedirect,
    formData
  } = values;

  const preload = () => {
    // getCategories().then(data => {
    //   // console.log(data);
    //   if (data.error) {
    //     setValues({ ...values, error: data.error });
    //   } else {
        setValues({ ...values,  formData: new FormData() });
      }
    

  useEffect(() => {
    preload();
  }, []);

  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    createaPost(user._id, token, formData).then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          title: "",
          body: "",
          // price: "",
          photo: "",
          // stock: "",
          loading: false,
          createdPost: data.title
        });
      }
    });
  };


  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;  //if photo then then ....file  or else .....value
    formData.set(name, value);
    setValues({ ...values, [name]: value });  //whatever name will be there we will provide the value of it.
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdPost ? "" : "none" }}
    >
      <h4>{createdPost} created successfully</h4>
    </div>
  );

  const warningMessage = () => {
    if (error) {
      return <h4 className="text-success">Failed to create Post</h4>;
    }
  };

  const createPostForm = () => (
    <form>
      <span>Post photo</span>
      <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("title")}
          name="photo"
          className="form-control"
          placeholder="Title"
          value={title}
        />
      </div>
      <div className="form-group">
        <textarea
          onChange={handleChange("body")}
          name="photo"
          className="form-control"
          placeholder="Body"
          value={body}
        />
      </div>
      {/* <div className="form-group">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div> */}
      {/* <div className="form-group">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div> */}

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Create Post
      </button>
    </form>
  );

  return (
    <Base
      title="Create your Post here!"
      description="Welcome to post creation section"
      className="container bg-info p-4"
    >
      <Link to="/" className="btn btn-md btn-dark mb-3">
        Home
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">{successMessage()}{createPostForm()}{warningMessage()}</div>
      </div>
    </Base>
  );
};

export default AddPost;
