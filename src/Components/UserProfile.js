import React, { useState } from "react";
import CoverPic from "../images/fbcover.jpg";
import demo_profile from "../images/use_profile_demo.svg";
import dp from "../images/fb dp.jpg";
import { addPhotoOrCover, imageUpload } from "./FirebaseOperations";
import uploadIcon from "../images/upload.svg";

export default function UserProfile({ userDatabase, mail }) {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const notun_data =userDatabase[0] ? userDatabase.filter((data) =>data.email === mail) : [null];
  console.log(notun_data);
  const updateProfile = async () => {
    if (profile) {
      const url = await imageUpload(profile, "photo");
      addPhotoOrCover(notun_data[0].id, "photo", url);
      setProfile(null);
    }
  };
  const updateCover = async () => {
    if (cover) {
      const url = await imageUpload(cover, "CoverPhoto");
      addPhotoOrCover(notun_data[0].id, "coverPhoto", url);
      setCover(null);
    }
  };
  console.log(notun_data);
  return (
    <>
      <div className="h-full bg-gray-600 z-0">
        <div className="showOff ">
          <div className="CoverPic flex justify-center content-center relative">
            <img
              src={
                notun_data[0] && notun_data[0].coverPhoto
                  ? notun_data[0].coverPhoto[0]
                  : CoverPic
              }
              alt="Cover Photo"
              className="rounded-b-xl h-6/12 w-8/12"
            />
            <div className="row p-1 border-2 border-cyan-400 bg-gray-700 rounded-full absolute start-1/4 -bottom-20 ">
              <img
                src={
                  notun_data[0] && notun_data[0].photo
                    ? notun_data[0].photo
                    : UserProfile
                }
                alt="Profile"
                className="rounded-full h-40 w-40"
              />
              <div className="absolute -right-52 bottom-3 text-gray-300 font-bold text-4xl">
                {notun_data[0] && notun_data[0].name
                  ? notun_data[0].name
                  : "UserProfile"}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center content-center pb-6 pt-20">
          <div className="upload-cover  mt-1   start-56 top-20 p-1  space-x-4">
            <input
              type="file"
              id="coverFileInput"
              className="hidden"
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label
              htmlFor="coverFileInput"
              className={`${
                cover
                  ? "hidden"
                  : "bg-[#222f3e] text-teal-400 py-2 px-4 rounded-lg hover:bg-[#151e27] mb-2"
              }`}
            >
              {"Upload cover"}
            </label>
            <img
              src={uploadIcon}
              alt=""
              className={` ${
                cover ? " h-8 w-8 bg-cyan-500 rounded-lg" : "hidden"
              }`}
              onClick={updateCover}
            />
          </div>
          <div className="upload-profile  mt-1   start-56 top-20 p-1  space-x-4">
            <input
              type="file"
              id="profileFileInput"
              className="hidden"
              onChange={(e) => setProfile(e.target.files[0])}
            />
            <label
              htmlFor="profileFileInput"
              className={`${
                profile
                  ? "hidden"
                  : "bg-[#222f3e] text-teal-400 py-2 px-4 rounded-lg hover:bg-[#151e27] mb-2"
              }`}
            >
              {"Upload profile"}
            </label>
            <img
              src={uploadIcon}
              alt=""
              className={` ${
                profile ? " h-8 w-8 bg-cyan-500 rounded-lg" : "hidden"
              }`}
              onClick={updateProfile}
            />
          </div>
        </div>
      </div>
    </>
  );
}
