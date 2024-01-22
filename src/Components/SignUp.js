import React from "react";
import Bg from "../images/img.jpg";
export default function SignUp({ setLogin, setValue }) {
  return (
    <div
      className="bg-cover bg-center h-screen"
      style={{
        backgroundImage: `url(${Bg})`,
      }}
    >
      <div className="h-screen flex flex-col justify-center items-center gap-2">
        <div className="text-teal-400 text-3xl font-bold">Welcome To Hive</div>
        <div className="text-teal-400 text-lg mb-8">Let's Connect!</div>
        <div className="bg-white bg-opacity-10 pb-4 p-8 rounded-lg shadow-[0px_1px_15px_rgba(0,_196,_270,_.7)] w-2/6">
          <h2 className="text-2xl font-semibold mb-4 text-white">Sign Up</h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-white text-sm font-light mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Place your name here"
                className="border rounded-lg bg-gray-900 bg-opacity-50 text-teal-400 border-cyan-950 w-full  px-3 py-2 focus:outline-none focus:border-[#222f3e]"
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
                placeholder="Place your email here"
                className="border rounded-lg bg-gray-900 bg-opacity-50 text-teal-400 border-cyan-950 w-full  px-3 py-2 placeholder:select-none focus:outline-none focus:border-[#222f3e]"
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
                className="border rounded-lg bg-gray-900 bg-opacity-50 text-teal-400 border-cyan-950 w-full  px-3 py-2 focus:outline-none focus:border-[#222f3e]"
              />
            </div>

            

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-1/3 bg-[#222f3e] text-teal-400 py-2 px-4 rounded-lg hover:bg-[#151e27] focus:outline-none"
                onClick={() => {
                  setValue("Home");
                  setLogin(true);
                }}
              >
                Submit
              </button>
            </div>

            <div className="flex justify-center text-white text-sm font-extralight m-1">
              Already have an account ?
            </div>
            <div className="flex items-center justify-center">
              <button
                type=""
                className=" bg-[#222f3e] text-teal-400 py-2 px-4 rounded-lg hover:bg-[#151e27] focus:outline-none"
                onClick={() => setValue("Login")}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
