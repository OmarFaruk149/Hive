import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  increment,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

const CommentSection = ({ postID, notun_data }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const postRef = collection(db, `postContainer/${postID}/Comments`);
  const postLoc = doc(db, "/postContainer", postID);

  const handleSubmit = async (e) => {
    e.preventDefault();

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
            <div className="Comment bg-gray-700 p-2 m-1 rounded-xl">
              <div className="font-semibold">{comment.name}</div>
              <div className="text-gray-300">{comment.text}</div>
            </div>
          </div>
        ))}
      </div>
      <section className="sticky bottom-0 w-full bg-gray-800 p-2">
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
            className="w-full p-2 bg-gray-700 text-gray-200 rounded-full focus:outline-none"
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
