import React, { Component } from 'react';
import axios from "axios"
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts")
      // .then(data => console.log(data))
      .then(data => this.setState({ posts: data.data }))
      .catch(err => console.error(err));
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
      .then(res => this.setState({posts: res.data}))
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`)
      .then(res => this.setState({posts: res.data}))
  }

  createPost(newPost) {
    // console.log(newPost)
    axios.post("https://practiceapi.devmountain.com/api/posts", newPost)
      .then(res => this.setState({posts: res.data}))
      .catch(err => console.error(err));
  }

  render() {
    const { posts } = this.state;
    // console.log(posts)
    let postsDisplay = posts.map((post, i) => <Post key={i} id={ post.id } updatePostFn={this.updatePost} text={post.text} date={post.date} deletePostFn={this.deletePost} /> )

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost} />

          { postsDisplay }
        </section>
      </div>
    );
  }
}

export default App;
