import React from "react";
import MyButton from "./MyButton";
import { UserData } from "../UserDataFor";
export default function Profile() {
  return (
    <>
      <div className="bg-gray-700 p-4">
        {UserData.map((data, index) => (
          <div className="p-5 m-6 text-white rounded-lg bg-gray-800 w-1/2 ">
            <div className="flex">
              <img
                src={data.image}
                alt={data.name}
                className="rounded-full h-36 w-36"
              />
              <div className="">
              <h1 className="avatar text-lg font-bold mx-2">{data.name}</h1>
              <div className="mx-2 mb-2">Connects: {data.age}</div>

              </div>
            </div>
            <div className="">
              <MyButton first=" Add friend " second=" Follow " />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
