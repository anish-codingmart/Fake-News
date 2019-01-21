import React, { Component } from "react";
import "./App.css";
import { connect } from "react-redux";
import { updateUser } from "./actions/user-actions";
import { fetchPosts, fetchPostsCategory } from "./actions/product-actions";
import Moment from "react-moment";
class App extends Component {
  constructor(props) {
    super(props);
    this.onUpdateUser = this.onUpdateUser.bind(this);
    this.state = {
      category: "general",
      postURL: "",
      postTitle: "",
      pageNumber: 1
    };
  }

  componentDidMount() {
    this.props.onFetchPosts();
  }
  onUpdateUser(event) {
    this.props.onUpdateUser(event.target.value);
  }

  goToCategory(event) {
    this.setState({ pageNumber: 1 });
    this.onFetchPostsCategory(event, 1);
  }

  onFetchPostsCategory(event, pageNumber) {
    this.props.onFetchPostsCategory(event, pageNumber);
    this.setState({ category: event });
    console.log(this.state);
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  openModal(title, url) {
    console.log(title, url);
    this.setState({ postURL: url, postTitle: title });
  }

  clearModal() {
    this.setState({ postURL: "", postTitle: "Loading.." });
  }

  nextPage() {
    const nextPageNumber = this.state.pageNumber + 1;
    this.setState({ pageNumber: nextPageNumber });
    this.onFetchPostsCategory(this.state.category, nextPageNumber);
    console.log(this.state);
    window.scrollTo(0, 0);
  }

  prevPage() {
    const nextPageNumber = this.state.pageNumber - 1;
    this.setState({ pageNumber: nextPageNumber });
    this.onFetchPostsCategory(this.state.category, nextPageNumber);
    console.log(this.state);
    window.scrollTo(0, 0);
  }
  render() {
    console.log(this.props);
    return (
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <a className="navbar-brand" href="#">
            Fake News -{" "}
            <strong>{this.capitalizeFirstLetter(this.state.category)}</strong>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav ml-auto">
              <a className="nav-item nav-link active" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
              <a className="nav-item nav-link" href="#">
                Features
              </a>
              <a className="nav-item nav-link" href="#">
                Hello, {this.props.user}
              </a>
            </div>
          </div>
        </nav>
        <header className="App-header">
          <br />

          <input placeholder="Enter Your Name" onChange={this.onUpdateUser} />

          <br />
          <div className="row">
            <button
              type="button"
              onClick={() => this.goToCategory("general")}
              className="btn btn-primary "
            >
              General
            </button>

            <button
              type="button"
              className="btn btn-secondary margin-left"
              onClick={() => this.goToCategory("technology")}
            >
              Technology
            </button>
            <button
              type="button"
              onClick={() => this.goToCategory("business")}
              className="btn btn-success margin-left"
            >
              Business
            </button>
            <button
              type="button"
              onClick={() => this.goToCategory("entertainment")}
              className="btn btn-danger margin-left"
            >
              Entertainment
            </button>

            <button
              type="button"
              onClick={() => this.goToCategory("science")}
              className="btn btn-warning margin-left"
            >
              Science
            </button>

            <button
              type="button"
              onClick={() => this.goToCategory("sports")}
              className="btn btn-info margin-left"
            >
              Sports
            </button>
          </div>
          <br />
          <div className="container-fluid">
            <div className="row posts-available">
              <div
                style={this.props.posts.length == 0 ? {} : { display: "none" }}
                className=" col-md-12 posts-empty "
              >
                <p className="text-center">Oops, We have run out of posts!</p>
              </div>
              {this.props.posts.map((item, key) => (
                <div
                  className="col-md-4 hvr-grow-shadow"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  key={item.title}
                >
                  <a
                    target="_blank"
                    onClick={() => this.openModal(item.title, item.url)}
                  >
                    <div className="card-custom animated zoomInDown ">
                      <img alt={item.title} src={item.urlToImage} />
                      <br />
                      <h1>{item.title}</h1>
                      <p>
                        {item.source.name} |{" "}
                        <Moment format="Do MMM YYYY">{item.publishedAt}</Moment>
                      </p>

                      <p>{item.content}</p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          </div>
          <br />
          <div className="row">
            <button
              style={this.state.pageNumber > 1 ? {} : { display: "none" }}
              type="button"
              onClick={() => this.prevPage()}
              className="btn btn-primary "
            >
              Previous Page
            </button>
            <button
              style={this.props.posts.length > 0 ? {} : { display: "none" }}
              type="button"
              onClick={() => this.nextPage()}
              className="btn btn-primary margin-left"
            >
              Next Page
            </button>
          </div>

          <br />
        </header>

        <div
          className="modal fade"
          id="exampleModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  {this.state.postTitle}
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => this.clearModal()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="embed-responsive embed-responsive-16by9 holds-the-iframe">
                  <iframe
                    className="embed-responsive-item"
                    src={this.state.postURL}
                    allowFullScreen
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => this.clearModal()}
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <a href={this.state.postURL} target="_blank">
                  <button type="button" className="btn btn-primary">
                    Go to Website
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapsStateToProps = state => ({
  posts: state.posts,
  user: state.user
});

const mapActionsToProps = {
  onUpdateUser: updateUser,
  onFetchPosts: fetchPosts,
  onFetchPostsCategory: fetchPostsCategory
};

export default connect(
  mapsStateToProps,
  mapActionsToProps
)(App);
