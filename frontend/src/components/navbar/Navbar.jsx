"use client";

import Link from "next/link";
import styles from "./navbar.module.css";
import Links from "@/components/sidebar/links/Links";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Link href="/" className="logo castoro-regular-italic">
        a Board
      </Link>
      <button className={`${styles.signin} ibm-plex-sans-semibold`}>
        Sign In
      </button>
      <button
        className={styles.menuBtn}
        onClick={() => setOpen((prev) => !prev)}
      >
        Menu
      </button>
      <div className={styles.mobileLink}>
        {open && <Links className={styles.mobileLinks} />}
      </div>
    </div>
  );
};

export default Navbar;
