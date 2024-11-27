// src/routes/UserRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Check authentication and role for user
const checkUserAuth = async (): Promise<boolean> => {
  const token = Cookies.get('auth_token');
  if (!token) return false;

  try {
    const response = await axios.get('http://localhost:3000/api/auth/user-verify', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });
    console.log(response)
    return true; // Check if role is user
  } catch (error) {
    console.error("User authentication failed:", error);
    return false;
  }
};

const UserRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const verifyAuth = async () => {
      console.log("mae chaala")
      const result = await checkUserAuth();
      console.log(result)
      setAuthenticated(result);
      setIsLoading(false);
    };
    verifyAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    // Redirect to login or unauthorized if the user is not a valid user
    return <Navigate to="/" />;
  }

  return <Outlet />; // Allow access to child routes for users
};

export default UserRoutes;
