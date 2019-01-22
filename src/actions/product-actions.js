import axios from "axios";
export const FETCH_POSTS = "posts:fetchPosts";

export function fetchPosts() {
  return dispatch => {
    return axios
      .get(
        "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=4e5ad20715394238b896510279a932f1"
      )
      .then(response => {
        dispatch(getPosts(response.data));
      });
  };
}

export function fetchPostsCategory(category, pageNumber) {
  return dispatch => {
    return axios
      .get(
        "https://newsapi.org/v2/top-headlines?category=" +
          category +
          "&page=" +
          pageNumber +
          "&country=in&apiKey=4e5ad20715394238b896510279a932f1"
      )
      .then(response => {
        dispatch(getPosts(response.data));
      });
  };
}

export function getPosts(data) {
  console.log(data);
  return {
    type: FETCH_POSTS,
    payload: data
  };
}
