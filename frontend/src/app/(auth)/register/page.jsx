"use client";

import styles from "./register.module.css";
import React, { useState, useEffect } from "react";
import { createUser, getAllUsers } from "@/app/services/userService";
import { useRouter } from "next/navigation";
import mainImg from "./../../../../public/main-img.png";
import Image from "next/image";
import Link from "next/link";

const Register = () => {
  const [user, setUser] = useState("");
  const [allUser, setAllUser] = useState([]);
  const [warning, setWarning] = useState(false);
  const [validate, setValidate] = useState(false);
  const [checkLength, setCheckLength] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers();
      setAllUser(users);
    };
    fetchData();
  }, []);

  const handleRegister = async () => {
    if (user && user != "") {
      setValidate(false);
      const userExists = allUser.some((allUser) => allUser.username === user);
      if (!userExists) {
        if (user.length < 5) {
          setCheckLength(true)
        } else {
          setCheckLength(false)
          await createUser({ username: user });
          setWarning(false);
          router.push("/signin");
        }
      } else {
        setWarning(true)
        setCheckLength(false)
      }
    } else {
      setValidate(true)
      setWarning(false)
      setCheckLength(false)
    }
  };

  return (
    <div className={styles.container}>
      <title>a Board | Register</title>
      <div className={styles.formContainer}>
        <div className={styles.signInForm}>
          <h1 className="inter-semibold">Register</h1>
          <input
            type="text"
            placeholder="Username"
            className={`${styles.input} ibm-plex-sans-regular`}
            onChange={(e) => setUser(e.target.value)}
            value={user}
          />
          {validate && (
            <h2 className={styles.warning}>Username can't be blank.</h2>
          )}
          {warning && (
            <h2 className={styles.warning}>
              Username already exists. Please choose a different username.
            </h2>
          )}
          {checkLength && (
            <h2 className={styles.warning}>
              Usernames must be at least 5 characters long.
            </h2>
          )}
          <button
            className={`${styles.registerButton} ibm-plex-sans-semibold`}
            onClick={() => handleRegister()}
          >
            Register
          </button>
          <div className={styles.showText}>
            <label className="inter-regular">Already have an account?</label>
            <Link className="inter-semibold" href="/signin">Sign in</Link>
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

export default Register;
