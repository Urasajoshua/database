import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        RegNo: '',
        password: '',
        role: '',
        firstname: '',
        middlename: '',
        surname: '',
        course: ''
    });
    const [errors, setErrors] = useState({});
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('http://64.23.247.7:8000/auth/courses/');
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Set the default password as the uppercase surname
            const defaultPassword = formData.surname.toUpperCase();
            await axios.post('http://64.23.247.7:8000/api/users/', { ...formData, password: defaultPassword,role:'STUDENT' });
            alert('Student added successfully');
            setFormData({
                email:'',
                RegNo: '',
                password: '',
                role: 'STUDENT',
                firstname: '',
                surname: '',
                course: ''
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
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-2xl">
           
            {errors.global && <div className="text-red-500 mb-4 text-center">{errors.global}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">

            <div>
                    <label className="block text-gray-700 font-medium mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.RegNo && <span className="text-red-500 text-sm">{errors.email}</span>}
                </div>
               
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Registration Number:</label>
                    <input
                        type="text"
                        name="RegNo"
                        value={formData.RegNo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.RegNo && <span className="text-red-500 text-sm">{errors.RegNo}</span>}
                </div>
                
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Firstname:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.firstname && <span className="text-red-500 text-sm">{errors.firstname}</span>}
                </div>
                
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Lastname:</label>
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.surname && <span className="text-red-500 text-sm">{errors.surname}</span>}
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-1">Program:</label>
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Program</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                    {errors.course && <span className="text-red-500 text-sm">{errors.course}</span>}
                </div>
                <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200">
                    Add Student
                </button>
            </form>
        </div>
    );
};

export default StudentForm;
