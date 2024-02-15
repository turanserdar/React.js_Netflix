import React from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginScreen from './LoginScreen';

const user=null;
const router = createBrowserRouter([
  {
    path: "/",
    element:  <HomeScreen />,
  },
  {
    path: "/login",
    element:  <LoginScreen />,
  },
]);


function App() {
  return (
    <div className="app">
 
 {!user ? <LoginScreen/> : <RouterProvider router={router} />
  
 }
      
      

    </div>
  );
}

export default App;
