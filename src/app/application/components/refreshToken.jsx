"use client"
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const useAuthCheck = () => {
  const router = useRouter();

  useEffect(() => {
    // Function to check authentication status
    const checkAuthStatus = async () => {
      try {
        const statusResponse = await fetch('http://localhost:3000/auth/status', {
          credentials: 'include',
        });

        if (!statusResponse.ok) throw new Error('Auth status check failed');

        // If auth status is ok, no action needed
      } catch (error) {
        // If auth status check fails, attempt to refresh the token
        try {
          const refreshResponse = await fetch('http://localhost:3000/auth/refresh', {
            method: 'POST',
            credentials: 'include',
          });

          if (!refreshResponse.ok) throw new Error('Token refresh failed');
          
          // Handle successful token refresh if needed
        } catch (refreshError) {
          // If token refresh fails, clear cookies and redirect to login
          // Note: Actual cookie clearing should be done server-side or via a specific endpoint that clears cookies
          console.error('Token refresh failed, redirecting to login.', refreshError);
          router.push('/login');
        }
      }
    };

    checkAuthStatus();
  }, []);
};

export default useAuthCheck;
