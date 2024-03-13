"use client"; // import Input from "../../../adminpanel/ui/dashboard/input/input";
import Input from "@/app/adminpanel/ui/dashboard/input/input";

import React, { useState } from "react";
import axios from "axios";

const style = `p-[30px] border-2 border-solid border-[#2e374a] w-[100%]`;

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = {
        username: username,
        password: password,
      };

      const res = await axios.post(
        "http://localhost:3000/auth/login", // Assuming your login API endpoint is '/api/login'
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(res); // Handle the response accordingly
    } catch (error) {
      console.error("Error:", error);
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
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={style}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
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
