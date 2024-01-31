import React, { useState } from "react";

export default function Friends({ userDatabase, userId }) {
  const [memory, setMemory] = useState("friend");

  const userData = userDatabase[0]
    ? userDatabase.filter((data) => data.id !== userId)
    : [null];

  return (
    <div className=" text-white h-full p-5 w-full bg-gray-700">
      <div className="Title flex space-x-4">
        <div
          className={`${
            memory == "friend" ? "text-cyan-500" : "hover:bg-gray-600"
          } rounded-full  bg-gray-800 p-2 ml-2`}
          onClick={() => setMemory("friend")}
        >
          Find friends
        </div>
        <div
          className={`${
            memory == "request" ? "text-cyan-500" : "hover:bg-gray-600"
          } rounded-full  bg-gray-800 p-2 ml-2`}
          onClick={() => setMemory("request")}
        >
          Friend requests
        </div>
      </div>

      <section className={`Section-1 ${memory !== "friend" ? "hidden" : ""} `}>
        <div className="Find-friend box-border md:flex md:flex-wrap md:justify-between">
          {userData.map((data, index) => (
            <div className="p-5 text-white rounded-xl bg-gray-800 my-2 w-full md:w-5/12 lg:w-80 ">
              <div className="flex">
                <img
                  src={data.photo}
                  alt={data.name}
                  className="rounded-full h-16 w-16"
                />
                <div className="ml-2">
                  <h1 className="avatar text-lg font-bold">{data.name}</h1>
                  <div className="mb-2">Connects: {"NaN"}</div>
                </div>
              </div>
              <div className="flex md:justify-end py-2 space-x-2">
                <button
                  className="bg-cyan-700 rounded-lg p-2 hover:bg-cyan-600"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="">Add+</div>
                </button>
                <button
                  className="bg-cyan-700 rounded-lg p-2 hover:bg-cyan-600"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="">Profile</div>
                </button>
                <button
                  className="bg-cyan-700 rounded-lg p-2 hover:bg-cyan-600"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="">Message</div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className={`Section-2 ${memory !== "request" ? "hidden" : ""} `}>
        <div className="Find-friend box-border md:flex md:flex-wrap md:justify-between">
          {userData.map((data, index) => (
            <div className="p-5 text-white rounded-xl bg-gray-800 my-2 w-full md:w-5/12 lg:w-80 ">
              <div className="flex">
                <img
                  src={data.photo}
                  alt={data.name}
                  className="rounded-full h-16 w-16"
                />
                <div className="ml-2">
                  <h1 className="avatar text-lg font-bold">{data.name}</h1>
                  <div className="mb-2">Connects: {"NaN"}</div>
                </div>
              </div>
              <div className="flex md:justify-end py-2 space-x-2">
                <button
                  className="bg-cyan-700 rounded-lg p-2 hover:bg-cyan-600"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="">Accept</div>
                </button>
                <button
                  className="bg-cyan-700 rounded-lg p-2 hover:bg-cyan-600"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="">Profile</div>
                </button>
                <button
                  className="bg-cyan-700 rounded-lg p-2 hover:bg-cyan-600"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  <div className="">Message</div>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
