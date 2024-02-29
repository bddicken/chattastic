import * as React from 'react';
import { useLocation } from "react-router-dom";
import { useId, useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import useInterval from './useInterval';
import './Chat.css';

const Chat = (props) => {
  const location = useLocation();
  const { hash, pathname, search } = location;
  
  const id = useId();
  const [alias, setAlias] = useState(props?.value ?? '');
  const [message, setMessage] = useState(props?.value ?? '');
  const [messages, setMessages] = useState([{alias:'', messages:'Nothing here!', id:0}]);

  const getMessages = () => {
    fetch('http://127.0.0.1:3100/messages' + pathname)
      .then( (response) => { return response.json(); })
      .then( (data) => { setMessages(messages => data); });
  };
  
  const getRecentMessages = () => {
    if (!messages.length) return;
    fetch('http://127.0.0.1:3100/messages' + pathname + '/' + messages[messages.length-1].id)
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
    fetch('http://127.0.0.1:3100/send' + pathname + '/' + alias + '/' + message,
        {
          method: "GET",
          headers: { 'Content-Type': 'application/json' }
        })
      .then( (response) => { return response.json(); })
     .then((data) => {
       getRecentMessages();
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
      <div id="pagetitle"
        class="fixed top-2 right-2"
      >
        <span class="font-semibold text-2xl">
          Chattastic
        </span>
        <span class="font-thin text-2xl">
          {pathname}
        </span>
      </div>

      <div id="mainchat"
        class="text-xl py-2 pl-2 p-2 text-slate-900 rounded-md bg-opacity-10 fixed bg-slate-200 top-20 right-5 left-5 bottom-20 overflow-auto drop-shadow-lg"
      >
        { messages.map((item) => {
           return <div class="m-2 p-2 bg-gray-800 rounded-md bg-opacity-50 w-fit drop-shadow-md">
               <span class="text-orange-500">{item.alias}</span> &nbsp; &nbsp;
               <span class="text-gray-400">{item.text}</span>
           </div>
          })
        }
        <div ref={messagesEndRef} />
      </div>
      <div id="sendmessage" class="fixed bottom-2 right-2 left-2">
        <input 
          id='alias'
          class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-1/4 text-xl leading-6 m-5 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ml-2 mr-5 ring-1 ring-slate-200 shadow-sm opacity-25" 
          type="text"
          placeholder="Alias"
          value={alias}
          onInput={e => setAlias(e.target.value)} 
          />
        <input 
          id={id}
          class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-2/4 text-xl leading-6 m-5 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ml-0 ring-1 ring-slate-200 shadow-sm opacity-25" 
          type="text"
          placeholder="Chat here"
          value={message}
          onInput={e => setMessage(e.target.value)} 
          onKeyPress = { (event) => {
                if (event.key === 'Enter') {
                  sendMessage()
                }
              }}
          />
             
        <button 
          class="text-xl bg-gray-900 hover:bg-gray-800 text-white font-light py-2 pl-2 p-2 opacity-75 rounded-md w-1/8" >
        Send
        </button>
      </div>
    </>
  );
};

export default Chat;
