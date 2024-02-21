import * as React from 'react';
import { useLocation } from "react-router-dom";
import { useId, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './Chat.css';

const Chat = (props) => {
  const location = useLocation();
  const { hash, pathname, search } = location;
  
  const id = useId();
  const [message, setMessage] = useState(props?.value ?? '');

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
        class="text-xl py-2 pl-2 p-2 text-slate-500 rounded-md opacity-10 fixed bg-slate-200 top-14 right-5 left-5 bottom-20"
      >
      </div>
      <div id="sendmessage" class="fixed bottom-2 right-2 left-2">
        <input 
          id={id}
          class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-2/4 text-xl leading-6 m-5 text-slate-900 placeholder-slate-400 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm opacity-25" 
          type="text"
          placeholder="Chat here"
          value={message}
          onInput={e => setMessage(e.target.value)} />
             
        <button 
          class="text-xl bg-gray-900 hover:bg-gray-800 text-white font-light py-2 pl-2 p-2 opacity-75 rounded-md" >
        Send
        </button>
      </div>
    </>
  );
};

export default Chat;
