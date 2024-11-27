import axios from 'axios';
import React, { useState } from 'react';

interface LoginFormProps {
 
}

const Login: React.FC<LoginFormProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    
  const formSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    console.log("hit howe")
    try {
        // Send login request with credentials (cookies)
        const response = await axios.post('http://localhost:3000/api/auth/login', { email, password }, {
            withCredentials: true, 
          });
        console.log(response);
      } catch (error) {
        console.error('Login error:', error);
      }  
    setIsSubmitting(false);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
      
      <form onSubmit={formSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default Login;
