import React from 'react';
import Popup from 'reactjs-popup';
import { useId, useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import BounceLoader from "react-spinners/BounceLoader";
import './CustomPopup.css';

function CustomPopup (props) {

  const sr = props.results;
  const [results, setResults] = useState([{room:'.'}]);

  const getResults = () => {
    setResults(results => [{room:'.'}]); 
    fetch('http://127.0.0.1:3100/search/' + sr)
      .then( (response) => { return response.json(); })
      .then( (data) => { setResults(results => data); });
  };
  
return (
  <>
  <Popup
    onOpen={getResults}
    trigger={
        <button 
          className=" button bg-gray-900 hover:bg-gray-800 text-white font-light py-2 px-4 py-5"> 
          Search 
        </button>
      }
    modal
    nested
  >
    {close => (
      <div className="w-full text-white bg-amber-950 opacity-100 drop-shadow-xl w-2/4 p-10">
        <button className="close" onClick={close}>
          &times;
        </button>
        <div className="text-4xl mt-5 mb-5"> Search Results </div>
        <div className="text-xl">
          { (results.length == 1 && results[0].room == '.') ? 
            <div className="h-screen flex items-center justify-center">
              <br/>
              <BounceLoader height="100" width="10" margin="10"></BounceLoader> 
              <br/>
            </div> :
            results.map((item, index) => {
               return <div key={item.room} className="ml-0 mr-2 mb-5 pl-4 pr-4 p-2 bg-gray-500 rounded-md bg-opacity-50 w-fit drop-shadow-md">
                <Link 
                  to={`/${item.room}`}
                  state={{"subject":item.room}}>
                     <span className="text-orange-500">{item.room}</span>
                </Link>
               </div>
              })
          }
        </div>
        <div className="actions text-white">
          <Popup
            trigger={<button className="button"> </button>}
            position="top center"
            nested
          >
          </Popup>
          <button
            className="button"
            onClick={() => {
              console.log('modal closed ');
              close();
            }}
          >
            close
          </button>
        </div>
      </div>
    )}
  </Popup>
  </>
);
}

export default CustomPopup;
