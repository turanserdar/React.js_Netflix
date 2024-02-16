import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';
import { auth } from './firebase';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginScreen from './LoginScreen';
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/login",
    element: <LoginScreen />,
  },
  {
    path:"/profile",
    element: <ProfileScreen/>
  }
]);


function App() {

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((userAuth) => {

      if (userAuth) {
        //Logged in

        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
          );
      } else {
        //Logged out
        dispatch(logout);
      }

    });

    //whenever you use useEffect you should have clean up function.That means our performance is not gonna be effected.
    return unsubscribe;


  }, []);


  return (
    <div className="app">

      {user ? <LoginScreen /> : <RouterProvider router={router}> <HomeScreen /> </RouterProvider>

      }



    </div>
  );
}

export default App;
