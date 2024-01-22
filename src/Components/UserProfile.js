import React from "react";
import CoverPic from "../images/fbcover.jpg";
import demo_profile from "../images/use_profile_demo.svg";
import dp from "../images/fb dp.jpg";
export default function UserProfile() {
  return (
    <>
      <div className="h-[90vh]">
        <div className="showOff">
          <div className="CoverPic relative flex justify-center content-center">
            <img
              src={CoverPic}
              alt="Cover Photo"
              className="rounded-b-xl h-6/12 w-8/12"
            />
            <div className="flex row p-1 border-gray-700 bg-gray-700 rounded-full absolute start-72 -bottom-1/4 ">
              <img src={dp} alt="Profile" className="rounded-full h-40 w-40" />
              <div className="absolute -right-52 bottom-3 text-gray-300 font-bold text-4xl">
                Omar Faruk
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
