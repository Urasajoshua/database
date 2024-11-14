import React, { useState, useEffect } from "react";
import axios from "axios";

const Supervisor = () => {
  const [formData, setFormData] = useState({
    email: "",
    RegNo: "",
    password: "",
    role: "SUPERVISOR", // Default role for new users
    firstname: "",
    surname: "",
    student: "", // New field for selecting student
  });
  const [errors, setErrors] = useState({});
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          "https://gamerlastborn.pythonanywhere.com/api/users/?role=STUDENT"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Set the default password as the uppercase surname
      const defaultPassword = formData.surname.toUpperCase();
      await axios.post("https://gamerlastborn.pythonanywhere.com/api/users/", {
        ...formData,
        password: defaultPassword,
        role: "SUPERVISOR",
      });
      alert("Supervisor added successfully");
      setFormData({
        email: "",
        RegNo: "",
        password: "",
        role: "SUPERVISOR",
        firstname: "",
        surname: "",
      });
      setErrors({});
    } catch (error) {
      console.error("Error adding supervisor:", error);
      if (error.response && error.response.data) {
        setErrors(error.response.data);
        console.log(error.response.data);
      } else {
        setErrors({ global: "An error occurred. Please try again later." });
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        {errors.global && (
          <div className="text-red-500 mb-4 text-center">{errors.global}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            {errors.email && (
              <span className="text-red-500 text-sm">{errors.email}</span>
            )}
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Id Number
            </label>
            <input
              type="text"
              name="RegNo"
              value={formData.RegNo}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            {errors.RegNo && (
              <span className="text-red-500 text-sm">{errors.RegNo}</span>
            )}
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Firstname
            </label>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            {errors.firstname && (
              <span className="text-red-500 text-sm">{errors.firstname}</span>
            )}
          </div>
          <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Lastname
            </label>
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            />
            {errors.surname && (
              <span className="text-red-500 text-sm">{errors.surname}</span>
            )}
          </div>
          {/* <div className="relative">
            <label className="block text-gray-700 font-medium mb-1">
              Student
            </label>
            <select
              name="student"
              value={formData.student}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            >
              <option value="">Select Student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.firstname} {student.surname}
                </option>
              ))}
            </select>
            {errors.student && (
              <span className="text-red-500 text-sm">{errors.student}</span>
            )}
          </div> */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            Add Supervisor
          </button>
        </form>
      </div>
    </div>
  );
};

export default Supervisor;
