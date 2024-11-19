import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  increment,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

import { Edit, Trash } from "lucide-react";

const CommentSection = ({ postID, notun_data }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const postRef = collection(db, `postContainer/${postID}/Comments`);
  const postLoc = doc(db, "/postContainer", postID);
  const [commentID, setCommentId] = useState("");

  const deleteComment = async (postID, commentID) => {
    try {
      const commentRef = doc(db, `postContainer/${postID}/Comments`, commentID);
      await deleteDoc(commentRef);
      await updateDoc(postLoc, {
        commentCount: increment(-1),
      });
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (commentID) {
      try {
        const commentRef = doc(
          db,
          `postContainer/${postID}/Comments/${commentID}/`
        );
        await updateDoc(commentRef, { text: comment, editedAt: new Date() });
      } catch (error) {
        console.error("Error updating comment:", error);
      }
      setCommentId("");
      setComment("");
    } else {
      try {
        setLoading(true);
        await addDoc(postRef, {
          text: comment,
          user_id: notun_data.id,
          image: notun_data.photo,
          name: notun_data.name,
          time: serverTimestamp(),
        });
        await updateDoc(postLoc, {
          commentCount: increment(1),
        });
        setComment("");
      } catch (error) {
        console.log("error to upload comment");
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const getData = onSnapshot(postRef, (snap) => {
      const data = snap.docs.map((data) => ({ id: data.id, ...data.data() }));
      setComments(() => data);
    });
  }, []);
  
  const getTimeDifference = (uploadedTime) => {
    const now = new Date();
    const uploadedDate = uploadedTime.toDate
      ? uploadedTime.toDate()
      : new Date(uploadedTime); // Support both Firestore Timestamp and ISO string
    const diffInMs = now - uploadedDate;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30); // Approximation
    const years = Math.floor(days / 365); // Approximation

    if (seconds < 60) return `${seconds} sec ago`;
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hr ago`;
    if (days < 30) return `${days} days ago`;
    if (months < 12) return `${months} months ago`;
    return `${years} years ago`;
  };

  return (
    <div className="my-2 max-h-56 overflow-y-auto">
      <div>
        {comments.map((comment) => (
          <div className="flex" key={comment.id}>
            <img
              src={comment.image}
              alt={comment.name}
              className="w-8 h-8 rounded-full m-1"
            />
            <div className="Comment bg-gray-200 p-2 m-1 rounded-xl">
              <div className="">
                <div className="font-semibold text-cyan-600 flex justify-between space-x-10">
                  <h1>{comment.name}</h1>
                  {notun_data.id === comment.user_id && (
                  <div className="flex">
                      <button
                        className="p-2 rounded-full bg-cyan-400/30 hover:bg-cyan-400/60"
                        title="Edit comment"
                        onClick={(e) => {
                          e.preventDefault();
                          setComment(comment.text);
                          setCommentId(() => comment.id);
                        }}
                      >
                        {" "}
                        <Edit size={12} />{" "}
                      </button>
                      <button
                        className="p-2 ml-1 rounded-full bg-rose-400/30 hover:bg-rose-300"
                        title="Delete comment"
                        onClick={() => deleteComment(postID, comment.id)}
                      >
                        <Trash color="#b71f1f" size={12} />
                      </button>
                    
                  </div>
                )}
                </div>
                  <div className="text-gray-500/80 text-xs font-light">
                    {comment.time && getTimeDifference(comment.time)}
                  </div>
              </div>
              <div className="text-black">{comment.text}</div>
            </div>
          </div>
        ))}
      </div>
      <section className="sticky bottom-0 w-full bg-gray-300 p-2">
        <form onSubmit={handleSubmit} className="flex mt-2 space-x-2">
          <img
            src={notun_data.photo}
            alt={notun_data.name}
            className="h-8 w-8 rounded-full m-auto"
          />
          <input
            type="text"
            placeholder="Add a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full p-2 bg-gray-400 text-gray-900 placeholder-gray-700 rounded-full focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            className={`bg-cyan-500 text-white p-2 rounded-lg ${
              loading && "cursor-not-allowed opacity-50"
            }`}
            disabled={loading}
          >
            {loading ? "Posting..." : "Post"}
          </button>
        </form>
      </section>
    </div>
  );
};

export default CommentSection;
