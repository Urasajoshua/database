import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DissertationForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        file: null
    });
    const [studentId, setStudentId] = useState(null);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    useEffect(() => {
        // Retrieve student ID from localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.id) {
            setStudentId(storedUser.id);
        }
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            file: e.target.files[0]
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = new FormData();
            data.append('title', formData.title);
            data.append('file', formData.file);
            data.append('student', studentId); // Add student ID to the formData

            const response = await axios.post('http://gamerlastborn.pythonanywhere.com/api/dissertations/', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Include an authorization header if your API requires it
                    // 'Authorization': `Bearer ${token}`
                }
            });

            setMessage('Dissertation added successfully');
            setFormData({
                title: '',
                file: null
            });
            setErrors({});
        } catch (error) {
            console.error('Error adding dissertation:', error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ global: 'An error occurred. Please try again later.' });
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl mb-4">Add Dissertation</h2>
            {errors.global && <div className="text-red-500 mb-4">{errors.global}</div>}
            {message && <div className="text-green-500 mb-4">{message}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    {errors.title && <span className="text-red-500">{errors.title}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">File:</label>
                    <input
                        type="file"
                        name="file"
                        onChange={handleFileChange}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    {errors.file && <span className="text-red-500">{errors.file}</span>}
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    Add Dissertation
                </button>
            </form>
        </div>
    );
};

export default DissertationForm;
