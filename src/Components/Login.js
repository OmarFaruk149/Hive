import React, { useState } from "react";
import Bg from "../images/img1.jpg";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css"; // Add this import for styles

export default function Login({ setLogin, setValue }) {
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userMail,
        userPassword
      );
      console.log("Welcome to Hive");
      setLogin(true);
      setValue("Home");
    } catch (e) {
      alert(e.message);
    }
  };

  return (
    <div
      className="bg-cover bg-center h-full w-full fixed overflow-y-scroll login-form"
      style={{
        backgroundImage: `url(${Bg})`,
      }}
    >
      <div className="lg:flex xl:flex">
        <section className="section-1 pt-20 flex-col xl:pt-4 lg:pt-4 lg:top-60 lg:absolute lg:left-52 xl:left-60">
          <div className="text-teal-400 text-center text-3xl font-bold">
            Welcome To Hive
          </div>
          <div className="text-teal-700 text-center text-lg mb-8">
            Let's explore!
          </div>
        </section>

        <section className="section-2 p-5 lg:w-96 xl:w-96 lg:absolute lg:right-36 lg:top-28 xl:right-60 ">
          <div className="bg-slate-700 bg-opacity-50 p-8 rounded-xl shadow-[0px_13px_20px_rgba(50,_20,_10,_1)]">
            <h2 className="text-2xl font-semibold mb-4 text-white">Login</h2>
            <form>
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
              <div className="flex items-center justify-center">
                <button
                  type="button"
                  className="bg-[#222f3e] text-teal-400 py-2 px-4 rounded-lg hover:bg-[#151e27] focus:outline-none"
                  onClick={() => handleLogin()}
                >
                  Login
                </button>
              </div>
              <div className="text-gray-200 text-center text-xs p-2">
                Don't have an account?
              </div>
              <div className="flex items-center justify-center">
                <button
                  type=""
                  className="bg-[#222f3e] text-teal-400 py-2 px-4 rounded-lg hover:bg-[#151e27] focus:outline-none"
                  onClick={() => setValue("SignUp")}
                >
                  Sign Up
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
