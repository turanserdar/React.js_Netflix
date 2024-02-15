import "./SignupScreen.css";
import { auth } from './firebase';
import { useRef } from "react";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";




export default function SignupScreen() {
    // const auth = getAuth();

    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const register = (e) => {

        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;

                console.log("Successful registration", user);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("SOMETHING HAPPENED!!!")
                // ..
            });


        // auth.createUserWithEmailAndPassword(
        //     emailRef.current.value,  
        //     passwordRef.current.value).then((authUser)=>{

        //             console.log(authUser)

        //     }).catch(error=>{alert(error.message);
        //     });


    };

    const signIn = (e) => {
        e.preventDefault();

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        signInWithEmailAndPassword(auth,email, password).then((userCredential) => {

            const user = userCredential.user;
            console.log("user signed in",user);

        }).catch((error) => {

            const errorCode = error.code;
            const errorMessage = error.message;
            console.log("SOMETHING HAPPENED!!!")
        });

    };

    return (
        <div className="signupScreen">
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder="Email" type="email" />
                <input ref={passwordRef} placeholder="Password" type="password"/>
                <button type="submit" onClick={signIn}>
                     Sign In
                      </button>

                <h4>
                    <span className="signupScreen__gray">New to Netflix? </span>
                    <span className="signupScreen__link" onClick={register}>Sign Up now.</span>
                </h4>
            </form>
        </div>);
}