"use client";

import React from "react";
import styles from "./deleteModal.module.css";
import { deleteBlog } from "@/app/services/blogService";

const DeleteModal = ({ isDeleteOpen, onClose, blog }) => {
  if (!isDeleteOpen) return null;

  const handleDeleteBlog = async (e) => {
    e.preventDefault()
    await deleteBlog(blog.id);
    onClose()
    window.location.reload();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Please confirm if you wish to 
          <br/>delete the post
        </h2>
        <p>
          Are you sure you want to delete the post?
          <br/>Once deleted, it cannot be recovered.
        </p>
        <div className={styles.modalButtons}>
          <button className={`${styles.cancelBtn} ibm-plex-sans-semibold`} onClick={onClose}>
            Cancel
          </button>
          <button className={`${styles.deleteBtn} ibm-plex-sans-semibold`} onClick={handleDeleteBlog}>Delete</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
