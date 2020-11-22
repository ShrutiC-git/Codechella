import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
//import db from "./firebase";
import { ReactMic } from 'react-mic';
import AudioRecorder from 'react-audio-recorder';
import { Recorder } from 'react-voice-recorder';
import 'react-voice-recorder/dist/index.css'
import MicRecorder from 'mic-recorder-to-mp3';


const Mp3Recorder = new MicRecorder({ bitRate: 128 });

const fetch = require('node-fetch');



function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [Recording, setRecording] = useState(false);
  const [blobURL, setblobURL] = useState('');
  const [blobobj, setblobobj] = useState('');
  const [blocked, setblocked] = useState(false);
  const [sendD, setsendD] = useState(true);


  navigator.getUserMedia({ audio: true }, () => {
    console.log('Permission Granted');
    setblocked(false)
  }, () => {
    console.log('Permission Denied');
    setblocked(true)
  })

     const sendTweet = (e) => {
      e.preventDefault();
      const data = JSON.stringify({ text: tweetMessage })
      window.$posts.push(
        {key:1,
         displayName:"Richard Falcon",
         username:"UniquePotato",
         verified:true,
         text:tweetMessage,
         avatar:"https://cdn.searchenginejournal.com/wp-content/uploads/2019/07/the-essential-guide-to-using-images-legally-online.png",
         image:""}
      )
      // window.location.reload(false);
      console.log(window.$posts);
    };
  /*  .then(res => res.json())
   .then(json => console.log(json)) */

  /*       db.collection("posts").add({
         displayName: "Rafeh Qazi",
         username: "cleverqazi",
         verified: true,
         text: tweetMessage,
         image: tweetImage,
         avatar:
           "https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png",
       });  */

  /*   setTweetMessage(""
    );
    setTweetImage(""); */


  /*   function onData(recordedBlob) {
      console.log('chunk of real-time data is: ', recordedBlob);
    }

    function onStop(recordedBlob) {
      Recording = recordedBlob
      console.log('The recorded blob is: ', recordedBlob)
      fetch('http://localhost:3001/tweet/speechtotext', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    } */

  function start() {
    if (blocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder
        .start()
        .then(() => {
          setRecording(true)
        }).catch((e) => console.error(e));
    }
  }

  function stop() {
    Mp3Recorder
      .stop()
      .getMp3()
      .then(([buffer, blob]) => {

        const blobURL = URL.createObjectURL(blob)
        setblobURL(blobURL);
        setRecording(false);
        const blobobj = blob;
        setblobobj(blobobj);
        setsendD(false);
        console.log(blobURL);
        console.log(blobobj);
      }).catch((e) => console.log(e));

  }

  function send() {

    var fd = new FormData();
    fd.append('audio_file.mp3', blobobj);
    fetch('http://localhost:3001/tweet/speechtotext', {
      headers: { Accept: "application/x-www-form-urlencoded" },
      method: "POST",
      body: fd
    })
    .then((res)=>{
      return res.text();
    }).then(function(data) {
        setTweetMessage(data);
     });
    /* axios({
      url:'http://localhost:3001/tweet/speechtotext',
      method:'post',
      data:{
        fd,
        name: 'test-audio'
      }
    }) */
    /* var fd = new FormData();
    fd.append('fname','test.wav');
    fd.append('data',blobobj);
    fetch('http://localhost:3001/tweet/speechtotext',{
      method:'POST',
      body:fd,
      headers: new Headers({ 'content-type': 'multipart/formdata' }),


    }) */
    /*     const formData = new FormData();
        formData.append('audio-file', blobfile);
        var fileBlob = new File([blobobj],'audio.mp3')

        fetch('http://localhost:3001/tweet/speechtotext', {
          method: 'POST',
          data: formData
        }) */
    /*     const fd = new FormData()
        fd.append('audio-file', blobURL);
        console.log(blobobj)
        fetch('http://localhost:3001/tweet/speechtotext', {
          method: 'POST',
          responseType: 'blob',
          headers: new Headers({ 'content-type': 'application/json' }),
          body: JSON.stringify({ sendblob: blobURL, senddata: fd })

        }) */


  }


  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        {   <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button> }
        {/*         <ReactMic
          record={record}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          mimeType='audio/webm'
          strokeColor="#000000"
          backgroundColor="#FF4081" /> */}
        {/* <button onClick={() => setRecording(true)} type="button">Start</button>
        <button onClick={() => setRecording(false)} type="button">Stop</button> */}
        {/* <Recorder
          record={true}
          title={"New recording"}
          audioURL={this.state.audioDetails.url}
          showUIAudio
          handleAudioStop={data => this.handleAudioStop(data)}
          handleAudioUpload={data => this.handleAudioUpload(data)}
          handleRest={() => this.handleRest()}
        />
        */}
      </form>

      <div>
        <button onClick={start} disabled={Recording}>
          Record
</button>
        <button onClick={stop} disabled={!Recording}>
          Stop
</button>
        <audio src={blobURL} controls="controls" />


        <button onClick={send} disabled={sendD}>
          Send
</button>

      </div>
    </div>
  );
}

export default TweetBox;
