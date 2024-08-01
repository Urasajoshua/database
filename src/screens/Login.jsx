import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../store/userReducer';

const Login = () => {
    const [emailOrRegno, setEmailOrRegno] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const resultAction = await dispatch(loginUser({ email_or_regno: emailOrRegno, password }));
            if (loginUser.fulfilled.match(resultAction)) {
                setEmailOrRegno('');
                setPassword('');
                navigate('/'); // Navigate to the home page after successful login
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-6 py-8 mb-4 max-w-sm w-full sm:px-10 sm:py-10 md:max-w-md lg:max-w-lg">
                <div className="flex justify-center mb-6">
                    <img src="/1.png" alt="Logo" className="h-16 sm:h-24" /> {/* Adjust the path to your logo */}
                </div>
                <h1 className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-center text-blue-600 font-bold">Database Management System</h1>
                <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 text-center text-gray-700">Login</h2>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="emailOrRegno">
                        Email or Registration Number
                    </label>
                    <input
                        id="emailOrRegno"
                        type="text"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={emailOrRegno}
                        onChange={(e) => setEmailOrRegno(e.target.value)}
                        placeholder="Enter your email or registration number"
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        type="password"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Login;
