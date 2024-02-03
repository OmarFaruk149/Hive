import React, { useState } from "react";
import CoverPic from "../images/fbcover.jpg";
import demo_profile from "../images/use_profile_demo.svg";
import dp from "../images/fb dp.jpg";
import { addPhotoOrCover, imageUpload } from "./FirebaseOperations";
import uploadIcon from "../images/upload.svg";
import "../Components/Login.css";
import Contacts from "./Contacts";
import PostContainer from "./PostContainer";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

export default function UserProfile({ userDatabase, notun_data }) {
  const [memory, setMemory] = useState("");
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  
  const dbRef = collection(db, "/postContainer");

  const handlePost = async (link,postText) => {
    
    try {
      await addDoc(dbRef, {
        uploadTime: new Date(),
        uid: notun_data.id,
        postText: postText,
        post_image: link,
        user_name: notun_data.name,
        user_mail: notun_data.email,
        user_image: notun_data.photo,
        like_count: 0,
        liked_by: [],
      });

      console.log("data uploaded successfuly!!!");
    }
       catch (error) {
      console.error("not upload post data , because of ", error);
    }
  };


  const updateProfile = async () => {
    if (profile) {
      const url = await imageUpload(profile, "photo");
      addPhotoOrCover(notun_data.id, "photo", url);
      handlePost(url,'Profile picture uploaded');
      setProfile(null);
    }
  };
  const updateCover = async () => {
    if (cover) {
      const url = await imageUpload(cover, "CoverPhoto");
      addPhotoOrCover(notun_data.id, "coverPhoto", url);
      handlePost(url,"Cover photo uploaded");
      setCover(null);
    }
  };
  console.log(notun_data);
  return (
    <>
      <div className="h-full  z-0  login-form bg-gray-600">
        <div className="showOff bg-gray-600 relative">
          <div className="CoverPic relative overflow-hidden">
            <img
              src={
                notun_data && notun_data.coverPhoto
                  ? notun_data.coverPhoto
                  : CoverPic
              }
              alt="Cover Photo"
              className="rounded-b-xl w-full"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <img
                src={
                  notun_data && notun_data.photo
                    ? notun_data.photo
                    : UserProfile
                }
                alt="Profile"
                className="rounded-full h-32 w-32 md:h-40 md:w-40 lg:h-48 lg:w-48 xl:h-56 xl:w-56 border-4 bg-gray-800 border-white"
              />
            </div>
          </div>
          <div className="pb-6 pt-10 ">
            <div className="text-white p-4">
              <h1 className="text-2xl md:text-3xl text-center lg:text-4xl xl:text-5xl font-bold">
                {notun_data && notun_data.name
                  ? notun_data.name
                  : "UserProfile"}
              </h1>
            </div>
            <div className="flex justify-center content-center ">
              <div className="upload-cover mt-4 md:mt-8 lg:mt-12 xl:mt-16 p-1 space-x-4">
                <input
                  type="file"
                  id="coverFileInput"
                  className="hidden"
                  onChange={(e) => setCover(e.target.files)}
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
                  onChange={(e) => setProfile(e.target.files)}
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
        </div>
        <hr className="border-solid border-slate-700" />

        <div className="TimeLineUpdate">
          <div className="Title flex text-gray-300 space-x-2 m-4">
            <div
              className={`${
                memory == "friends" ? "text-cyan-500" : "hover:bg-gray-600"
              } rounded-lg  bg-gray-800 p-2`}
              onClick={() => setMemory("friends")}
            >
              Friends
            </div>
            <div
              className={`${
                memory == "timeline" ? "text-cyan-500" : "hover:bg-gray-600"
              } rounded-lg  bg-gray-800 p-2`}
              onClick={() => setMemory("timeline")}
            >
              Timeline
            </div>
          </div>
          <hr className="border-solid border-slate-700 my-4" />
          <div className={`${memory !== 'friends' ?  "hidden" : ""} w-auto p-2 m-auto flex text-cyan-600 justify-center content-center`}>
            <Contacts userDatabase={userDatabase} userId={notun_data.id} />
          </div>

              <div className={`${memory !== 'timeline' ?  "hidden" : ""}  flex text-cyan-600 justify-center content-center`}>
                    <PostContainer notun_data={notun_data} unknown={'Profile'}/>
              </div>

        </div>
      </div>
    </>
  );
}
