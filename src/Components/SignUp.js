import React, { useState } from "react";
import "./Login";
import Bg from "../images/img1.jpg";
import google from "../images/google.svg";
import { createAccount, signInWithGoogle } from "./FirebaseOperations";

export default function SignUp({ setLogin, setValue }) {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [Image, setImage] = useState(null);

  const [visited, setVisited] = useState(false);
  const [acVisited, setAcVisited] = useState(false);

  return (
    <div
      className="bg-cover bg-center h-full w-full fixed overflow-y-scroll login-form"
      style={{
        backgroundImage: `url(${Bg})`,
      }}
    >
      <div className="lg:flex ">
        <section className="section-1  flex-col pt-16 xl:pt-4 lg:pt-4 lg:mt-50 lg:absolute lg:left-20 lg:top-52 xl:left-60">
          <div className="text-teal-400 text-center text-3xl font-bold">
            Welcome To Hive
          </div>
          <div className="text-teal-700 text-center text-lg mb-8">
            Let's Connect!
          </div>
          <div className="flex items-center justify-center">
            <button
              type=""
              className=" bg-[#222f3e] text-teal-400 py-2 px-4 rounded-lg hover:bg-[#151e27] focus:outline-none"
              onClick={() => signInWithGoogle({ setValue, setLogin })}
            >
              <div className="flex">
                <img src={google} alt="" className="mr-1 h-6 w-6" />
                Continue with google
              </div>
            </button>
          </div>
        </section>

        <section className="section-2 p-4 w-96 mx-auto my-10  xl:w-96 lg:w-96 lg:absolute lg:right-48 xl:right-60">
          <div className="bg-slate-800 bg-opacity-50 p-8 rounded-xl shadow-[0px_13px_20px_rgba(50,_20,_10,_1)]">
            <h2 className="text-2xl font-semibold mb-4 text-white">Sign Up</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="Full Name"
                  className="block text-white text-sm font-light mb-2"
                >
                  Full Name
                </label>
                <input
                  type="userName"
                  id="userName"
                  value={userName}
                  placeholder="Full name"
                  className="border rounded-lg bg-gray-900 bg-opacity-50 text-teal-400 border-cyan-950 w-full px-3 py-2 placeholder:select-none focus:outline-none focus:border-[#222f3e]"
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white text-sm font-light mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={userMail}
                  placeholder="Email address"
                  className="border rounded-lg bg-gray-900 bg-opacity-50 text-teal-400 border-cyan-950 w-full px-3 py-2 placeholder:select-none focus:outline-none focus:border-[#222f3e]"
                  onChange={(e) => setUserMail(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-white text-sm font-light mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="Password"
                  value={userPassword}
                  className="border rounded-lg bg-gray-900 bg-opacity-50 text-teal-400 border-cyan-950 w-full px-3 py-2 focus:outline-none focus:border-[#222f3e]"
                  onChange={(e) => setUserPassword(e.target.value)}
                />
              </div>
              <div className="mt-1 flex p-1 justify-center items-center space-x-4">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={(e) => setImage(e.target.files[0])}
                />
                <label
                  htmlFor="fileInput"
                  className="bg-[#222f3e] text-teal-400 py-2 px-4 rounded-lg hover:bg-[#151e27] mb-2"
                >
                  {Image ? "Photo Selected :)" : "Upload Profile photo"}
                </label>
              </div>

              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="bg-[#222f3e] text-teal-400 py-2 px-4 rounded-lg hover:bg-[#151e27] focus:outline-none"
                  onClick={(e) => {
                    createAccount({
                      Image,
                      acVisited,
                      setAcVisited,
                      visited,
                      setVisited,
                      userName,
                      userMail,
                      userPassword,
                      setLogin,
                      setValue,
                    });
                    e.preventDefault();
                  }}
                >
                  Sign Up
                </button>
              </div>
              <div className="text-gray-200 text-center text-xs p-2">
                Already have an account?
              </div>
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="bg-[#222f3e] text-teal-400 py-2 px-4 rounded-lg hover:bg-[#151e27] focus:outline-none"
                  onClick={() => {
                    setValue("Login");
                  }}
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className="section-3"></section>
      </div>
    </div>
  );
}
