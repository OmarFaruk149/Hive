import React, { useState, useEffect, useMemo } from "react";
import Post from "./Post";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import Like from "../images/like.png";
import Comment from "../images/comment.png";
import share from "../images/share.png";

export default function PostContainer({ notun_data }) {
  const postRef = collection(db, "/postContainer");

  const [Data, setData] = useState([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        post_ID: doc.id,
      }));
      setData(data);
    });
    return () => unsubscribe();
  }, []);

  const handleLike = async (post_ID, liked_by, like_count) => {
    const postLoc = doc(db, "/postContainer", post_ID);
    try {
      if (!liked_by.includes(notun_data.id)) {
        await updateDoc(postLoc, {
          like_count: increment(1),
          liked_by: arrayUnion(notun_data.id),
        });
      } else {
        await updateDoc(postLoc, {
          like_count: like_count - 1,
          liked_by: liked_by.filter((id) => id !== notun_data.id),
        });
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    console.log("Updated Data:", Data);
  }, [Data]);

  return (
    <div className="">
      {Data.map((item) => (
        <div className="bg-gray-800 text-white mx-5 rounded-lg  mt-6">
          <div className="">
            <div className="p-4">
              <div className="flex items-center">
                <img
                  src={item.user_image}
                  alt="User Avatar"
                  className="w-10 h-10 mr-1 rounded-full"
                />
                <div className="">
                  <div className="px-1 font-medium text-gray-300">
                    {item.user_name}
                  </div>
                  <div className="px-1 text-gray-400 text-sm">{"3d."}</div>
                </div>
              </div>
              <div className="mt-2">{item.postText}</div>
            </div>
            <div className="my-3">
              {item.post_image ? (
                <img src={item.post_image} alt="" className="w-full" />
              ) : (
                <span></span>
              )}
            </div>
            <div className="my-2 ml-4 flex flex-row space-x-2">
              <div className="w-5 h-5 rounded-full">
                <img
                  src={Like}
                  alt="Like"
                  className="bg-cyan-500 rounded-full p-1"
                />
              </div>
              <div className="">{item.like_count}</div>
            </div>
            <hr className="border-solid border-gray-700 my-4" />
            <div className="flex ">
              <button
                className={`${
                  item.liked_by && item.liked_by.includes(notun_data.id)
                    ? "bg-cyan-300 bg-opacity-80 hover:bg-cyan-400 hover:bg-opacity-50" 
                    : " bg-gray-600 hover:bg-gray-700"
                } flex-1 space-x-1 flex my-2   mx-4 rounded-md p-1 justify-center content-center`}
                title="Like"
                onClick={() =>
                  handleLike(item.post_ID, item.liked_by, item.like_count)
                }
              >
                <div className="flex">
                  <img
                    src={Like}
                    alt="Like"
                    className="w-6 h-6 bg-cyan-500 rounded-full p-1"
                  />
                </div>
              </button>

              <button
                className="flex-1 space-x-1 flex my-2 bg-gray-700 hover:bg-gray-600 mx-4 rounded-md p-1 justify-center content-center"
                title="Comment"
              >
                <div className="flex">
                  <img src={Comment} alt="Like" className="w-6 h-6" />
                </div>
              </button>

              <button
                className="flex-1 space-x-1 flex my-2 bg-gray-700 hover:bg-gray-600 mx-4 rounded-md p-1 justify-center content-center "
                title="Share"
              >
                <div className="flex">
                  <img src={share} alt="Like" className="w-6 h-6" />
                </div>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
