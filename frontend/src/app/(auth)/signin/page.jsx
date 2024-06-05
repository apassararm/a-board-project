"use client";

import styles from "./signin.module.css";
import React, { useState, useEffect } from "react";
import { getAllUsers } from "@/app/services/userService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import mainImg from "./../../../../public/main-img.png";
import Image from "next/image";

const Signin = () => {
  const [user, setUser] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [warning, setWarning] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      setAllUser(users);
    };
    fetchData();
  }, []);

  const handleSignIn = () => {
    const userExists = allUser.some((allUser) => allUser.username === user);
    if (userExists) {
      setWarning(false);
      sessionStorage.setItem("loggedInUser", user);
      let signOutTimer = setTimeout(() => {
        sessionStorage.removeItem("loggedInUser"); 
      }, 5 * 60 * 1000); 

      window.addEventListener("mousemove", () => {
        clearTimeout(signOutTimer);
        signOutTimer = setTimeout(() => {
          sessionStorage.removeItem("loggedInUser");
        }, 5 * 60 * 1000);
      });

      router.push("/");
    } else {
      setWarning(true);
    }
  };

  return (
    <div className={styles.container}>
      <title>a Board | Sign In</title>
      <div className={styles.formContainer}>
        <div className={styles.signInForm}>
          <h1 className="inter-semibold">Sign in</h1>
          <input
            type="text"
            placeholder="Username"
            className={`${styles.input} ibm-plex-sans-regular`}
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          {warning && <h2 className={`${styles.warning} inter-regular`}>User not found.</h2>}
          <button
            className={`${styles.signInButton} ibm-plex-sans-semibold`}
            onClick={() => handleSignIn()}
          >
            Sign In
          </button>
          <div className={styles.showText}>
            <label className="inter-regular">Do not have an account?</label>
            <Link className="inter-semibold" href="/register">Register</Link>
          </div>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <Image src={mainImg} alt="a Board" className={styles.image} />
        <p className="castoro-regular-italic">a Board</p>
      </div>
    </div>
  );
};

export default Signin;
