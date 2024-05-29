import React, { useState } from 'react';
import axios from 'axios';

const SupervisorForm = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        middlename: '',
        surname: '',
        email: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/supervisors/', formData);
            alert('Supervisor added successfully');
            setFormData({
                firstname: '',
                middlename: '',
                surname: '',
                email: ''
            });
            setErrors({});
        } catch (error) {
            console.error('Error adding supervisor:', error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ global: 'An error occurred. Please try again later.' });
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl mb-4">Add Supervisor</h2>
            {errors.global && <div className="text-red-500 mb-4">{errors.global}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">First Name:</label>
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    {errors.firstname && <span className="text-red-500">{errors.firstname}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Middle Name:</label>
                    <input type="text" name="middlename" value={formData.middlename} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Surname:</label>
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    {errors.surname && <span className="text-red-500">{errors.surname}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Add Supervisor
                </button>
            </form>
        </div>
    );
};

export default SupervisorForm;
