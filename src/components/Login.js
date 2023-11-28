"use client";
import React, { useState } from 'react';
import styles from '../styles/style.module.css';
import Link from 'next/link'; 
import Image from 'next/image';
import { useRouter } from 'next/router'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const formData = new FormData(e.target);
    // const email = formData.get("email");
    // const password = formData.get("password");
    try {
      const res = await fetch("/api/user/verify", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        if (data) {
          console.log("Login successful");
          router.push("http://localhost:3000/protected/dashboard");
        } else {
          alert("Email and password are wrong!");
        }
      } else {
        alert("Email or password are wrong!");
      }
    } catch (e) {
      alert("An error occurred while logging in");
    }
  };
  

  return (
    <div className={styles.container}>
      <div className={styles['page-header']}>
        <div className={styles['header-content']}>
          <Image src="/applogo.png" alt="App Logo" width={100} height={100} className={styles.appLogo} />
          <div className={styles.heading1}>Progress</div>
        </div>
      </div>
      <div className={styles['gray-line']}></div>
      <div className={styles['red-quarter-circle']}></div>

      <form onSubmit={handleSubmit} className={styles.container}>
        <div className={styles.heading}>Login</div>
        <div className={styles['input-container']}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            className={styles.input}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles['input-line']}></div>
        </div>
        <div className={styles['input-container']}>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            className={styles.input}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={styles['input-line']}></div>
        </div>
        <button
          type="submit"
          className={styles['signup-button']}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
>
          Login
        </button>

      </form>

      <div className={styles['have-account']}>
        Don't have an account?{' '}
        <Link href="/createaccount">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;
