import React from 'react';
import './list.css';

const StudentList = ({ students, fetchStudents, setEditingStudent }) => {
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8080/student/${id}`, {
        method: 'DELETE',
      });
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div className="student-list-container">
      <h2>Student Records</h2>
      {students.length === 0 ? (
        <p className="no-data">No students available.</p>
      ) : (
        <div className="student-grid">
          {students.map((student) => (
            <div key={student.id} className="student-card">
              <div className="student-details">
                <h3>{student.name}</h3>
                <p><strong>ID:</strong> {student.id}</p>
                <p><strong>Reg No:</strong> {student.reg_no}</p>
                <p>
                  <strong>DOB:</strong>{' '}
                  {student.dob
                    ? new Date(student.dob).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })
                    : 'N/A'}
                </p>
                <p><strong>Dept:</strong> {student.dept}</p>
                <p><strong>Address:</strong> {student.address}</p>
                <p><strong>City:</strong> {student.city}</p>
              </div>
              <div className="card-buttons">
                <button
                  className="edit-btn"
                  onClick={() => setEditingStudent(student)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(student.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
