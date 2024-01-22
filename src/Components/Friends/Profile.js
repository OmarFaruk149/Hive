import React from "react";
import MyButton from "./MyButton";
import { userData } from "./UserData";
export default function Profile() {
  
  return (
    <>
      {userData.map((data, index) => (
        <div className="p-5 mx-6 mb-6 text-white rounded-lg bg-gray-800 w-1/2 ">
          <h1 className="avatar text-lg font-bold mx-2">{data.name}</h1>
          <div className="mx-2 mb-2">Connects: {data.age}</div>
          <div className="flex">
            <img src={data.image} alt={data.name} className="rounded-full" />
            <MyButton first=" Add friend " second=" Follow " />
          </div>
        </div>
      ))}
    </>
  );
}
