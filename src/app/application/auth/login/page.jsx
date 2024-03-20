"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const style = `p-[30px] border-2 border-solid border-[#2e374a] w-[100%]`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/auth/login`,
        {
          email,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true, // This is crucial
        }
      );
  
      if (res.status === 200 || res.status === 201) {
        const userDetails = {
          user: res.data.user,
          role: res.data.role,
          email: res.data.email,
        };

        // Store user details in local storage
        localStorage.setItem("userDetails", JSON.stringify(userDetails));
        router.push("/adminpanel/dashboard");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };
  
  return (
    <div className="w-[100%] h-[100vh] flex items-center justify-center">
      <form
        // onSubmit={handleLogin}
        className="bg-[var(--bgSoft)] p-[50px] rounded-[10px] w-[500px] h-[500px] flex flex-col justify-center gap-[30px] items-center relative z-0"
      >
        <h1 className="relative z-10 font-[1000] text-[30px] mb-[-30px]">
          Login
        </h1>
        <input
          type="email"
          placeholder="Email"
          required="required"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={style}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required="required"
          onChange={(e) => setPassword(e.target.value)}
          className={style}
        />
        <button type="submit" className={style} onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
