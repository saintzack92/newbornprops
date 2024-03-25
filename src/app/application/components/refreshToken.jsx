import { useEffect } from "react";
import axios from "axios";

export async function refreshToken(){
    useEffect(() => {
        const refreshToken = async () => {
          try {
            const res = await axios.post(
              `http://localhost:3000/auth/refresh`,
              {}, // empty body if not needed
              {
                headers: { "Content-Type": "application/json" },
                withCredentials: true, // This is crucial
              }
            );
            if (res.status === 201) {
    
              const userDetails = {
                user: res.data.user,
                role: res.data.role,
                email: res.data.email,
              };
    
              // Store user details in local storage
              localStorage.setItem("userDetails", JSON.stringify(userDetails));
              router.push("/adminpanel/dashboard");
            }
    
            // Handle response if needed
          } catch (error) {
            console.error("Refresh token error:", error);
            // Handle error if needed
          }
        };
    
        refreshToken(); // Call refreshToken function
    
        // Since you are using an empty dependency array, this effect will only run once
      });
}