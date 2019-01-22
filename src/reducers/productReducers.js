import { FETCH_POSTS } from "../actions/product-actions";
export default function productReducer(state = "", { type, payload }) {
  switch (type) {
    case FETCH_POSTS:
      return payload.articles;
    default:
      return state;
  }
}
