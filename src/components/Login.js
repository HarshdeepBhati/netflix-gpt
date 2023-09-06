import { useState } from "react";
import Header from "./Header";
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
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
      <form className="absolute p-12 bg-black w-3/12 my-36 mx-auto left-0 right-0 rounded-lg text-white bg-opacity-80">
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
            type="text"
            placeholder="Email Address"
            className="m-2 p-4 rounded-lg opacity-100 w-full bg-stone-700"
          ></input>
          <input
            type="password"
            placeholder="Password"
            className="m-2 p-4 rounded-lg opacity-100 w-full bg-stone-700"
          ></input>
          <button className="m-2 w-full font-bold p-4 right-0 bg-red-600 my-6 rounded-md">
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
