import * as React from 'react';
import { useId, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import '../App.css';
import CustomPopup from './CustomPopup';

function Home(props) {
  
  const id = useId();
  const [subject, setSubject] = useState(props?.value ?? '');
  const [search, setSearch] = useState(props?.value ?? '');

  return (
    <>
      <h1 className="font-semibold text-8xl">
        Chattastic
      </h1>
      <p className="m-5 font-extralight">
        Pick a subject. Start chatting.
      </p>
      <div>
      <input 
        id={id}
        className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-7/12 text-3xl leading-6 m-5 text-slate-900 placeholder-slate-400 rounded-md py-5 pl-5 ring-1 ring-slate-200 shadow-sm opacity-25" 
        type="text"
        placeholder="Type Something"
        value={subject}
        onInput={e => setSubject(e.target.value)} />
      <Link 
        className="bg-gray-900 hover:bg-gray-800 text-white font-light py-2 px-4 rounded py-5"
        to={`/${subject}`}
        state={{"subject":subject}}>
          Chat
      </Link>
      </div>
      <p className="m-5 font-extralight">
        Or, search for relevant chatrooms.
      </p>
      <div>
      <input 
        id={id}
        className="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-7/12 text-3xl leading-6 m-5 text-slate-900 placeholder-slate-400 rounded-md py-5 pl-5 ring-1 ring-slate-200 shadow-sm opacity-25" 
        type="text"
        placeholder="search chats"
        value={search}
        onInput={e => setSearch(e.target.value)} />
        <CustomPopup 
        results={search}></CustomPopup>
      </div>

    </>
  );
}

export default Home;
