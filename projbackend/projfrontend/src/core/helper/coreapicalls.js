import { API } from "../../backend";

export const getPosts = () => {
  return fetch(`${API}/posts`, { method: "GET" })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
