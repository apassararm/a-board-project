"use client";

import React from "react";
import styles from "./signOutModal.module.css";

const SignOutModal = ({ isShow, onClose, onClickSignIn }) => {
  if (!isShow) return null;


  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>You have been signed out 
          <br/>due to inactivity.
        </h2>
        <p>Do you want to stay on this page?</p>
        <div className={styles.modalButtons}>
          <button className={`${styles.cancelBtn} ibm-plex-sans-semibold`} onClick={onClose}>Stay</button>
          <button className={`${styles.deleteBtn} ibm-plex-sans-semibold`} onClick={onClickSignIn}>Sign In</button>
        </div>
      </div>
    </div>
  );
};

export default SignOutModal;
