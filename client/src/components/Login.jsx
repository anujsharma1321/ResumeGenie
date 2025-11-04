import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Authenticate/AuthContext';
import axios from 'axios';

function Login() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = React.useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({ ...prev, [name]: value }));
  };

  const handleLogin = async () => {
    const { email, password } = user;
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/login', user);
      if (res.data.user){
        login(res.data.user);
        navigate('/');
      } else {
        setError(res.data.message || 'Login failed.');
      }
    } catch (err) {
         console.log(err);
      setError('Server error. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="w-full max-w-md p-8  rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

        {error && <div className="mb-4 text-red-600 text-sm">{error}</div>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={handleLogin}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>

        <div className="mt-4 text-sm text-center">
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => navigate('/register')}
          >
            New user? Register here
          </span>
        </div>
      </div>
    </div>
  );
}

export default Login;
