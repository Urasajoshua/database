import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyStudents() {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = () => {
        const user = JSON.parse(localStorage.getItem('user'));
        axios.get(`https://gamerlastborn.pythonanywhere.com/auth/supervisor/${user.id}/students/`)
            .then(response => {
                setStudents(response.data);
                setFilteredStudents(response.data);
            })
            .catch(error => {
                console.error('Error fetching students:', error);
                setError('Failed to fetch students');
            });
    };

    const updateDissertationStatus = (dissertationId, newStatus) => {
        axios.patch(`https://gamerlastborn.pythonanywhere.com/dissertations/${dissertationId}/`, { status: newStatus })
            .then(response => {
                const updatedStudents = students.map(student => ({
                    ...student,
                    dissertations: student.dissertations.map(dissertation =>
                        dissertation.id === response.data.id ? response.data : dissertation
                    )
                }));
                setStudents(updatedStudents);
                setFilteredStudents(updatedStudents);
            })
            .catch(error => {
                console.error('Error updating dissertation status:', error);
                setError('Failed to update dissertation status');
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

    const StatusDropdown = ({ dissertationId, currentStatus }) => {
        const [dropdownOpen, setDropdownOpen] = useState(false);
        const statusOptions = ['PENDING', 'APPROVED', 'REJECTED'];

        return (
            <div className="relative">
                <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="text-blue-500 focus:outline-none"
                >
                    {currentStatus}
                </button>
                {dropdownOpen && (
                    <div className="absolute mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        {statusOptions.map((status) => (
                            <div
                                key={status}
                                onClick={() => {
                                    updateDissertationStatus(dissertationId, status);
                                    setDropdownOpen(false);
                                }}
                                className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                            >
                                {status}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className='p-4'>
            {error && <p className='text-red-500 mb-4'>{error}</p>}
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
                                <th className='py-3 px-6 text-left'>File</th>
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
                                                >
                                                    View File
                                                </a>
                                            ) : (
                                                <span>No file uploaded</span>
                                            )}
                                        </td>
                                        <td className='py-3 px-6 text-left'>
                                            <StatusDropdown dissertationId={dissertation.id} currentStatus={dissertation.status} />
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
