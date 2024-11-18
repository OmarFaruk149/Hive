import React, { useState, useEffect } from "react";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  increment,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import "../Components/Login.css";
import Like from "../images/like.png";
import Comment from "../images/comment.png";
import share from "../images/share.png";
import CommentSection from "./CommentSection";
import { Trash2 } from "lucide-react";

export default function PostContainer({ notun_data, unknown }) {
  const postRef = collection(db, "/postContainer");
  const [comment, setComment] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [Data, setData] = useState([]);
  const [postId, setPostId] = useState("");
  useEffect(() => {
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        post_ID: doc.id,
      }));

      if (unknown === "Profile") {
        const userPost = data.filter((data) => {
          return data.uid === notun_data.id;
        });
        setData(userPost);
      } else {
        setData(data);
      }
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
    console.log("");
  }, [Data]);

  const deletePost = async () => {
    try {
      const postInfo = doc(db, `postContainer`, postId);
      await deleteDoc(postInfo);
      setIsOpen(false);
      setPostId("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold text-gray-800">
              Are you sure?
            </h2>
            <p className="text-gray-600 mt-2">
              This action cannot be undone. Do you want to proceed?
            </p>
            <div className="mt-4 flex justify-end space-x-3">
              <button
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                onClick={() => {
                  setIsOpen(false);
                  setPostId("");
                }}
              >
                Cancel
              </button>

              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={(e) => {
                  e.preventDefault();
                  deletePost();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="py-6 login-form">
        {Data.map((item) => (
          <div className="bg-gray-300  mx-5 rounded-lg  my-6">
            <div className="">
              <div className="p-4">
                <div className="flex justify-between">
                  <div className="flex">
                    <img
                      src={item.user_image}
                      alt="User Avatar"
                      className="w-10 h-10 mr-1 rounded-full"
                    />
                    <div className="">
                      <div className="px-1 font-medium text-cyan-700">
                        {item.user_name}
                      </div>
                      <div className="px-1 text-gray-500 text-sm">{"3d."}</div>
                    </div>
                  </div>
                  {notun_data.id === item.uid && (
                    <button
                      className="text-rose-900 hover:rounded-full hover:bg-gray-400 p-3"
                      onClick={(e) => {
                        e.preventDefault();
                        setPostId(item.post_ID);
                        setIsOpen(true);
                      }}
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
                <div className="mt-2 text-black">{item.postText}</div>
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
                <div className="text-black">{item.like_count}</div>
              </div>
              <hr className="border-solid border-gray-400 my-4" />
              <div className="flex ">
                <button
                  className={`${
                    item.liked_by && item.liked_by.includes(notun_data.id)
                      ? "bg-cyan-400 bg-opacity-80 hover:bg-cyan-500 hover:bg-opacity-50"
                      : " bg-gray-400 hover:bg-gray-500"
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
                  className={`${
                    comment === item.post_ID
                      ? "bg-cyan-400 bg-opacity-80 hover:bg-cyan-500 hover:bg-opacity-50"
                      : " bg-gray-400 hover:bg-gray-500"
                  } flex-1 space-x-1 flex my-2  mx-4 rounded-md p-1 justify-center content-center`}
                  title="Comment"
                  onClick={() => setComment(item.post_ID)}
                >
                  <div className="flex">
                    <img src={Comment} alt="Comment" className="w-6 h-6" />
                  </div>
                  <p className="m-auto px-1">
                    {" "}
                    {item.commentCount ? item.commentCount : ""}{" "}
                  </p>
                </button>

                <button
                  className="flex-1 space-x-1 flex my-2 bg-gray-400 hover:bg-gray-500 mx-4 rounded-md p-1 justify-center content-center "
                  title="Share"
                >
                  <div className="flex">
                    <img src={share} alt="Like" className="w-6 h-6" />
                  </div>
                </button>
              </div>
              <div
                className={`${
                  comment === item.post_ID ? "p-2 px-4" : "hidden"
                } max-h-60`}
              >
                {
                  <CommentSection
                    postID={item.post_ID}
                    notun_data={notun_data}
                  />
                }
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
