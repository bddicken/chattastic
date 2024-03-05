import React from 'react';
import Popup from 'reactjs-popup';
import { useId, useState, useEffect, useRef } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './CustomPopup.css';

function CustomPopup (props) {

  const sr = props.results;
  console.log('SR:' + sr)
  const [results, setResults] = useState([{room: 'none'}]);

  const getResults = () => {
    /* Code this in video */
    fetch('http://127.0.0.1:3100/search/' + sr)
      .then( (response) => { return response.json(); })
      .then( (data) => { setResults(results => data); });
  };
  
  useEffect(() => {
    getResults();
  }, [sr]);

return (
  <Popup
    trigger={
      <button 
        className=" button bg-gray-900 hover:bg-gray-800 text-white font-light py-2 px-4 py-5"> Search 
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
        { results.map((item, index) => {
           return <div className="ml-0 mr-2 mb-5 pl-4 pr-4 p-2 bg-gray-500 rounded-md bg-opacity-50 w-fit drop-shadow-md">
            <Link 
              key={index} 
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
);
}

export default CustomPopup;
