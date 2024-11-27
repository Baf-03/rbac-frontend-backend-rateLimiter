// src/routes/AdminRoutes.tsx
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { useEffect, useState } from 'react';

// Check authentication and role for admin
const checkAdminAuth = async (): Promise<boolean> => {
  const token = Cookies.get('auth_token');
  if (!token) return false;

  try {
    const response = await axios.get('http://localhost:3000/api/auth/admin-verify', {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: true,
    });

    return true; // Check if role is admin
  } catch (error) {
    console.error("Admin authentication failed:", error);
    return false;
  }
};

const AdminRoutes = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const verifyAuth = async () => {
      const result = await checkAdminAuth();
      setAuthenticated(result);
      setIsLoading(false);
    };
    verifyAuth();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!authenticated) {
    // Redirect to login or unauthorized if the user is not an admin
    return <Navigate to="/user" />;
  }

  return <Outlet />; // Allow access to child routes for admins
};

export default AdminRoutes;
