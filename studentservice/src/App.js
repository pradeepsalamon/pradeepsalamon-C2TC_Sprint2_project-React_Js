import React, { useState, useEffect } from 'react';
import './App.css';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';

const App = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch('http://localhost:8080/student');
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div className="App">
      <h1>Student Management System</h1>
      <StudentForm
        fetchStudents={fetchStudents}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />
      <StudentList
        students={students}
        fetchStudents={fetchStudents}
        setEditingStudent={setEditingStudent}
      />
    </div>
  );
};

export default App;
