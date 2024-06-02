"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import userAvatar from "../../public/user01.png";
import Modal from "@/components/modal/Modal";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Community");
  const dropdownRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.divSearch}>
        <div className={styles.searchContainer}>
          <input
            type="text"
            className={`${styles.searchInput} ibm-plex-sans-regular`}
            placeholder="Search"
          />
          <button className={styles.searchBtn}>
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.7612 17.8198L14.1362 14.1948M16.0946 9.48649C16.0946 13.1684 13.1098 16.1532 9.4279 16.1532C5.746 16.1532 2.76123 13.1684 2.76123 9.48649C2.76123 5.80459 5.746 2.81982 9.4279 2.81982C13.1098 2.81982 16.0946 5.80459 16.0946 9.48649Z"
                stroke="#5B5B5B"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
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
                  stroke="#191919"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </button>
          {isOpen && (
            <ul className={styles.selectDropdown}>
              {[
                "Community",
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
        <div className={styles.btnContainer}>
          <button className={`${styles.createBtn} ibm-plex-sans-semibold`}
            onClick={handleOpenModal}
          >
            Create +
          </button>
          <Modal isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
      </div>
      <div className={styles.blogContainer}>
        <div className={styles.blogCard}>
          <div className={styles.blogUser}>
            <Image src={userAvatar} alt="" />
            <label className="inter-medium">Wittawat</label>
          </div>
          <div className={styles.blogTag}>
            <label className="ibm-plex-sans-regular">History</label>
          </div>
          <div className={styles.blogDetail}>
            <h1 className="inter-semibold">
              The Beginning of the End of the World
            </h1>
            <p className="inter-regular">
              The afterlife sitcom The Good Place comes to its culmination, the
              show's two protagonists, Eleanor and Chidi, contemplate their
              future. Having lived thousands upon thousands of lifetimes
              together, and having experienced virtually everything this life
              has to offer, they are weary. It is time for it all to end. The
              show’s solution to this perpetual happiness-cum-weariness is
              extinction. When you have had enough, when you are utterly sated
              by love and joy and pleasure, you can walk through a passage to
              nothingness. And Chidi has had enough.
            </p>
          </div>
          <div className={styles.blogComment}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2612 8.83301C14.2612 12.1467 11.5749 14.833 8.26123 14.833C7.46313 14.833 6.70143 14.6772 6.00489 14.3943C5.87158 14.3402 5.80493 14.3131 5.75104 14.301C5.69834 14.2892 5.65933 14.2849 5.60532 14.2849C5.5501 14.2849 5.48995 14.2949 5.36966 14.3149L2.99774 14.7103C2.74935 14.7517 2.62516 14.7724 2.53535 14.7338C2.45675 14.7001 2.39412 14.6375 2.3604 14.5589C2.32189 14.4691 2.34258 14.3449 2.38398 14.0965L2.7793 11.7246C2.79935 11.6043 2.80938 11.5441 2.80937 11.4889C2.80936 11.4349 2.80504 11.3959 2.79323 11.3432C2.78115 11.2893 2.75408 11.2227 2.69994 11.0893C2.41705 10.3928 2.26123 9.6311 2.26123 8.83301C2.26123 5.5193 4.94752 2.83301 8.26123 2.83301C11.5749 2.83301 14.2612 5.5193 14.2612 8.83301Z"
                stroke="#939494"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <label className="inter-regular">32 Comments</label>
          </div>
        </div>
        <div className={styles.blogCard}>
          <div className={styles.blogUser}>
            <Image src={userAvatar} alt="" />
            <label className="inter-medium">Wittawat</label>
          </div>
          <div className={styles.blogTag}>
            <label className="ibm-plex-sans-regular">History</label>
          </div>
          <div className={styles.blogDetail}>
            <h1 className="inter-semibold">
              The Beginning of the End of the World
            </h1>
            <p className="inter-regular">
              The afterlife sitcom The Good Place comes to its culmination, the
              show's two protagonists, Eleanor and Chidi, contemplate their
              future. Having lived thousands upon thousands of lifetimes
              together, and having experienced virtually everything this life
              has to offer, they are weary. It is time for it all to end. The
              show’s solution to this perpetual happiness-cum-weariness is
              extinction. When you have had enough, when you are utterly sated
              by love and joy and pleasure, you can walk through a passage to
              nothingness. And Chidi has had enough.
            </p>
          </div>
          <div className={styles.blogComment}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2612 8.83301C14.2612 12.1467 11.5749 14.833 8.26123 14.833C7.46313 14.833 6.70143 14.6772 6.00489 14.3943C5.87158 14.3402 5.80493 14.3131 5.75104 14.301C5.69834 14.2892 5.65933 14.2849 5.60532 14.2849C5.5501 14.2849 5.48995 14.2949 5.36966 14.3149L2.99774 14.7103C2.74935 14.7517 2.62516 14.7724 2.53535 14.7338C2.45675 14.7001 2.39412 14.6375 2.3604 14.5589C2.32189 14.4691 2.34258 14.3449 2.38398 14.0965L2.7793 11.7246C2.79935 11.6043 2.80938 11.5441 2.80937 11.4889C2.80936 11.4349 2.80504 11.3959 2.79323 11.3432C2.78115 11.2893 2.75408 11.2227 2.69994 11.0893C2.41705 10.3928 2.26123 9.6311 2.26123 8.83301C2.26123 5.5193 4.94752 2.83301 8.26123 2.83301C11.5749 2.83301 14.2612 5.5193 14.2612 8.83301Z"
                stroke="#939494"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <label className="inter-regular">32 Comments</label>
          </div>
        </div>
        <div className={styles.blogCard}>
          <div className={styles.blogUser}>
            <Image src={userAvatar} alt="" />
            <label className="inter-medium">Wittawat</label>
          </div>
          <div className={styles.blogTag}>
            <label className="ibm-plex-sans-regular">History</label>
          </div>
          <div className={styles.blogDetail}>
            <h1 className="inter-semibold">
              The Beginning of the End of the World
            </h1>
            <p className="inter-regular">
              The afterlife sitcom The Good Place comes to its culmination, the
              show's two protagonists, Eleanor and Chidi, contemplate their
              future. Having lived thousands upon thousands of lifetimes
              together, and having experienced virtually everything this life
              has to offer, they are weary. It is time for it all to end. The
              show’s solution to this perpetual happiness-cum-weariness is
              extinction. When you have had enough, when you are utterly sated
              by love and joy and pleasure, you can walk through a passage to
              nothingness. And Chidi has had enough.
            </p>
          </div>
          <div className={styles.blogComment}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2612 8.83301C14.2612 12.1467 11.5749 14.833 8.26123 14.833C7.46313 14.833 6.70143 14.6772 6.00489 14.3943C5.87158 14.3402 5.80493 14.3131 5.75104 14.301C5.69834 14.2892 5.65933 14.2849 5.60532 14.2849C5.5501 14.2849 5.48995 14.2949 5.36966 14.3149L2.99774 14.7103C2.74935 14.7517 2.62516 14.7724 2.53535 14.7338C2.45675 14.7001 2.39412 14.6375 2.3604 14.5589C2.32189 14.4691 2.34258 14.3449 2.38398 14.0965L2.7793 11.7246C2.79935 11.6043 2.80938 11.5441 2.80937 11.4889C2.80936 11.4349 2.80504 11.3959 2.79323 11.3432C2.78115 11.2893 2.75408 11.2227 2.69994 11.0893C2.41705 10.3928 2.26123 9.6311 2.26123 8.83301C2.26123 5.5193 4.94752 2.83301 8.26123 2.83301C11.5749 2.83301 14.2612 5.5193 14.2612 8.83301Z"
                stroke="#939494"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <label className="inter-regular">32 Comments</label>
          </div>
        </div>
        <div className={styles.blogCard}>
          <div className={styles.blogUser}>
            <Image src={userAvatar} alt="" />
            <label className="inter-medium">Wittawat</label>
          </div>
          <div className={styles.blogTag}>
            <label className="ibm-plex-sans-regular">History</label>
          </div>
          <div className={styles.blogDetail}>
            <h1 className="inter-semibold">
              The Beginning of the End of the World
            </h1>
            <p className="inter-regular">
              The afterlife sitcom The Good Place comes to its culmination, the
              show's two protagonists, Eleanor and Chidi, contemplate their
              future. Having lived thousands upon thousands of lifetimes
              together, and having experienced virtually everything this life
              has to offer, they are weary. It is time for it all to end. The
              show’s solution to this perpetual happiness-cum-weariness is
              extinction. When you have had enough, when you are utterly sated
              by love and joy and pleasure, you can walk through a passage to
              nothingness. And Chidi has had enough.
            </p>
          </div>
          <div className={styles.blogComment}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2612 8.83301C14.2612 12.1467 11.5749 14.833 8.26123 14.833C7.46313 14.833 6.70143 14.6772 6.00489 14.3943C5.87158 14.3402 5.80493 14.3131 5.75104 14.301C5.69834 14.2892 5.65933 14.2849 5.60532 14.2849C5.5501 14.2849 5.48995 14.2949 5.36966 14.3149L2.99774 14.7103C2.74935 14.7517 2.62516 14.7724 2.53535 14.7338C2.45675 14.7001 2.39412 14.6375 2.3604 14.5589C2.32189 14.4691 2.34258 14.3449 2.38398 14.0965L2.7793 11.7246C2.79935 11.6043 2.80938 11.5441 2.80937 11.4889C2.80936 11.4349 2.80504 11.3959 2.79323 11.3432C2.78115 11.2893 2.75408 11.2227 2.69994 11.0893C2.41705 10.3928 2.26123 9.6311 2.26123 8.83301C2.26123 5.5193 4.94752 2.83301 8.26123 2.83301C11.5749 2.83301 14.2612 5.5193 14.2612 8.83301Z"
                stroke="#939494"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <label className="inter-regular">32 Comments</label>
          </div>
        </div>
        <div className={styles.blogCard}>
          <div className={styles.blogUser}>
            <Image src={userAvatar} alt="" />
            <label className="inter-medium">Wittawat</label>
          </div>
          <div className={styles.blogTag}>
            <label className="ibm-plex-sans-regular">History</label>
          </div>
          <div className={styles.blogDetail}>
            <h1 className="inter-semibold">
              The Beginning of the End of the World
            </h1>
            <p className="inter-regular">
              The afterlife sitcom The Good Place comes to its culmination, the
              show's two protagonists, Eleanor and Chidi, contemplate their
              future. Having lived thousands upon thousands of lifetimes
              together, and having experienced virtually everything this life
              has to offer, they are weary. It is time for it all to end. The
              show’s solution to this perpetual happiness-cum-weariness is
              extinction. When you have had enough, when you are utterly sated
              by love and joy and pleasure, you can walk through a passage to
              nothingness. And Chidi has had enough.
            </p>
          </div>
          <div className={styles.blogComment}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2612 8.83301C14.2612 12.1467 11.5749 14.833 8.26123 14.833C7.46313 14.833 6.70143 14.6772 6.00489 14.3943C5.87158 14.3402 5.80493 14.3131 5.75104 14.301C5.69834 14.2892 5.65933 14.2849 5.60532 14.2849C5.5501 14.2849 5.48995 14.2949 5.36966 14.3149L2.99774 14.7103C2.74935 14.7517 2.62516 14.7724 2.53535 14.7338C2.45675 14.7001 2.39412 14.6375 2.3604 14.5589C2.32189 14.4691 2.34258 14.3449 2.38398 14.0965L2.7793 11.7246C2.79935 11.6043 2.80938 11.5441 2.80937 11.4889C2.80936 11.4349 2.80504 11.3959 2.79323 11.3432C2.78115 11.2893 2.75408 11.2227 2.69994 11.0893C2.41705 10.3928 2.26123 9.6311 2.26123 8.83301C2.26123 5.5193 4.94752 2.83301 8.26123 2.83301C11.5749 2.83301 14.2612 5.5193 14.2612 8.83301Z"
                stroke="#939494"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <label className="inter-regular">32 Comments</label>
          </div>
        </div>
        <div className={styles.blogCard}>
          <div className={styles.blogUser}>
            <Image src={userAvatar} alt="" />
            <label className="inter-medium">Wittawat</label>
          </div>
          <div className={styles.blogTag}>
            <label className="ibm-plex-sans-regular">History</label>
          </div>
          <div className={styles.blogDetail}>
            <h1 className="inter-semibold">
              The Beginning of the End of the World
            </h1>
            <p className="inter-regular">
              The afterlife sitcom The Good Place comes to its culmination, the
              show's two protagonists, Eleanor and Chidi, contemplate their
              future. Having lived thousands upon thousands of lifetimes
              together, and having experienced virtually everything this life
              has to offer, they are weary. It is time for it all to end. The
              show’s solution to this perpetual happiness-cum-weariness is
              extinction. When you have had enough, when you are utterly sated
              by love and joy and pleasure, you can walk through a passage to
              nothingness. And Chidi has had enough.
            </p>
          </div>
          <div className={styles.blogComment}>
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.2612 8.83301C14.2612 12.1467 11.5749 14.833 8.26123 14.833C7.46313 14.833 6.70143 14.6772 6.00489 14.3943C5.87158 14.3402 5.80493 14.3131 5.75104 14.301C5.69834 14.2892 5.65933 14.2849 5.60532 14.2849C5.5501 14.2849 5.48995 14.2949 5.36966 14.3149L2.99774 14.7103C2.74935 14.7517 2.62516 14.7724 2.53535 14.7338C2.45675 14.7001 2.39412 14.6375 2.3604 14.5589C2.32189 14.4691 2.34258 14.3449 2.38398 14.0965L2.7793 11.7246C2.79935 11.6043 2.80938 11.5441 2.80937 11.4889C2.80936 11.4349 2.80504 11.3959 2.79323 11.3432C2.78115 11.2893 2.75408 11.2227 2.69994 11.0893C2.41705 10.3928 2.26123 9.6311 2.26123 8.83301C2.26123 5.5193 4.94752 2.83301 8.26123 2.83301C11.5749 2.83301 14.2612 5.5193 14.2612 8.83301Z"
                stroke="#939494"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <label className="inter-regular">32 Comments</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
