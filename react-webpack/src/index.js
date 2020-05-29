import React from 'react'
import ReactDOM from 'react-dom'
import Root from './components/Root'
import './styles/index.scss'
import firebase from 'firebase/app';


var firebaseConfig = {
    apiKey: "AIzaSyCkVVyrHWi32OKrfG2JnUAKlMvMnhnct44",
    authDomain: "pwa-react-8d964.firebaseapp.com",
    databaseURL: "https://pwa-react-8d964.firebaseio.com",
    projectId: "pwa-react-8d964",
    storageBucket: "pwa-react-8d964.appspot.com",
    messagingSenderId: "592650319409",
    appId: "1:592650319409:web:40a1686c9e5fb466510710",
    measurementId: "G-KXNYB729ZQ"
  };
  firebase.initializeApp(firebaseConfig);



ReactDOM.render(<Root />, document.getElementById('root'))

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js')
            .then(registration => {
                console.log('SW registered', registration)
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: "BN5y2E--g0WG6aQoCtyFVIE9MsjO_x2j0dMVZ8B4gItRi0Ndcsk5yD9egDR5N9W8-5_RLLQXdJuWh4F8owj85Nk"
                }).then(function (sub) {
                    //This never executes and catch gets called
                    let deferredPrompt;
                    window.addEventListener('beforeinstallprompt', (e) => {
                        // Prevent the mini-infobar from appearing on mobile
                        e.preventDefault();
                        // Stash the event so it can be triggered later.
                        console.log(e);
                        deferredPrompt = e;
                        // Update UI notify the user they can install the PWA
                        showInstallPromotion();
                    });
                    console.log('Subscription successful, Subscription endpoint:', sub.endpoint);
                }).catch(function (error) {
                    console.log("Error during subscription ", error);
                });
                Notification.requestPermission().then(p => {
                    console.log(p)
                })
            })
            .catch(e => {
                console.log('SW registration failed: ', e)
            })
    })
}
