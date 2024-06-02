"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./Modal.module.css";

const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Choose a community");
  const dropdownRef = useRef(null);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Create Post</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.customSelectContainer} ref={dropdownRef}>
            <button className={styles.selectBtn} onClick={handleButtonClick}>
              {selectedOption}{" "}
              <span>
                <svg
                  width="21"
                  height="21"
                  viewBox="0 0 21 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.55762 8.30371L10.5576 13.3037L15.5576 8.30371"
                    stroke="#49A569"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </button>
            {open && (
              <ul className={styles.selectDropdown}>
                {[
                  "Choose a community",
                  "History",
                  "Food",
                  "Pets",
                  "Health",
                  "Fashion",
                  "Exercise",
                  "Others",
                ].map((option) => (
                  <li
                    key={option}
                    className={`${styles.option} ${
                      selectedOption === option ? styles.selected : ""
                    }`}
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input className={styles.input} type="text" placeholder="Title" />
          <textarea
            className={styles.textarea}
            placeholder="What's on your mind..."
          ></textarea>
        </div>
        <div className={styles.footer}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button className={styles.postButton}>Post</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
