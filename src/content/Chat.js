import * as React from 'react';
import { useLocation } from "react-router-dom";
var Link = require('react-router').Link

const Chat = (props) => {
  const location = useLocation();
  const { hash, pathname, search } = location;
  console.log('STATE: ' + pathname);
  return (
    <>
      <h1>Subjecttttttttttttt {pathname}</h1>
    </>
  );
};

export default Chat;
