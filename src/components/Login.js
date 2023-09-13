import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../utils/firebase";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const handleButtonClick = () => {
    //Validate the form data
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (!message) {
      if (!isSignInForm)
        createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " " + errorMessage);
            // ..
          });
      else {
        signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        )
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErrorMessage(errorCode + " " + errorMessage);
          });
      }
    }
  };

  return (
    <div>
      <Header></Header>
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/855ed6e2-d9f1-4afd-90da-96023ec747c3/85eb5b91-25ed-4965-ace9-ba8e4a0ead8d/IN-en-20230828-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt="logo"
        ></img>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className="absolute p-12 bg-black w-3/12 my-36 mx-auto left-0 right-0 rounded-lg text-white bg-opacity-80"
      >
        <h1 className="font-bold text-3xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>
        <div className="p-2 opacity-100">
          {!isSignInForm && (
            <input
              type="text"
              placeholder="Full Name"
              className="m-2 p-4 rounded-lg opacity-100 w-full bg-stone-700"
            ></input>
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="m-2 p-4 rounded-lg opacity-100 w-full bg-stone-700"
          ></input>
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="m-2 p-4 rounded-lg opacity-100 w-full bg-stone-700"
          ></input>
          <p className="mx-2 text-red-700 text-sm font-bold">{errorMessage}</p>
          <button
            className="m-2 w-full font-bold p-4 right-0 bg-red-600 my-6 rounded-md"
            onClick={handleButtonClick}
          >
            {isSignInForm ? "Sign In" : "Sign Up"}
          </button>
          <div className="p-6">
            <span className="text-neutral-500">
              {isSignInForm ? "New to Netflix?" : "Already Registered?"}
            </span>
            <span
              className="m-1 hover:underline hover:cursor-pointer"
              onClick={toggleSignInForm}
            >
              {isSignInForm ? "Sign up now." : "Sign in now."}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Login;
