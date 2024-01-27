import React, { useCallback } from "react";
import { AuthBG } from "../assets";
import { FcBusinesswoman, FcGoogle } from "react-icons/fc";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";
import { auth } from "../config/firebase.config";

const Authentication = () => {
  const googleProvider = new GoogleAuthProvider();

  const handleSigninWithGoogle = useCallback(async () => {
    try {
      const cred = await signInWithRedirect(auth, googleProvider);
      if (cred) {
        console.log(cred);
      }
    } catch (error) {
      console.error("Login fail", error);
    }
  }, []);

  return (
    <div
      style={{
        background: `url(${AuthBG})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      className="w-screen h-screen flex items-center justify-center sm:px-4"
    >
      <div className="w-full lg:w-96 flex items-center justify-center gap-4 flex-col bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-4 py-6">
        <div className="flex items-center justify-center flex-col gap-1">
          <h1 className="text-stone-900 font-semibold text-2xl">
            Welcome to App Ground
          </h1>
          <p className="text-lg font-medium">Sign in to explore</p>
        </div>
        <div
          onClick={handleSigninWithGoogle}
          className="flex items-center justify-center bg-slate-100 w-full lg:w-3/4 rounded-md border-2 border-gray-400 px-1 py-1 gap-4 cursor-pointer active:scale-95 transition-all ease-out"
        >
          <FcGoogle className="w-8 h-8" />
          <p className="font-semibold text-stone-700">Sign in with email</p>
        </div>
        <div className="flex items-center justify-center w-full lg:w-3/4  bg-slate-100 rounded-md border-2 border-gray-400 px-1 py-1 gap-4 cursor-pointer active:scale-95 transition-all ease-out">
          <FcBusinesswoman className="w-8 h-8" />
          <p className="font-semibold text-stone-700">Be a Guest !!!</p>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
