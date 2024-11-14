import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SupervisorForm = () => {
    const [formData, setFormData] = useState({
        supervisor: '', // Field for selecting supervisor
        students: [], // Field for selecting multiple students
    });
    const [errors, setErrors] = useState({});
    const [supervisors, setSupervisors] = useState([]);
    const [students, setStudents] = useState([]);

    useEffect(() => {
        const fetchSupervisors = async () => {
            try {
                const response = await axios.get('http://13.60.203.193:8000/api/users/?role=SUPERVISOR');
                setSupervisors(response.data);
            } catch (error) {
                console.error('Error fetching supervisors:', error);
            }
        };

        const fetchStudents = async () => {
            try {
                const response = await axios.get('/api/users/?role=STUDENT');
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchSupervisors();
        fetchStudents();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleStudentChange = (e) => {
        const options = e.target.options;
        const selectedStudents = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                selectedStudents.push(options[i].value);
            }
        }
        setFormData({
            ...formData,
            students: selectedStudents
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://13.60.203.193:8000/api/assign_students_to_supervisor/', formData);
            alert('Students assigned to supervisor successfully');
            setFormData({
                supervisor: '',
                students: []
            });
            setErrors({});
        } catch (error) {
            console.error('Error assigning students to supervisor:', error);
            if (error.response && error.response.data) {
                setErrors(error.response.data);
            } else {
                setErrors({ global: 'An error occurred. Please try again later.' });
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-50">
            <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-lg">
                {errors.global && <div className="text-red-500 mb-4 text-center">{errors.global}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="relative">
                        <label className="block text-gray-700 font-medium mb-1">Supervisor</label>
                        <select
                            name="supervisor"
                            value={formData.supervisor}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        >
                            <option value="">Select Supervisor</option>
                            {supervisors.map((supervisor) => (
                                <option key={supervisor.id} value={supervisor.id}>
                                    {supervisor.firstname} {supervisor.surname}
                                </option>
                            ))}
                        </select>
                        {errors.supervisor && <span className="text-red-500 text-sm">{errors.supervisor}</span>}
                    </div>
                    <div className="relative">
                        <label className="block text-gray-700 font-medium mb-1">Students</label>
                        <select
                            name="students"
                            multiple
                            value={formData.students}
                            onChange={handleStudentChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                        >
                            {students.map((student) => (
                                <option key={student.id} value={student.id}>
                                    {student.firstname} {student.surname}
                                </option>
                            ))}
                        </select>
                        {errors.students && <span className="text-red-500 text-sm">{errors.students}</span>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                        Assign Students to Supervisor
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SupervisorForm;
