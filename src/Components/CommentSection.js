// CommentSection.js
import React, { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

const CommentSection = ({ postID, notun_data }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const commentsRef = collection(db, `/postContainer/${postID}/comments`);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();

    if (comment.trim() === "") return;

    try {
      await addDoc(commentsRef, {
        text: comment,
        user: notun_data.id,
        timestamp: serverTimestamp(),
      });

      setComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleCommentSubmit} className="mb-2">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full p-2 border border-gray-500 rounded"
        />
        <button type="submit" className="bg-cyan-500 text-white p-2 rounded">
          Post
        </button>
      </form>

      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="text-gray-300">
            {comment.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
