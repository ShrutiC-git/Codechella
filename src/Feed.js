import React, { useState, useEffect } from "react";
import TweetBox from "./TweetBox";
import Post from "./Post";
import "./Feed.css";
import db from "./firebase";
import FlipMove from "react-flip-move";
const fetch = require('node-fetch');

function Feed() {
  var [posts, setPosts] = useState([]);
  posts = [
    {key:1,displayName:"Richard Falcon",username:"UniquePotato",verified:true,text:"So this tweet, is just a random tweet",avatar:"https://cdn.searchenginejournal.com/wp-content/uploads/2019/07/the-essential-guide-to-using-images-legally-online.png",image:""}
  ];

  return (
    <div className="feed">
      <div className="feed__header">
        <h2>Home</h2>
      </div>

      <TweetBox />

      <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.text}
            displayName={post.displayName}
            username={post.username}
            verified={post.verified}
            text={post.text}
            avatar={post.avatar}
            image={post.image}
          />
        ))}
      </FlipMove>
    </div>
  );
}

export default Feed;
