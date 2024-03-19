import * as React from 'react';
import { useLocation } from "react-router-dom";
import { useId, useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import useInterval from './useInterval';
import BounceLoader from "react-spinners/BounceLoader";
import './Chat.css';

const Chat = (props) => {
  const location = useLocation();
  const { hash, pathname, search } = location;
  
  const id = useId();
  const [alias, setAlias] = useState(props?.value ?? '');
  const [message, setMessage] = useState(props?.value ?? '');
  const [messages, setMessages] = useState([{alias:'', messages:'Nothing here!', FTS_DOC_ID:-1}]);

  const getMessages = () => {
    /* Code this in video */
    fetch('http://64.23.183.31:3100/messages' + pathname)
      .then( (response) => { return response.json(); })
      .then( (data) => { setMessages(messages => data); });
  };
  
  const getRecentMessages = () => {
    /* Code this in video */
    if (!messages.length) return;
   if (messages.length > 0 && messages[0].FTS_DOC_ID == -1) return;
    fetch('http://64.23.183.31:3100/messages' + pathname + '/' + messages[messages.length-1].FTS_DOC_ID)
      .then( (response) => { return response.json(); })
      .then( (data) => {
        if (data.length) {
          const newm = [...messages, ...data];
          setMessages(msgs => newm); 
          scrollToBottom();
        }
      });
  };
  
  const sendMessage = () => {
    /* Code this in video */
    fetch('http://64.23.183.31:3100/send' + pathname + '/' + alias + '/' + message,
        { method: "GET", headers: { 'Content-Type': 'application/json' } })
     .then( (response) => { return response.json(); })
     .then((data) => {
       if (messages.length)
         getRecentMessages();
       else
         getMessages();
       setMessage('');
     });
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView()
  }

  useEffect(() => {
    getMessages();
    scrollToBottom();
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useInterval(() => { 
    getRecentMessages();
  }, 1000);

  const messagesEndRef = useRef(null)

  return (
    <>
      <div id="pagetitle" className="fixed top-2 right-2">
        <span className="font-semibold text-2xl fixed top-2 left-5">
          <Link to="/" >
            Chattastic
          </Link>
          <span className="font-thin text-2xl">
            {pathname}
          </span>
        </span>
      </div>

      <div id="mainchat" className="text-xl py-2 pl-2 p-2 text-slate-900 rounded-md bg-opacity-10 fixed bg-slate-200 top-16 right-5 left-5 bottom-16 overflow-auto drop-shadow-lg">
        { (messages.length == 1 && messages[0].FTS_DOC_ID == -1) ? 
          <div className="h-screen flex items-center justify-center">
            <BounceLoader height="100" width="10" margin="10"></BounceLoader> 
          </div> :
          messages.map((item, index) => {
             return <div key={item.FTS_DOC_ID} className="m-2 pl-4 pr-4 p-2 bg-gray-800 rounded-md bg-opacity-50 w-fit drop-shadow-md">
                 <span className="text-orange-500">{item.alias}</span> &nbsp; &nbsp;
                 <span className="text-gray-400">{item.text}</span>
             </div>
            })
        }
        <div ref={messagesEndRef} />
      </div>
      <div id="sendmessage" className="fixed bottom-2 right-2 left-5">
        <input 
          value={alias} id="alias" type="text" placeholder="Alias"
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-1/4 text-xl leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ml-0 mr-5 ring-1 ring-slate-200 shadow-sm opacity-25" 
          onInput={e => setAlias(e.target.value)} />
        <input 
          id={id} value={message} type="text" placeholder="Chat here"
          className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-2/4 text-xl leading-6 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ml-0 ring-1 ring-slate-200 shadow-sm opacity-25" 
          onInput={e => setMessage(e.target.value)} 
          onKeyPress = { (event) => {
            if (event.key === 'Enter') {
              sendMessage()
            }
          }} />
        <button onClick = { sendMessage } className="text-xl bg-gray-900 hover:bg-gray-800 text-white font-light py-2 pl-2 p-2 opacity-75 rounded-md w-1/8">
          Send
        </button>
      </div>
    </>
  );
};

export default Chat;
