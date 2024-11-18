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
            <div className="Comment bg-gray-400 p-2 m-1 rounded-xl">
              <div className="font-semibold  flex justify-between">
                <div className="text-cyan-600">{comment.name}</div>
                {notun_data.id === comment.user_id && (
                  <div className="flex justify-between">
                    <div className="flex">
                      <button
                        className=" px-2 hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          setComment(comment.text);
                          setCommentId(()=>comment.id);
                        }}
                      >
                        {" "}
                        <Edit size={16} />{" "}
                      </button>
                      <button
                        className=" pr-2 hover:underline"
                        onClick={() => deleteComment(postID, comment.id)}
                      >
                        <Trash color="#b71f1f" size={16} />
                      </button>
                    </div>
                  </div>
                )}
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
