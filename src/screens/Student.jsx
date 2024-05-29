import React, { useState } from 'react';
import axios from 'axios';

const StudentForm = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        surname: '',
        RegNo: '',
        course: '',
        year: '',
        supervisor: ''
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
            await axios.post('http://localhost:8000/api/users/', formData);
            alert('Student added successfully');
            setFormData({
                firstname: '',
                lastname: '',
                surname: '',
                RegNo: '',
                course: '',
                year: '',
                supervisor: ''
            });
            setErrors({});
        } catch (error) {
            console.error('Error adding student:', error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ global: 'An error occurred. Please try again later.' });
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl mb-4">Add Student</h2>
            {errors.global && <div className="text-red-500 mb-4">{errors.global}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">First Name:</label>
                    <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    {errors.firstname && <span className="text-red-500">First Name is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Last Name:</label>
                    <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    {errors.lastname && <span className="text-red-500">Last Name is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Surname:</label>
                    <input type="text" name="surname" value={formData.surname} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Registration Number:</label>
                    <input type="text" name="RegNo" value={formData.RegNo} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                    {errors.RegNo && <span className="text-red-500">Registration Number is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Course:</label>
                    <input type="text" name="course" value={formData.course} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Year:</label>
                    <input type="number" name="year" value={formData.year} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Supervisors:</label>
                    <input type="text" name="supervisor" value={formData.supervisor} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Add Student
                </button>
            </form>
        </div>
    );
};

export default StudentForm;
