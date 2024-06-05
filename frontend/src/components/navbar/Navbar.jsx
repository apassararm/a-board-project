"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import Links from "@/components/sidebar/links/Links";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Menu from "../menu/Menu";
import Image from "next/image";
import userAvatar from "../../../public/user01.png";

const Navbar = (user) => {
  const [open, setOpen] = useState(false);
  const [openSignOut, setOpenSignOut] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [users, setUsers] = useState("");

  useEffect(() => {
    if (user.user != null) {
      setUsers(user.user);
    } else {
      setUsers("");
    }
  });

  useEffect(() => {
    const showMobileMenu = () => {
      if (window.innerWidth <= 880) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };

    showMobileMenu();
    window.addEventListener("resize", showMobileMenu);

    return () => {
      window.removeEventListener("resize", showMobileMenu);
    };
  }, []);

  const router = useRouter();

  const handleSignInClick = () => {
    router.push("/signin");
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("loggedInUser");
    window.location.reload();
  };

  const handleCloseMenu = () => {
    setOpen(false);
  };

  return (
    <div className={styles.container}>
      <Menu user={users} isMobile={open} onClose={handleCloseMenu} />
      <Link href="/" className="logo castoro-regular-italic">
        a Board
      </Link>
      {!isMobile &&
        (users ? (
          <>
            <div
              className={styles.blogUser}
              onClick={() => setOpenSignOut((prev) => !prev)}
            >
              <label className="inter-medium">{users}</label>
              <Image src={userAvatar} alt="" />
            </div>
            {openSignOut && (
              <div className={styles.signOutContainer}>
                <button
                  className={`${styles.signout} ibm-plex-sans-semibold`}
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            )}
          </>
        ) : (
          <button
            className={`${styles.signin} ibm-plex-sans-semibold`}
            onClick={handleSignInClick}
          >
            Sign In
          </button>
        ))}
      {isMobile && (
        <svg
          className={styles.menuBtn}
          onClick={() => setOpen(true)}
          width="41"
          height="41"
          viewBox="0 0 41 41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.9658 20.8037H29.9658M11.9658 14.8037H29.9658M11.9658 26.8037H29.9658"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </div>
  );
};

export default Navbar;
