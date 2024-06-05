"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./editCommentModal.module.css";
import { updateComment } from "@/app/services/commentService";
import { useRouter } from "next/navigation";

const EditCommentModal = ({ isEditOpen, onClose, comment }) => {
  if (!isEditOpen) return null;

  const [user, setUser] = useState(null);
  const [commentText, setComment] = useState('');

  const dropdownRef = useRef(null);
  const router = useRouter()


  useEffect(() => {
    const username = sessionStorage.getItem('loggedInUser')
    if (username) {
      setUser(username)
    }
    else {
      setUser(null)
    }
  }, []);

  useEffect(() => {
    if (comment) {
      setComment(comment.comment)
    }
  }, [comment]);



  const handleUpdateComment = async (e) => {
    e.preventDefault();
    try {
      if(commentText == '') {
        alert('กรุณากรอกข้อมูลให้ครบ')
      }
      else {
        await updateComment(comment.id, {comment: commentText});
        onClose()
        window.location.reload()
      }
    } catch (error) {
      console.error('Error update comment:', error);
    }
  };



  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Edit Comment</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.content}>
          <textarea
            className={styles.textarea}
            placeholder="What's on your mind..."
            onChange={(e) => setComment(e.target.value)}
            value={commentText}
          ></textarea>
        </div>
        <div className={styles.footer}>
          <button className={`${styles.cancelButton} ibm-plex-sans-semibold`} onClick={onClose}>
            Cancel
          </button>
          <button className={`${styles.postButton} ibm-plex-sans-semibold`} onClick={handleUpdateComment} >Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default EditCommentModal;
