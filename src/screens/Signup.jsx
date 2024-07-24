import React, { useState } from 'react';
import axios from 'axios';

const Signup = () => {
    const [formData, setFormData] = useState({
        email: '',
        RegNo: '',
        role: 'STUDENT',  // Default role, change as needed
        firstname: '',
        middlename: '',
        surname:'',
        password:''
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://gamerlastborn.pythonanywhere.com/auth/signup/', formData);
            setSuccessMessage('Signup successful');
            setErrors({});
            formData.RegNo=''
            formData.email='',
            formData.firstname=''
            formData.middlename=''
            formData.role=''
            formData.surname=''
            formData.password=''
        } catch (error) {
            console.error('Error during signup:', error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ global: 'An error occurred. Please try again later.' });
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-orange-900 rounded shadow-md">
            <h1>Aru Database online</h1>
            <h2 className="text-2xl mb-4">Signup</h2>
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
            {errors.global && <div className="text-red-500 mb-4">{errors.global}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">RegNo:</label>
                    <input type="text" name="RegNo" value={formData.RegNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    {errors.RegNo && <span className="text-red-500">{errors.RegNo}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Role:</label>
                    <select name="role" value={formData.role} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded">
                        
                        <option value="SUPERVISOR">Supervisor</option>
                        <option value="STUDENT">Student</option>
                    </select>
                    {errors.role && <span className="text-red-500">{errors.role}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">First Name:</label>
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    {errors.firstname && <span className="text-red-500">{errors.firstname}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Middle Name:</label>
                    <input type="text" name="middlename" value={formData.middlename} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    {errors.middlename && <span className="text-red-500">{errors.middlename}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">SurName:</label>
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    {errors.surname && <span className="text-red-500">{errors.surname}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">password:</label>
                    <input type="text" name="password" value={formData.password} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    {errors.password && <span className="text-red-500">{errors.password}</span>}
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Signup
                </button>
            </form>
        </div>
    );
};

export default Signup;
