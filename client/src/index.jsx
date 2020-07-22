import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
const locId = new URL(window.location.href);
const newLoc = locId.pathname;
const urltest=newLoc.slice(1, 9);
console.log(urltest);

ReactDOM.render(<App test={urltest}/>, document.getElementById('image-main'));
