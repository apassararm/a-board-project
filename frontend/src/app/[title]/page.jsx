"use client";

import React, { useState, useEffect } from "react";
import styles from "./blog.module.css";
import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import Image from "next/image";
import userAvatar from "../../../public/user01.png";
import { usePathname } from "next/navigation";
import { getBlogById } from "../../app/services/blogService";
import { createComment, getCommentByBlogId } from "../services/commentService";
import { useRouter } from "next/navigation";
import SignOutModal from "@/components/modal/signOutModal/SignOutModal";
import DeleteCommentModal from "@/components/modal/deleteCommentModal/DeleteCommentModal";
import EditCommentModal from "@/components/modal/editCommentModal/EditCommentModal";

const Blog = () => {
  const [user, setUser] = useState(null);
  const [isModalShow, setModalShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [blogId, setBlogId] = useState("");
  const [blog, setBlog] = useState([]);
  const [comment, setComment] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isDeleteModalShow, setDeleteModalShow] = useState(false);
  const [currentComment, setCurrentComment] = useState(null);

  const pathname = usePathname();
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

  const handleGoToHome = () => {
    router.push("/");
  };

  useEffect(() => {
    if (pathname) {
      const blogid = pathname.substring(1);
      setBlogId(blogid);
    }
  }, [pathname]);


  useEffect(() => {
    const fetchBlog = async () => {
      if (blogId) {
        const fetchedBlog = await getBlogById(blogId);
        setBlog(fetchedBlog);
      }
    };
    fetchBlog();
  }, [blogId]);

  useEffect(() => {
    const fetchComment = async () => {
      if (blogId) {
        const fetchedComment = await getCommentByBlogId(blogId);
        const sortedComment = fetchedComment.sort((a, b) => {
          return new Date(b.createdDate) - new Date(a.createdDate);
        });
        setComment(sortedComment);
      }
    };
    fetchComment();
  }, [blogId]);

  const handleCloseSignOutModal = () => {
    setUser(null);
    setModalShow(false);
    window.location.reload();
  };

  const getTimeDifference = (createdDate) => {
    const currentDate = new Date();
    const date = new Date(createdDate);
    const diffTime = Math.abs(currentDate - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffYears > 0) {
      return `${diffYears} ${diffYears === 1 ? "year" : "years"} ago`;
    } else if (diffMonths > 0) {
      return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
    } else if (diffWeeks > 0) {
      return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`;
    } else if (diffDays > 0) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    } else {
      const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
      if (diffHours > 0) {
        return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
      }
      const diffMinutes = Math.floor(diffTime / (1000 * 60));
      return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`;
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      await createComment({ blogId, comment: commentText, username: user });
      window.location.reload();
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  const handleClickAdd = () => {
    if (!user) {
      router.push("/signin");
    } else {
      setIsOpen(true);
    }
  };

  const handleCancle = () => {
    setIsOpen(false);
    setCommentText("");
  };

  const handleOpenEditModal = (comment_) => {
    if (!user) {
      router.push("/signin");
    } else {
      setCurrentComment(comment_);
      setEditModalOpen(true);
    }
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
    setCurrentComment(null);
  };

  const handleOpenDeleteModal = (comment_) => {
    if (!user) {
      router.push("/signin");
    } else {
      setCurrentComment(comment_);
      setDeleteModalShow(true);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteModalShow(false);
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
          <div className={styles.backContainer}>
            <div className={styles.backBtn}>
              <svg
                onClick={handleGoToHome}
                width="25"
                height="25"
                viewBox="0 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.3398 12.4067H5.33984M5.33984 12.4067L12.3398 19.4067M5.33984 12.4067L12.3398 5.40674"
                  stroke="#243831"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className={styles.blogContainer}>
            {blog && (
              <div className={styles.blogContent}>
                <div className={styles.blogUser}>
                  <Image src={userAvatar} alt="" />
                  <label className={`${styles.userName} inter-medium`}>
                    {blog.username}
                  </label>
                  <label className={`${styles.createdDate} inter-regular`}>
                    {getTimeDifference(blog.createdDate)}
                  </label>
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
                    {comment ? `${comment.length} Comments` : "0 Comments"}
                  </label>
                </div>
                {!isOpen && (
                  <button
                    className={`${styles.commentBtn} ibm-plex-sans-semibold`}
                    onClick={handleClickAdd}
                  >
                    Add Comments
                  </button>
                )}
                {isOpen && (
                  <div className={styles.commentContainer}>
                    <textarea
                      id="newComment"
                      className={`${styles.textArea} ibm-plex-sans-regular`}
                      placeholder="What's on your mind..."
                      onChange={(e) => setCommentText(e.target.value)}
                      value={commentText}
                    ></textarea>
                    <div className={styles.commentBtnContainer}>
                      <button
                        className={`${styles.cancelBtn} ibm-plex-sans-semibold`}
                        onClick={handleCancle}
                      >
                        Cancel
                      </button>
                      <button
                        className={`${styles.postBtn} ibm-plex-sans-semibold`}
                        onClick={handleAddComment}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
            <EditCommentModal
              isEditOpen={isEditModalOpen}
              onClose={handleCloseEditModal}
              comment={currentComment}
            />
            <DeleteCommentModal
              isDeleteOpen={isDeleteModalShow}
              onClose={handleCloseDeleteModal}
              comment={currentComment}
            />
            <div className={styles.commentSection}>
              {comment &&
                comment.map((comment_) => (
                  <div key={comment_.id} className={styles.commentDetail}>
                    <div className={styles.blogUser}>
                      <Image src={userAvatar} alt="" />
                      <label className={`${styles.userName} inter-medium`}>
                        {comment_.username}
                      </label>
                      <label className={`${styles.createdDate} inter-regular`}>
                        {getTimeDifference(comment_.createdDate)}
                      </label>
                    </div>
                    <p className="inter-regular">{comment_.comment}</p>
                    {user && user === comment_.username && (
                      <div className={styles.commentAction}>
                        <svg
                          onClick={() => handleOpenEditModal(comment_)}
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
                          key={comment_.id}
                          onClick={() => handleOpenDeleteModal(comment_)}
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
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
