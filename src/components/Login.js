import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidData } from "../utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
const Login = () => {
  const navigate = useNavigate();
  const [isSignInForm, setIsSignInForm] = useState(true);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
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
            updateProfile(user, {
              displayName: name.current.value,
              photoURL:
                "https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnN8ZW58MHx8MHx8fDA%3D",
            })
              .then(() => {
                // Profile updated!
                const { uid, email, displayName, photoURL } = auth.currentUser;
                dispatch(
                  addUser({
                    uid: uid,
                    email: email,
                    displayName: displayName,
                    photoURL: photoURL,
                  })
                );
                navigate("/browse");
                // ...
              })
              .catch((error) => {
                // An error occurred
                const errorCode = error.code;
                const errorMessage = error.message;
                setErrorMessage(errorCode + " " + errorMessage);
                // ...
              });
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
            navigate("/browse");

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
              ref={name}
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
