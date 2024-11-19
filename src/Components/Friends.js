import React, { useEffect, useState } from "react";
import "../Components/Login.css";
import { FieldValue, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Friends({ userDatabase, userId }) {
  const [memory, setMemory] = useState("friend");
  const [added,setAdded] = useState('');
  
  const idList = userDatabase[0] 
  ? userDatabase.find((data) => data.id === userId)
  : null;


const requestList = idList && idList.friendRequest
  ? userDatabase.filter((data) => idList.friendRequest[data.id] === true)
  : [];
  
  const userData = userDatabase[0]
  ? userDatabase.filter((data) => {
    return data.id !== userId &&
      !(idList.friendRequest && idList.friendRequest[data.id] === true) &&
      !(idList.friends && idList.friends[data.id] === true) &&
      !(idList.requested && idList.requested[data.id] === true);
  })
  : [null];

  const requestedList = idList && idList.requested
  ? userDatabase.filter((data) => idList.requested[data.id] === true)
  : [];

// console.log("userData: ", userData);

  const userRef = doc(db,"/userProfileData",userId);


  const handleAdd = (userId,requestId)=>{
    const requestRef = doc(db,"/userProfileData",requestId);
    setAdded('added');
    updateDoc(requestRef,{
      [`friendRequest.${userId}`]: true,
    })
    updateDoc(userRef,{
      [`requested.${requestId}`]:true,
    })
  }
  
  const handleAccept = (userIdToAccept)=>{
    updateDoc(userRef,{
      [`friends.${userIdToAccept}`]: true,
      [`friendRequest.${userIdToAccept}`]: false,
    })
    updateDoc(doc(db,'/userProfileData',userIdToAccept),{
      [`requested.${userId}`]:false,
      [`friends.${userId}`]: true,
    });
  }
const handleCancel = (userIdToCancel)=>{
  updateDoc(userRef,{
    [`requested.${userIdToCancel}`]:false,
  })
  updateDoc(doc(db,'/userProfileData',userIdToCancel),{
    [`friendRequest.${userId}`]:false,
  })
}
// console.log("request: " + requestList);

  return (
    <div className="  h-full p-5 bg-gray-100  login-form">
      <div className="Title flex space-x-2">
        <div
          className={`${
            memory == "friend" ? "text-cyan-500" : "hover:bg-gray-300"
          } rounded-full  bg-gray-300 p-2`}
          onClick={() => setMemory("friend")}
        >
          Find friends
        </div>
        <div
          className={`${
            memory == "request" ? "text-cyan-500" : "hover:bg-gray-300"
          } rounded-full  bg-gray-300 p-2`}
          onClick={() => setMemory("request")}
        >
          Requests
        </div>
        <div
          className={`${
            memory == "requested" ? "text-cyan-500" : "hover:bg-gray-300"
          } rounded-full  bg-gray-300 p-2`}
          onClick={() => setMemory("requested")}
        >
          Requested
        </div>
      </div>

      <section className={`Section-1 ${memory !== "friend" ? "hidden" : ""} `}>
        <div className="Find-friend box-border md:flex md:flex-wrap md:justify-between">
          {userData.map((data, index) => (
            <div className="p-5  rounded-xl bg-gray-300 my-2 w-full md:w-5/12 lg:w-80 ">
              <div className="flex">
                <img
                  src={data.photo}
                  alt={data.name}
                  className="rounded-full h-16 w-16"
                />
                <div className="ml-2">
                  <h1 className="avatar text-lg font-bold">{data.name}</h1>
                  <div className="mb-2">Connects: {"None"}</div>
                </div>
              </div>
              <div className="flex md:justify-end py-2 space-x-2">
                <button
                  className="bg-cyan-700 rounded-lg p-2 hover:bg-cyan-600"
                  onClick={(event) => {
                    event.preventDefault();
                     handleAdd(userId,data.id);
                  }}
                >
                  <div className="">{data.friendRequest && data.friendRequest[userId] ? "Requested" : "Add+"}</div>
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
            { requestList &&  requestList.map((data, index) => (
            <div className="p-5  rounded-xl bg-gray-300 my-2 w-full md:w-5/12 lg:w-80 ">
              <div className="flex">
                <img
                  src={data.photo}
                  alt={data.name}
                  className="rounded-full h-16 w-16"
                />
                <div className="ml-2">
                  <h1 className="avatar text-lg font-bold">{data.name}</h1>
                  <div className="mb-2">Connects: {"None"}</div>
                </div>
              </div>
              <div className="flex md:justify-end py-2 space-x-2">
                <button
                  className="bg-cyan-700 rounded-lg p-2 hover:bg-cyan-600"
                  onClick={(event) => {
                    event.preventDefault();
                    handleAccept(data.id);
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

      <section className={`Section-3 ${memory !== "requested" ? "hidden" : ""} `}>
        <div className="Find-friend box-border md:flex md:flex-wrap md:justify-between">
            { requestedList &&  requestedList.map((data, index) => (
            <div className="p-5  rounded-xl bg-gray-300 my-2 w-full md:w-5/12 lg:w-80 ">
              <div className="flex">
                <img
                  src={data.photo}
                  alt={data.name}
                  className="rounded-full h-16 w-16"
                />
                <div className="ml-2">
                  <h1 className="avatar text-lg font-bold">{data.name}</h1>
                  <div className="mb-2">Connects: {"None"}</div>
                </div>
              </div>
              <div className="flex md:justify-end py-2 space-x-2">
                <button
                  className="bg-cyan-700 rounded-lg p-2 hover:bg-cyan-600"
                  onClick={(event) => {
                    event.preventDefault();
                    handleCancel(data.id);
                  }}
                >
                  <div className="">Cancel Request</div>
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
