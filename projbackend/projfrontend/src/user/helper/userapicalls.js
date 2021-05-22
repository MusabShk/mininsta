import { API } from "../../backend";

// export const getPosts = userId => {
//     return fetch(`/api/myposts/${userId}`, {
//       method: "GET"
//     })
//       .then(response => {
//         return response.json();
//       })
//       .catch(err => console.log(err));
//   };

export const getPost = (postId) => {
  return fetch(`${API}/post/${postId}`, {
    method: "GET",
    // headers: {
    //   Accept: "application/json",
    //   Authorization: `Bearer ${token}`
    // }
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deletePost = (postId, userId, token) => {
  return fetch(`${API}/post/${postId}/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const createaPost = (userId, token, post) => {
  return fetch(`${API}/post/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: post, //content type here is not application json because here we dont have single string. we have a form
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getMyPosts = (userId, token) => {
  return fetch(`${API}/myposts/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updatePost = (postId, userId, token, post) => {
  return fetch(`${API}/post/${postId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: post,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
