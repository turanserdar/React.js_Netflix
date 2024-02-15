import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { auth } from 'firebase/auth';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginScreen from './LoginScreen';

useEffect(()=>{

const unsubscribe = auth.onAuthStateChange((userAuth) => {

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
  return (
    <div className="app">
 
 {!user ? <LoginScreen/> : <RouterProvider router={router}> <HomeScreen/> </RouterProvider>
  
 }
     
      

    </div>
  );
}

export default App;
