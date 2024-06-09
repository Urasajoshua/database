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
                const response = await axios.get('http://127.0.0.1:8000/auth/courses/');
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
            await axios.post('http://localhost:8000/api/users/', { ...formData, password: defaultPassword });
            alert('Student added successfully');
            setFormData({
                email: '',
                RegNo: '',
                password: '',
                role: '',
                firstname: '',
                middlename: '',
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
    console.log(errors);
    

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
            <h2 className="text-2xl mb-4">Add Student</h2>
            {errors.global && <div className="text-red-500 mb-4">{errors.global}</div>}
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block mb-1">Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.email && <span className="text-red-500">{errors.email}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Registration Number:</label>
                    <input
                        type="text"
                        name="RegNo"
                        value={formData.RegNo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.RegNo && <span className="text-red-500">{errors.RegNo}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Role:</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.role && <span className="text-red-500">{errors.role}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Firstname:</label>
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.firstname && <span className="text-red-500">{errors.firstname}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Middlename:</label>
                    <input
                        type="text"
                        name="middlename"
                        value={formData.middlename}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.middlename && <span className="text-red-500">{errors.middlename}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Surname:</label>
                    <input
                        type="text"
                        name="surname"
                        value={formData.surname}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                    {errors.surname && <span className="text-red-500">{errors.surname}</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1">Course:</label>
                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="">Select Course</option>
                        {courses.map((course) => (
                            <option key={course.id} value={course.id}>
                                {course.name}
                            </option>
                        ))}
                    </select>
                    {errors.course && <span className="text-red-500">{errors.course}</span>}
                </div>
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    Add Student
                </button>
            </form>
        </div>
    );
};

export default StudentForm;
