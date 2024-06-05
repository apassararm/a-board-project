"use client";

import React from "react";
import styles from "./menu.module.css";
import { useRouter, usePathname } from "next/navigation";

const Menu = ({ user, isMobile, onClose }) => {
  if (!isMobile) return null;

  const router = useRouter()
  const pathName = usePathname();


  const handleSignIn = () => {
    router.push("/signin")
  };

  const handleSignOut = () => {
    sessionStorage.removeItem("loggedInUser")
    window.location.reload()
  };

  return (
    <div className={styles.mobileMenuContainer}>
      <div className={`${styles.menuContent} ${isMobile ? styles.open : ""}`}>
        <svg
          className={styles.menuBack}
          onClick={onClose}
          width="83"
          height="25"
          viewBox="0 0 83 25"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.1064 12.488L49.1064 12.488M49.1064 12.488L43.1064 6.48804M49.1064 12.488L43.1064 18.488"
            stroke="#D8E9E4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <a
          href="/"
          className={`${styles.menuItem} ${pathName === "/" && styles.active}`}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.10645 17.488H16.1064M11.1241 3.25204L4.34184 8.52716C3.88847 8.87978 3.66178 9.05609 3.49847 9.27689C3.35381 9.47248 3.24605 9.69282 3.18047 9.92709C3.10645 10.1916 3.10645 10.4787 3.10645 11.0531V18.288C3.10645 19.4081 3.10645 19.9682 3.32443 20.396C3.51618 20.7723 3.82214 21.0783 4.19846 21.27C4.62629 21.488 5.18634 21.488 6.30645 21.488H17.9064C19.0266 21.488 19.5866 21.488 20.0144 21.27C20.3908 21.0783 20.6967 20.7723 20.8885 20.396C21.1064 19.9682 21.1064 19.4081 21.1064 18.288V11.0531C21.1064 10.4787 21.1064 10.1916 21.0324 9.92709C20.9668 9.69282 20.8591 9.47248 20.7144 9.27689C20.5511 9.05609 20.3244 8.87978 19.8711 8.52716L13.0888 3.25204C12.7374 2.97878 12.5618 2.84216 12.3678 2.78964C12.1966 2.7433 12.0162 2.7433 11.8451 2.78964C11.6511 2.84216 11.4755 2.97878 11.1241 3.25204Z"
              stroke="#D8E9E4"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Home
        </a>
        <a
          href="/our-blog"
          className={`${styles.menuItem} ${
            pathName === "/our-blog" && styles.active
          }`}
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.1064 4.48802H6.90645C5.22629 4.48802 4.38621 4.48802 3.74447 4.815C3.17999 5.10262 2.72105 5.56156 2.43343 6.12605C2.10645 6.76778 2.10645 7.60786 2.10645 9.28802V17.688C2.10645 19.3682 2.10645 20.2083 2.43343 20.85C2.72105 21.4145 3.17999 21.8734 3.74447 22.161C4.38621 22.488 5.22629 22.488 6.90645 22.488H15.3064C16.9866 22.488 17.8267 22.488 18.4684 22.161C19.0329 21.8734 19.4918 21.4145 19.7795 20.85C20.1064 20.2083 20.1064 19.3682 20.1064 17.688V13.488M8.10642 16.488H9.78096C10.2701 16.488 10.5147 16.488 10.7449 16.4328C10.949 16.3838 11.1441 16.303 11.323 16.1933C11.5248 16.0696 11.6978 15.8967 12.0437 15.5508L21.6064 5.98802C22.4349 5.15959 22.4349 3.81645 21.6064 2.98802C20.778 2.15959 19.4349 2.15959 18.6064 2.98802L9.04368 12.5508C8.69778 12.8967 8.52482 13.0696 8.40114 13.2715C8.29148 13.4504 8.21067 13.6455 8.16168 13.8496C8.10642 14.0797 8.10642 14.3243 8.10642 14.8135V16.488Z"
              stroke="#BBC2C0"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Our Blog
        </a>
        {!user && (
          <button
            className={`${styles.signin} ibm-plex-sans-semibold`}
            onClick={handleSignIn}
          >
            Sign In
          </button>
        )}
        {user && (
          <button
            className={`${styles.signout} ibm-plex-sans-semibold`}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        )}
      </div>
    </div>
  );
};

export default Menu;
