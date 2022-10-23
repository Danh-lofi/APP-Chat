import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB8akQLTrXFzrlM4KtBka870KbS5TEmUtE",
  authDomain: "chat-app-70329.firebaseapp.com",
  projectId: "chat-app-70329",
  storageBucket: "chat-app-70329.appspot.com",
  messagingSenderId: "131541599172",
  appId: "1:131541599172:web:3a95a1e994d3ae0b451a91",
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const authentication = getAuth(firebase);
export default authentication;
