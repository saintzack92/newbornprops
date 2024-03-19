export const setToken = (token) => {
    localStorage.setItem('token', token);
  };
  
  export const getToken = () => {
    return localStorage.getItem('token');
  };
  
  export const clearToken = () => {
    localStorage.removeItem('token');
  };
  
  export const isTokenExpired = () => {
    const token = getToken();
    if (!token) {
      return true; // Token doesn't exist or has been removed
    }
    const decodedToken = decodeToken(token); // You need to implement decodeToken function
    if (!decodedToken || decodedToken.exp < Date.now() / 1000) {
      return true; // Token is expired
    }
    return false; // Token is not expired
  };