"use client";

import React, { useState, useEffect, useRef } from "react";
import styles from "./ourblog.module.css";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Image from "next/image";
import userAvatar from "../../../public/user01.png";
import CreateModal from "@/components/modal/createModal/CreateModal";
import EditModal from "@/components/modal/editModal/EditModal";
import DeleteModal from "@/components/modal/deleteModal/DeleteModal";
import SignOutModal from "@/components/modal/signOutModal/SignOutModal";
import {
  searchBlogByUserAndTitle,
  getBlogsByUser,
  getBlogsByUserAndTag,
} from "../../app/services/blogService";
import { getCommentByBlogId } from "../../app/services/commentService";
import { useRouter } from "next/navigation";

const OurBlog = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Community");
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalShow, setDeleteModalShow] = useState(false);
  const [isModalShow, setModalShow] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [blogId, setBlogId] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(null);
  const [currentBlog, setCurrentBlog] = useState(null);
  const [buttonText, setButtonText] = useState('Create +');

  const dropdownRef = useRef(null);
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
      if (user) {
        const data = await getBlogsByUser(user);
        if (data) {
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
        }
      } else {
        setBlogs([]);
      }
    };
    fetchData();
  }, [user]);

  useEffect(() => {
    if (searchTerm.length >= 2) {
      handleSearch(searchTerm);
    } else {
      const fetchData = async () => {
        if (user) {
          const data = await getBlogsByUser(user);
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
        } else {
          setBlogs([]);
        }
      };
      fetchData();
    }
  }, [searchTerm]);

  const handleSearch = async (term) => {
    if (user) {
      const results = await searchBlogByUserAndTitle(user, searchTerm);
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
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
      if (user) {
        let data;
        if (tag === "Community") {
          data = await getBlogsByUser(user);
        } else {
          data = await getBlogsByUserAndTag(user, tag);
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
      } else {
        setBlogs([]);
      }
    };
    fetchDataByTag(selectedOption);
  }, [selectedOption]);

  const handleOpenModal = () => {
    // const userSession = sessionStorage.loggedInUser;

    if (!user) {
      // setUser(null);
      router.push("/signin");
    } else {
      setModalOpen(true);
    }
  };

  const handleOpenEditModal = (blog) => {
    if (!user) {
      router.push("/signin");
    } else {
      setCurrentBlog(blog);
      setEditModalOpen(true);
    }
  };

  const handleCloseSignOutModal = () => {
    setModalShow(false);
    setUser(null);
    window.location.reload();
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentBlog(null);
  };

  const handleOpenDeleteModal = (blog) => {
    if (!user) {
      router.push("/signin");
    } else {
      setCurrentBlog(blog);
      setDeleteModalShow(true);
    }    
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalShow(false);
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
              <EditModal
                isEditOpen={isEditModalOpen}
                onClose={handleCloseEditModal}
                blog={currentBlog}
              />
              <DeleteModal
                isDeleteOpen={isDeleteModalShow}
                onClose={handleCloseDeleteModal}
                blog={currentBlog}
              />
            </div>
          </div>
          <div className={styles.blogContainer}>
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className={styles.blogCard}
                // onClick={() => handleBlogCardClick(blog.title, blog.id)}
              >
                <div className={styles.blogAction}>
                  <svg
                    onClick={() => handleOpenEditModal(blog)}
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.5576 14.0002H14.5576M2.55762 14.0002H3.67398C4.0001 14.0002 4.16316 14.0002 4.31661 13.9633C4.45266 13.9306 4.58272 13.8768 4.70201 13.8037C4.83657 13.7212 4.95187 13.6059 5.18247 13.3753L13.5576 5.00015C14.1099 4.44787 14.1099 3.55244 13.5576 3.00015C13.0053 2.44787 12.1099 2.44787 11.5576 3.00015L3.18246 11.3753C2.95185 11.6059 2.83655 11.7212 2.7541 11.8558C2.68099 11.9751 2.62712 12.1051 2.59446 12.2412C2.55762 12.3946 2.55762 12.5577 2.55762 12.8838V14.0002Z"
                      stroke="#2B5F44"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <svg
                    key={blog.id}
                    onClick={() => handleOpenDeleteModal(blog)}
                    width="17"
                    height="17"
                    viewBox="0 0 17 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_14_17965)">
                      <path
                        d="M11.2243 4.66716V4.13382C11.2243 3.38709 11.2243 3.01372 11.079 2.7285C10.9511 2.47762 10.7472 2.27364 10.4963 2.14581C10.2111 2.00049 9.83769 2.00049 9.09095 2.00049H8.02428C7.27755 2.00049 6.90418 2.00049 6.61896 2.14581C6.36808 2.27364 6.16411 2.47762 6.03628 2.7285C5.89095 3.01372 5.89095 3.38709 5.89095 4.13382V4.66716M7.22428 8.33382V11.6672M9.89095 8.33382V11.6672M2.55762 4.66716H14.5576M13.2243 4.66716V12.1338C13.2243 13.2539 13.2243 13.814 13.0063 14.2418C12.8146 14.6181 12.5086 14.9241 12.1323 15.1158C11.7044 15.3338 11.1444 15.3338 10.0243 15.3338H7.09095C5.97085 15.3338 5.41079 15.3338 4.98297 15.1158C4.60665 14.9241 4.30068 14.6181 4.10894 14.2418C3.89095 13.814 3.89095 13.2539 3.89095 12.1338V4.66716"
                        stroke="#2B5F44"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_14_17965">
                        <rect
                          width="16"
                          height="16"
                          fill="white"
                          transform="translate(0.557617 0.666992)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>

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

export default OurBlog;
