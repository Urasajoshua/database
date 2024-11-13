import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate(); // Initialize the navigate function

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://64.23.247.7:8000/auth/update-password/', {
                email,
                new_password: newPassword,
            });

            if (response.status === 200) {
                setSuccessMessage('Password updated successfully. You can now log in with your new password.');
                setEmail('');
                setNewPassword('');
                
                // Redirect to the login page after a successful password update
                setTimeout(() => {
                    navigate('/login'); // Use the navigate function
                }, 2000); // Optional: Wait for 2 seconds before redirecting
            }
        } catch (err) {
            setError('Failed to update password. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-teal-500 px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10">
            <form onSubmit={handleSubmit} className="bg-white shadow-lg rounded-lg px-6 py-8 mb-4 max-w-sm w-full sm:px-10 sm:py-10 md:max-w-md lg:max-w-lg">
                <h1 className="text-2xl sm:text-3xl mb-4 sm:mb-6 text-center text-blue-600 font-bold">Reset Password</h1>
                {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                {successMessage && <p className="text-green-500 text-sm mb-4 text-center">{successMessage}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        type="email"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="newPassword">
                        New Password
                    </label>
                    <input
                        id="newPassword"
                        type="password"
                        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter your new password"
                        required
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300"
                    >
                        Update Password
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ForgotPassword;
