import * as React from 'react';
import { useId, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './content/Home';
import Chat from './content/Chat';
import NoMatch from './content/NoMatch';
import './App.css';

const App = (props) => {

  const id = useId();
  const [subject, setSubject] = useState(props?.value ?? '');

  return (
    <>
      <header className="App-header">
        <h1 class="font-semibold text-8xl">
          Chattastic
        </h1>
        <p class="m-5 font-extralight">
          Pick a subject. Start chatting.
        </p>
        <input 
          id={id}
          class="focus:ring-2 focus:ring-blue-500 focus:outline-none appearance-none w-2/4 text-3xl leading-6 m-5 text-slate-900 placeholder-slate-400 rounded-md py-5 pl-5 ring-1 ring-slate-200 shadow-sm opacity-25" 
          type="text"
          aria-label="Filter projects"
          placeholder="Type Something"
          value={subject}
          onInput={e => setSubject(e.target.value)} />
             
        <Link 
          class="bg-gray-900 hover:bg-gray-800 text-white font-light py-2 px-4 rounded"
          to={`/${subject}`}
          state={{"subject":subject}}>
            Start Chatting
        </Link>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Chat />} />
        </Routes>

      </header>
    </>
  );
};

export default App;
