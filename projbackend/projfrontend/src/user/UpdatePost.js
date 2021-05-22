import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import {
  getPost,updatePost
} from "./helper/userapicalls";
import { isAutheticated } from "../auth/helper/index";

const UpdatePost = ({ match }) => {
  const { user, token } = isAutheticated();

  const [values, setValues] = useState({
    title: "",
    body: "",
    // price: "",
    // stock: "",
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

  const preload = postId => {
    getPost(postId).then(data => {
    //   console.log(data);
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        // preloadCategories();
        setValues({
          ...values,
          title: data.title,
          body: data.body,
        //   price: data.price,
        //   category: data.category._id,
        //   stock: data.stock,
          formData: new FormData()
        });
      }
    });
  };

//   const preloadCategories = () => {
//     getCategories().then(data => {
//       if (data.error) {
//         setValues({ ...values, error: data.error });
//       } else {
//         setValues({
//           categories: data,
//           formData: new FormData()
//         });
//       }
//     });
//   };

  useEffect(() => {
    preload(match.params.postId);
  }, []);

  //TODO: work on it
  const onSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });

    updatePost(match.params.postId, user._id, token, formData).then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            title: "",
            body: "",
            // price: "",
            // photo: "",
            // stock: "",
            loading: false,
            createdPost: data.title
          });
        }
      }
    );
  };

  const handleChange = name => event => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const successMessage = () => (
    <div
      className="alert alert-success mt-3"
      style={{ display: createdPost ? "" : "none" }}
    >
      <h4>{createdPost} updated successfully</h4>
    </div>
  );

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
      </div>
      <div className="form-group">
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
          placeholder="Stock"
          value={stock}
        />
      </div> */}

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success mb-3"
      >
        Update Post
      </button>
    </form>
  );

  return (
    <Base
      title="Update your post here!"
      description="Welcome to updation section"
      className="container bg-info p-4"
    >
      <Link to="/myposts" className="btn btn-md btn-dark mb-3">
        My Feeds
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {createPostForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdatePost;
