import React, { useRef, useState } from "react";
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
var useData = '';


function TweetBox() {
  const textTweet = useRef(null);
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetImage, setTweetImage] = useState("");
  const [Recording, setRecording] = useState(false);
  const [blobURL, setblobURL] = useState('');
  const [blobobj, setblobobj] = useState('');
  const [blocked, setblocked] = useState(false);
  const [sendD, setsendD] = useState(true);
  const [tweet, settweet] = useState("");



  navigator.getUserMedia({ audio: true }, () => {
    console.log('Permission Granted');
    setblocked(false)
  }, () => {
    console.log('Permission Denied');
    setblocked(true)
  })

  function sendTweet() {
    console.log('send tweet')
  }

  const sendSuggestion = (e) => {
    e.preventDefault()
    console.log('send suggestions')
    console.log(tweet)
    fetch('http://localhost:3001/tweet/tweetanalysis', {
      headers: { Accept: "application/json" },
      method: "POST",
      body: JSON.stringify({ "SendTweet": tweet }),

    })
  }

  /*   const sendTweet = (e) => {
      e.preventDefault();
      const data = JSON.stringify({ text: tweetMessage })
      fetch('http://localhost:3001/tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: data
      })
    }; */
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
      .then(res => res.json())
      .then(data => {
        useData = data
        console.log(data)
      })
      .then(() => {
        document.getElementById('tweetthis').innerHTML = useData.data
        settweet(useData.data);
        console.log('Data to further process is ', useData.data)
      })


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
        <div className="tweetBox__input" >
          <Avatar src="https://kajabi-storefronts-production.global.ssl.fastly.net/kajabi-storefronts-production/themes/284832/settings_images/rLlCifhXRJiT0RoN2FjK_Logo_roundbackground_black.png" />
          <input
            onChange={(e) => {
              setTweetMessage(e.target.value)
            }}
            value={tweetMessage}
            placeholder="What's happening?"
            type="text"
          />
        </div>
        <input
          id='tweetthis'
          value={tweet}
          //onChange={(e) => setTweetImage(e.target.value)}
          className="tweetBox__imageInput"
          placeholder="Optional: Enter image URL"
          type="text"
        />

        {<Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Tweet
        </Button>}
        {<Button
          onClick={sendSuggestion}
          type="submit"
          className="tweetBox__tweetButton"
        >
          '#' Help
        </Button>}
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
      <div>
        <h4>Testing</h4>
      </div>

    </div>
  );
}

export default TweetBox;
