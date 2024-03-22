"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import fotoLogin from "../../../../../public/assets/img/login-office.jpeg"
import Image from 'next/image'
import Input from "@/app/adminpanel/ui/dashboard/input/input";
const style = `p-[30px] border-2 border-solid border-[#2e374a] w-[100%]`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
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
        console.log("Before navigating to dashboard");
        router.push("/adminpanel/dashboard");
        console.log("After navigating to dashboard");
        setLoading(false);
        
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="w-[100%] h-[100vh] flex items-center justify-center">
    //   <form
    //     onSubmit={handleLogin}
    //     className="bg-[var(--bgSoft)] p-[50px] rounded-[10px] w-[500px] h-[500px] flex flex-col justify-center gap-[30px] items-center relative z-0"
    //   >
    //     <h1 className="relative z-10 font-[1000] text-[30px] mb-[-30px]">
    //       Login
    //     </h1>
    //     <input
    //       type="email"
    //       placeholder="Email"
    //       required="required"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //       className={style}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       required="required"
    //       onChange={(e) => setPassword(e.target.value)}
    //       className={style}
    //     />
    //     <button type="submit" className={style}>
    //       Login
    //     </button>
    //   </form>
    // </div>

    <div className="flex items-center min-h-screen p-6 bg-gray-50 ">
      <div
        className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl "
      >
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <Image
              aria-hidden="true"
              className="object-cover w-full h-full "
              src={fotoLogin}
              alt="Office"
            />
          </div>
          <div className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <div className="w-full">
              <h1
                className="mb-4 text-xl font-semibold text-gray-700 text-center "
              >
                SKALA DATA <br />
                LOGIN
              </h1>
              <form
                onSubmit={handleLogin}
              >
                <label class="block text-sm">
                  <span class="text-gray-700" >Email</span>
                  <input
                    className={`block w-full mt-2 text-sm   form-input focus:border-purple-400 focus:shadow-outline-purple`}
                    type="email"
                    placeholder="Email"
                    required="required"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label class="block text-sm mt-3">
                  <span class="text-gray-700" >Password</span>
                  <input
                    className={`block w-full mt-2 text-sm   form-input focus:border-purple-400 focus:shadow-outline-purple`}
                    type="password"
                    placeholder="********"
                    required="required"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>

                <button
                  className={`w-full px-4 py-2 mt-4  font-medium inline-flex items-center justify-center text-white transition-colors duration-150 bg-purple-600 border border-transparent rounded-lg active:bg-purple-600 hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  type="submit"
                  disabled={loading}
                >


                  {/* {loading ? `<span className="ml-3">Loading... </span>` : `Login`} */}
                  {loading ? (
                    <>
                    <svg aria-hidden="true" className="w-6 h-6 text-white animate-spin  fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="ml-3">Loading... </span>
                    </>) : (`Login`)}
                </button>



              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
