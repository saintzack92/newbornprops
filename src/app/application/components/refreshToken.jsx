import { useEffect, useHistory } from "react";
import axios from "axios";

export function RefreshToken() {
  const history = useHistory();

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const res = await axios.post(
          `http://localhost:3000/auth/refresh`,
          {},
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        if (res.status === 201) {
          const userDetails = {
            user: res.data.user,
            role: res.data.role,
            email: res.data.email,
          };

          localStorage.setItem("userDetails", JSON.stringify(userDetails));
          history.push("/adminpanel/dashboard");
        }
      } catch (error) {
        console.error("Refresh token error:", error);
        // Handle error if needed
      }
    };

    refreshToken();
  }, []); // Empty dependency array to run the effect only once

  return null; // You can return null or any other component since this component doesn't render anything
}
