"use client";

import React from "react";
import styles from "./deleteCommentModal.module.css";
import { deleteComment } from "@/app/services/commentService";

const DeleteCommentModal = ({ isDeleteOpen, onClose, comment }) => {
  if (!isDeleteOpen) return null;

  const handleDeleteComment = async (e) => {
    e.preventDefault();
    await deleteComment(comment.id);
    onClose();
    window.location.reload();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>
          Please confirm if you wish to
          <br />
          delete the comment
        </h2>
        <p>
          Are you sure you want to delete the comment?
          <br />
          Once deleted, it cannot be recovered.
        </p>
        <div className={styles.modalButtons}>
          <button
            className={`${styles.cancelBtn} ibm-plex-sans-semibold`}
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`${styles.deleteBtn} ibm-plex-sans-semibold`}
            onClick={handleDeleteComment}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCommentModal;
