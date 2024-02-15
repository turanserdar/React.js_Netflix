import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { auth } from './firebase';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginScreen from './LoginScreen';


const user='null';
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

  useEffect(()=>{

    const unsubscribe = auth.onAuthStateChanged ((userAuth) => {
    
      if(userAuth)
      {
        //Logged in
        console.log(userAuth); 
      }
      else{
        //Logged out
      }
    
    });
    
    return unsubscribe;
    
    
    },[]);
    

  return (
    <div className="app">
 
 {!user ? <LoginScreen/> : <RouterProvider router={router}> <HomeScreen/> </RouterProvider>
  
 }
     
      

    </div>
  );
}

export default App;
