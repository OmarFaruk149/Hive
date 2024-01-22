import React, { useState } from "react";
import { UserData } from "./DataCollection/UserData";
import "./Chat.css";
import ProfileIcon from "../images/profile.svg";
import NotificationIcon from "../images/notification.svg";
import SearchIcon from "../images/search.svg";
import { userData } from "./Friends/UserData";
export default function Chat() {
  const [profile, setProfile] = useState(0);

  return (
    <>
      <div className="flex flex-row text-white h-[90vh] w-full bg-gray-700">
        <div class="section-1 overflow-auto w-3/12 border-r border-gray-800 ">
          <div className="sticky top-0 p-2 bg-gray-700">
            <h1 className="text-lg font-bold">Chat</h1>
          </div>
          <div className="User_list p-2">
            {UserData.map((data, index) => (
              <>
                <div
                  className={`flex ${
                    profile == index
                      ? "bg-gray-800 rounded-lg"
                      : "hover:bg-gray-600 hover:rounded-lg"
                  } `}
                  onClick={() => setProfile(index)}
                >
                  <div className="p-1 h-10 w-14">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="rounded-full"
                    />
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-bold font-sans">
                      {data.name}
                    </div>
                    <div className="text-xs font-extralight text-gray-300">
                      Hi I'm using Hive.
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
        </div>

        <div class="section-2 overflow-auto w-6/12 ">
          <div className="Navbar sticky top-0 bg-gray-700 border-b border-gray-800 w-full">
            <div className="Profile-section flex m-1 p-2 hover:bg-gray-600 hover:rounded-lg w-1/3">
              <img
                src={UserData[profile].image}
                alt={UserData[profile].name}
                className="h-10 w-10 rounded-full"
              />
              <div className="py-2 px-1 font-sans font-bold text-gray-200">
                {UserData[profile].name}
              </div>
            </div>
          </div>

          <div className="NavbarBottom fixed bottom-0 w-6/12 p-2 flex">
            <input
              type="message"
              row="2"
              className=" rounded-full resize-none h-10 w-full p-4 text-black focus:outline-none"
              placeholder="Type your message here"
            />
            <button className="rounded-full m-1 bg-gray-800 p-2">send</button>
          </div>

          <div className="profile flex justify-center content-center m-4 p-4">
            <div className="image">
              <img
                src={UserData[profile].image}
                alt={UserData[profile].name}
                className="rounded-full"
              />
              <div className="font-bold text-sm p-1">
                {UserData[profile].name}
              </div>
            </div>
          </div>
        </div>

        <div class="section-3 overflow-auto w-3/12 l border-l border-gray-800 p-6">
          <div className="flex flex-col justify-center content-center bg-gray-800 rounded-lg pt-6">
            <div className="flex justify-center content-center">
              <img
                src={UserData[profile].image}
                alt={UserData[profile].name}
                className=" rounded-full p-1 h-20 w-20"
              />
            </div>

            <div className="flex justify-center content-center font-bold text-lg font-mono p-1">
              {UserData[profile].name}
            </div>

            <div className="flex justify-center content-center p-4">
              <div className="flex-1">
                <button
                  className="h-10 w-10 bg-gray-600 hover:bg-gray-500 rounded-full"
                  onCanPlay={(event) => event.preventDefault()}
                >
                  <img src={ProfileIcon} alt="Profile" className="p-1" />
                </button>
                <div className="py-1 font-bold font-sans text-gray-100 text-xs ml-1">
                  Profile
                </div>
              </div>

              <div className="flex-1">
                <button
                  className="h-10 w-10 bg-gray-600 hover:bg-gray-500 rounded-full"
                  onCanPlay={(event) => event.preventDefault()}
                >
                  <img src={NotificationIcon} alt="Mute" className="p-1" />
                </button>
                <div className="ml-1 py-1 font-bold font-sans text-gray-100 text-xs">
                  Mute
                </div>
              </div>

              <div className="flex-1">
                <button
                  className="h-10 w-10 bg-gray-600 hover:bg-gray-500 rounded-full"
                  onCanPlay={(event) => event.preventDefault()}
                >
                  <img src={SearchIcon} alt="Search" className="p-1" />
                </button>
                <div className="py-1 font-bold font-sans text-gray-100 text-xs">
                  Search
                </div>
              </div>
            </div>
          </div>{" "}
          {/* end of profile section */}
          <div className="w-full h-10 my-2 hover:bg-gray-600 p-2 rounded-lg bg-gray-800">
            Media
          </div>
          <div className="w-full h-10 my-2 p-2 hover:bg-gray-600 rounded-lg bg-gray-800">
            Report
          </div>
          <div className="w-full h-10 my-2 p-2 hover:bg-gray-600 rounded-lg bg-gray-800">
            Block
          </div>
        </div>
      </div>
    </>
  );
}
