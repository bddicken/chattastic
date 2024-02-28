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
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/*" element={<Chat />} />
        </Routes>

      </header>
    </>
  );
};

export default App;
