import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyStudents() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Get the user data from localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        // Fetch students supervised by the logged-in supervisor
        axios.get(`http://127.0.0.1:8000/auth/supervisor/${user.id}/students/`)
            .then(response => {
                setStudents(response.data);
                setFilteredStudents(response.data); // Initialize filtered students with all students
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    }, []);

const updateDissertationStatus = (dissertationId, newStatus) => {
    axios.patch(`http://127.0.0.1:8000/auth/dissertations/${dissertationId}/update_status/`, { status: newStatus })
        .then(response => {
            // Update students state with the updated dissertation
            const updatedStudents = students.map(student => ({
                ...student,
                dissertations: student.dissertations.map(dissertation =>
                    dissertation.id === response.data.id ? response.data : dissertation
                )
            }));
            setStudents(updatedStudents);
            setFilteredStudents(updatedStudents); // Optionally update filtered students if needed
        })
        .catch(error => {
            console.error('Error updating dissertation status:', error);
        });
};


    const handleSearch = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filtered = students.filter(student =>
            student.dissertations.some(dissertation =>
                dissertation.title.toLowerCase().includes(searchTerm)
            )
        );
        setFilteredStudents(filtered);
    };

    return (
        <div className='ml-64 mr-10'>
            <div className='mb-4 py-4'>
                <input
                    type='text'
                    className='shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline w-full'
                    placeholder='Search by dissertation title...'
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            {filteredStudents.length > 0 ? (
                <div className='overflow-x-auto'>
                    <table className='min-w-full bg-white border rounded-lg'>
                        <thead>
                            <tr className='bg-gray-200 text-gray-600 uppercase text-sm leading-normal'>
                                <th className='py-3 px-6 text-left'>Name</th>
                                <th className='py-3 px-6 text-left'>Reg No</th>
                                <th className='py-3 px-6 text-left'>Email</th>
                                <th className='py-3 px-6 text-left'>Dissertation Title</th>
                                <th className='py-3 px-6 text-left'>Status</th>
                                <th className='py-3 px-6 text-left'>File</th>
                                <th className='py-3 px-6 text-center'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-600 text-sm font-light'>
                            {filteredStudents.map(student => (
                                student.dissertations.map(dissertation => (
                                    <tr key={dissertation.title} className='border-b border-gray-200 hover:bg-gray-100'>
                                        <td className='py-3 px-6 text-left whitespace-nowrap'>{student.firstname} {student.surname}</td>
                                        <td className='py-3 px-6 text-left'>{student.RegNo}</td>
                                        <td className='py-3 px-6 text-left'>{student.email}</td>
                                        <td className='py-3 px-6 text-left'>{dissertation.title}</td>
                                        <td className='py-3 px-6 text-left'>{dissertation.status}</td>
                                        <td className='py-3 px-6 text-left'>
                                            {dissertation.file ? (
                                                <a href={dissertation.file} target='_blank' rel='noopener noreferrer' className='text-blue-500 hover:underline'>View File</a>
                                            ) : (
                                                <span>No file uploaded</span>
                                            )}
                                        </td>
                                        <td className='py-3 px-6 text-center'>
                                            {dissertation.status !== 'VERIFIED' && (
                                                <div>
                                                    <button
                                                        className='bg-green-500 text-white px-2 py-1 rounded mr-2 hover:bg-green-600'
                                                        onClick={() => updateDissertationStatus(dissertation.id, 'VERIFIED')}
                                                    >
                                                        Approve
                                                    </button>
                                                    <button
                                                        className='bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600'
                                                        onClick={() => updateDissertationStatus(dissertation.id, 'REJECTED')}
                                                    >
                                                        Reject
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className='text-gray-600'>No students found.</p>
            )}
        </div>
    );
}

export default MyStudents;
