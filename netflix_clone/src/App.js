import React from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginScreen from './LoginScreen';

const user=null;
const router = createBrowserRouter([
  {
    path: "/",
    element:  <HomeScreen />,
  },
]);


function App() {
  return (
    <div className="app">
 
 {!user ? <LoginScreen/> :  <RouterProvider router={router} />
 }
      
      

    </div>
  );
}

export default App;
