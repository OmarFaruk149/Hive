import React from "react";
import Contact from "../images/contact-active.svg";
import Home from "../images/home-svgrepo-com.svg";
import Text from "../images/text-active.svg";
import Logout from "../images/logout.svg";
import UserProfile from "../images/fb dp.jpg";
import Logo from "../images/logoHive.png";
import Games from "../images/games.svg";

export default function Navbar({ setValue, setLogin }) {
  return (
    <div className="bg-gray-800 text-white py-2 px-5 sticky top-0">
      <nav className="">
        <div className="mx-auto flex justify-between items-center">
          <img
            src={Logo}
            alt=""
            className="h-8 w-8 ml-6 rounded-full border-2 border-cyan-500 shadow-[0px_1px_15px_rgba(0,_196,_270,_1)]"
          />
          <div className="ml-16 flex justify-center text-xl italic font-semibold text-cyan-300 border-b-2 border-b-cyan-500 shadow-[0px_1px_15px_rgba(0,_196,_270,_.8)] w-1/6 bg-gray-800 rounded-full p-2">
            Hive
          </div>
          <div className="space-x-6 flex flex-row">
            <button
              className="Home cursor-pointer button bg-gray-400 hover:bg-gray-300 shadow-[0px_1px_15px_rgba(0,_196,_270,_1)] p-1 rounded-full"
              title="Home"
            >
              <img
                src={Home}
                alt="Home"
                className="h-8 w-8 p-1"
                onClick={() => setValue("Home")}
              />
            </button>
            <button
              className="Home cursor-pointer button bg-gray-400 hover:bg-gray-300 shadow-[0px_1px_15px_rgba(0,_196,_270,_1)] p-1 rounded-full"
              title="Games"
            >
              <img
                src={Games}
                alt="Games"
                className="h-8 w-8 p-1"
                onClick={() => setValue("Games")}
              />
            </button>
            <button
              className="contacts cursor-pointer  bg-gray-400 hover:bg-gray-300 shadow-[0px_1px_15px_rgba(0,_196,_270,_1)] p-1 rounded-full"
              title="User list"
              onClick={() => setValue("Friends")}
            >
              <img src={Contact} alt="contacts" className="h-8 w-8 p-1" />
            </button>
            <button
              className="chat cursor-pointer bg-gray-400 hover:bg-gray-300 shadow-[0px_1px_15px_rgba(0,_196,_270,_1)] p-1 rounded-full"
              title="Chat list"
              onClick={() => setValue("Chat")}
            >
              <img src={Text} alt="" className="h-8 w-8 p-1" />
            </button>
            <button
              className="ownProfile cursor-pointer  bg-gray-400 hover:bg-gray-300 shadow-[0px_1px_15px_rgba(0,_196,_270,_1)] p-1 rounded-full"
              title="Profile"
              onClick={() => setValue("UserProfile")}
            >
              <img src={UserProfile} alt="Profile" className="h-8 w-8 rounded-full" />
            </button>
            <button
              className="logout cursor-pointer bg-gray-400 hover:bg-gray-300 shadow-[0px_1px_15px_rgba(0,_196,_270,_1)] p-1 rounded-full"
              title="LogOut"
              onClick={() => {
                setLogin(false);
                setValue("SignUp");
              }}
            >
              <img src={Logout} alt="Logout" className="h-8 w-8 p-1" />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
