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
    <div className="showOff relative">
      <div className="CoverPic relative overflow-hidden">
        <img
          src={
            notun_data[0] && notun_data[0].coverPhoto
              ? notun_data[0].coverPhoto[0]
              : CoverPic
          }
          alt="Cover Photo"
          className="rounded-b-xl w-full"
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <img
            src={
              notun_data[0] && notun_data[0].photo
                ? notun_data[0].photo
                : UserProfile
            }
            alt="Profile"
            className="rounded-full h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-56 border-4 border-white"
          />
        </div>
        <div className="text-white absolute bottom-0 left-0 p-4">
          <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
            {notun_data[0] && notun_data[0].name
              ? notun_data[0].name
              : "UserProfile"}
          </h1>
        </div>
      </div>
    </div>
    <div className="flex justify-center content-center pb-6 pt-20">
      <div className="upload-cover mt-4 md:mt-8 lg:mt-12 xl:mt-16 p-1 space-x-4">
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
      <div className="upload-profile mt-4 md:mt-8 lg:mt-12 xl:mt-16 p-1 space-x-4">
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
