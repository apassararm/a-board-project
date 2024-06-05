"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./editModal.module.css";
import { updateBlog } from "@/app/services/blogService";
import { useRouter } from "next/navigation";

const EditModal = ({ isEditOpen, onClose, blog }) => {
  if (!isEditOpen) return null;

  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Choose a community");
  const [user, setUser] = useState('user1');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

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
    if (blog) {
      setTitle(blog.title);
      setDescription(blog.description);
      setSelectedOption(blog.tag)
    }
  }, [blog]);


  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);



  const handleButtonClick = () => {
    setOpen(!open);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOpen(false)
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setOpen(false);
    }
  };


  const handleUpdateBlog = async (e) => {
    e.preventDefault();
    try {
      if(title == '' || description == '' || selectedOption == 'Choose a community') {
        alert('กรุณากรอกข้อมูลให้ครบ')
      }
      else {
        await updateBlog(blog.id, {title, description, tag: selectedOption});
        onClose()
        window.location.reload()
      }
    } catch (error) {
      console.error('Error update blog:', error);
    }
  };



  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2>Edit Post</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <div className={styles.content}>
          <div className={styles.customSelectContainer} ref={dropdownRef}>
            <button className={`${styles.selectBtn} ibm-plex-sans-semibold`} onClick={handleButtonClick}>
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
          <input 
            className={`${styles.input} ibm-plex-sans-regular`}
            type="text" 
            placeholder="Title" 
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            className={`${styles.textarea} ibm-plex-sans-regular`}
            placeholder="What's on your mind..."
            onChange={(e) => setDescription(e.target.value)}
            value={description}
          ></textarea>
        </div>
        <div className={styles.footer}>
          <button className={`${styles.cancelButton} ibm-plex-sans-semibold`} onClick={onClose}>
            Cancel
          </button>
          <button className={`${styles.postButton} ibm-plex-sans-semibold`} onClick={handleUpdateBlog} >Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
