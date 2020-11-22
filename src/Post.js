import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HearingIcon from '@material-ui/icons/Hearing';

const Post = forwardRef(
  ({ displayName, username, verified, text, image, avatar }, ref) => {
    return (
      <div className="post" ref={ref}>
        <div className="post__avatar">
          <Avatar src={avatar} />
        </div>
        <div className="post__body">
          <div className="post__header">
            <div className="post__headerText">
              <h3>
                {displayName}{" "}
                <span className="post__headerSpecial">
                  {verified && <VerifiedUserIcon className="post__badge" />} @
                  {username}
                </span>
              </h3>
            </div>
            <div className="post__headerDescription">
              <p>{text}</p>
            </div>
          </div>
          <img src={image} alt="" />
          <div className="post__footer">
            <ChatBubbleOutlineIcon fontSize="small" />
            <RepeatIcon fontSize="small" />
            <FavoriteBorderIcon fontSize="small" />
            <Button onClick={async () => {
              let res = await fetch(`http://localhost:3001/text-to-speech?text=${text}`, { method: "GET"});
              var reader = res.body.getReader();
              reader.read()
              .then((response) => {
                var blob = new Blob([response.value], { type: 'audio/mp3' });
                var url = window.URL.createObjectURL(blob)
                window.audio = new Audio();
                window.audio.src = url;
                window.audio.play();
              });
              console.log(res);
            }}> <HearingIcon /> </Button>
          </div>
        </div>
      </div>
    );
  }
);

export default Post;
