"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./page.module.css";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Image from "next/image";
import userAvatar from "../../public/user01.png";
import CreateModal from "@/components/modal/createModal/CreateModal";
import {
  getAllBlogs,
  searchBlogByTitle,
  getBlogsByTag,
} from "../app/services/blogService";
import { useRouter } from "next/navigation";
import { getCommentByBlogId } from "./services/commentService";
import SignOutModal from "@/components/modal/signOutModal/SignOutModal";
import Loading from "./loading";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Community");
  const dropdownRef = useRef(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalShow, setModalShow] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blogId, setBlogId] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const [buttonText, setButtonText] = useState('Create +');

  const router = useRouter();

  useEffect(() => {
    const userSession = sessionStorage.loggedInUser;

    if (!userSession) {
      setUser(null);
    } else {
      setUser(userSession);
    }

    let signOutTimer = setTimeout(() => {
      sessionStorage.removeItem("loggedInUser");
      setModalShow(true);
      setUser(null);
    }, 5 * 60 * 1000);

    window.addEventListener("mousemove", () => {
      clearTimeout(signOutTimer);
      signOutTimer = setTimeout(() => {
        sessionStorage.removeItem("loggedInUser");
        setModalShow(true);
        setUser(null);
      }, 5 * 60 * 1000);
    });

    return () => {
      clearTimeout(signOutTimer);
    };
  }, []);

  const handleGoToSignin = () => {
    router.push("/signin");
  };

  useEffect(() => {
    const updateButtonText = () => {
      if (window.innerWidth <= 360) {
        setButtonText("+");
      } else {
        setButtonText("Create +");
      }
    };

    updateButtonText();
    window.addEventListener("resize", updateButtonText);

    return () => {
      window.removeEventListener("resize", updateButtonText);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllBlogs();
      const sortedData = data.sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate);
      });
      setBlogs(sortedData);

      if (sortedData) {
        const updatedBlogs = [];
        for (let i in sortedData) {
          const comment = await getCommentByBlogId(sortedData[i].id);
          sortedData[i].comment = comment ? comment.length : 0;
          updatedBlogs.push(sortedData[i]);
        }
        setBlogs(updatedBlogs);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      handleSearch(searchTerm);
    } else {
      const fetchData = async () => {
        const data = await getAllBlogs();
        const sortedData = data.sort((a, b) => {
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
        setBlogs(sortedData);

        if (sortedData) {
          const updatedBlogs = [];
          for (let i in sortedData) {
            const comment = await getCommentByBlogId(sortedData[i].id)
            sortedData[i].comment = comment ? comment.length : 0;
            updatedBlogs.push(sortedData[i]);
          }
          setBlogs(updatedBlogs);
        }
      };
      fetchData();
    }
  }, [searchTerm]);

  const handleSearch = async (term) => {
    const results = await searchBlogByTitle(searchTerm);
    setSearchResults(results);
  };

  useEffect(() => {
    const sortAndSetBlogs = async () => {
      if (searchResults) {
        const sortedData = searchResults.sort((a, b) => {
          return new Date(b.createdDate) - new Date(a.createdDate);
        });

        const updatedBlogs = [];
        for (let i in sortedData) {
          const comment = await getCommentByBlogId(sortedData[i].id);
          sortedData[i].comment = comment ? comment.length : 0;
          updatedBlogs.push(sortedData[i]);
        }
        setBlogs(updatedBlogs);
      }
    };

    sortAndSetBlogs();
  }, [searchResults]);

  useEffect(() => {
    const fetchDataByTag = async (tag) => {
      let data;
      if (tag === "Community") {
        data = await getAllBlogs();
      } else {
        data = await getBlogsByTag(tag);
      }
      
      const sortedData = data.sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate);
      });
      setBlogs(sortedData);

      if (sortedData) {
        const updatedBlogs = [];
        for (let i in sortedData) {
          const comment = await getCommentByBlogId(sortedData[i].id);
          sortedData[i].comment = comment ? comment.length : 0;
          updatedBlogs.push(sortedData[i]);
        }
        setBlogs(updatedBlogs);
      }
    };
    fetchDataByTag(selectedOption);
  }, [selectedOption]);

  const handleOpenModal = () => {

    if (!user) {
      router.push("/signin");
    } else {
      setModalOpen(true);
    }
  };

  const handleCloseSignOutModal = () => {
    setUser(null);
    setModalShow(false);
    window.location.reload()
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

  const handleBlogCardClick = (title, id) => {
    setBlogId(id);
    router.push(`${id}`);
  };

  return (
    <>
      <Navbar user={user} />
      <div className={styles.section}>
        <SignOutModal
          isShow={isModalShow}
          onClose={handleCloseSignOutModal}
          onClickSignIn={handleGoToSignin}
        />
        <Sidebar />
        <div className={styles.container}>
          <div className={styles.divSearch}>
            <div className={styles.searchContainer}>
              <input
                type="text"
                className={`${styles.searchInput} ibm-plex-sans-regular`}
                placeholder="Search"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
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
              <button
                className={`${styles.createBtn} ibm-plex-sans-semibold`}
                onClick={handleOpenModal}
              >
                {buttonText}
              </button>
              <CreateModal isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
          </div>
          <div className={styles.blogContainer}>
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className={styles.blogCard}
                onClick={() => handleBlogCardClick(blog.title, blog.id)}
              >
                <div className={styles.blogUser}>
                  <Image src={userAvatar} alt="" />
                  <label className="inter-medium">{blog.username}</label>
                </div>
                <div className={styles.blogTag}>
                  <label className="ibm-plex-sans-regular">{blog.tag}</label>
                </div>
                <div className={styles.blogDetail}>
                  <h1 className="inter-semibold">{blog.title}</h1>
                  <p className="inter-regular">{blog.description}</p>
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
                  <label className="inter-regular">
                    {blog.comment > 1
                      ? `${blog.comment} Comments`
                      : `${blog.comment} Comment`}
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
