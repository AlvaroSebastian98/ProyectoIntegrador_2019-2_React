import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp({
	apiKey: "AIzaSyBz0Mr7mCZW18Aw53dEKoPR9HPXfxA-zVQ",
    authDomain: "cachuelitos-6cccd.firebaseapp.com",
    databaseURL: "https://cachuelitos-6cccd.firebaseio.com",
    projectId: "cachuelitos-6cccd",
    storageBucket: "cachuelitos-6cccd.appspot.com",
    messagingSenderId: "595409677157",
    appId: "1:595409677157:web:00e72664cca71d26"
});

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
