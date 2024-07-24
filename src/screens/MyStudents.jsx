import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyStudents() {
    const [students, setStudents] = useState([]); // State to store all students
    const [filteredStudents, setFilteredStudents] = useState([]); // State to store filtered students
    const [searchTerm, setSearchTerm] = useState(''); // State to store search term

    useEffect(() => {
        // Fetch students on component mount
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get(`http://gamerlastborn.pythonanywhere.com/auth/supervisor/${user.id}/students/`)
            .then(response => {
                setStudents(response.data);
                setFilteredStudents(response.data); // Initialize filtered students
            })
            .catch(error => {
                console.error('Error fetching students:', error);
            });
    };

    const updateDissertationStatus = (dissertationId, newStatus) => {
        axios.patch(`http://gamerlastborn.pythonanywhere.com/dissertations/${11}/`, { status: newStatus })
            .then(response => {
                const updatedStudents = students.map(student => ({
                    ...student,
                    dissertations: student.dissertations.map(dissertation =>
                        dissertation.id === response.data.id ? response.data : dissertation
                    )
                }));
                console.log('resppoo',response);
                setStudents(updatedStudents);
                setFilteredStudents(updatedStudents); // Update filtered students if needed
            })
            .catch(error => {
                console.error('Error updating dissertation status:', error.response);
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
                                
                            </tr>
                        </thead>
                        <tbody className='text-gray-600 text-sm font-light'>
                            {filteredStudents.map(student => (
                                student.dissertations.map(dissertation => (
                                    <tr key={dissertation.id} className='border-b border-gray-200 hover:bg-gray-100'>
                                        <td className='py-3 px-6 text-left whitespace-nowrap'>{student.firstname} {student.surname}</td>
                                        <td className='py-3 px-6 text-left'>{student.RegNo}</td>
                                        <td className='py-3 px-6 text-left'>{student.email}</td>
                                        <td className='py-3 px-6 text-left'>{dissertation.title}</td>
                                        <td className='py-3 px-6 text-left'>
                                            {dissertation.file ? (
                                                <a
                                                    href={`http://127.0.0.1:8000${dissertation.file}`}
                                                    target='_blank'
                                                    rel='noopener noreferrer'
                                                    className='text-blue-500 hover:underline'
                                                    onClick={() => console.log('File URL:', `http://127.0.0.1:8000${dissertation.file}`)}
                                                >
                                                    View File
                                                </a>
                                            ) : (
                                                <span>No file uploaded</span>
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
