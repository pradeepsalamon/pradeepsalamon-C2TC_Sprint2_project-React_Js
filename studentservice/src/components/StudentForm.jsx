import React, { useState, useEffect } from 'react';
import './form.css';

const StudentForm = ({ fetchStudents, editingStudent, setEditingStudent }) => {
    const [student, setStudent] = useState({
        id: '',
        name: '',
        reg_no: '',
        dob: '',
        dept: '',
        address: '',
        city: '',
    });

    useEffect(() => {
        if (editingStudent) {
            let formattedDob = '';

            if (editingStudent.dob) {
                const rawDob = editingStudent.dob;

                if (typeof rawDob === 'string') {
                    if (rawDob.includes('T')) {
                        formattedDob = rawDob.split('T')[0];
                    } else if (rawDob.includes(' ')) {
                        formattedDob = rawDob.split(' ')[0];
                    } else {
                        formattedDob = rawDob;
                    }
                } else if (rawDob instanceof Date) {
                    // If backend sent actual Date object
                    formattedDob = rawDob.toISOString().split('T')[0];
                }
            }

            setStudent({
                id: editingStudent.id || '',
                name: editingStudent.name || '',
                reg_no: editingStudent.reg_no || '',
                dob: formattedDob || '',
                dept: editingStudent.dept || '',
                address: editingStudent.address || '',
                city: editingStudent.city || '',
            });
        } else {
            setStudent({
                id: '',
                name: '',
                reg_no: '',
                dob: '',
                dept: '',
                address: '',
                city: '',
            });
        }
    }, [editingStudent]);



    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = editingStudent
            ? `http://localhost:8080/student/${student.id}`
            : 'http://localhost:8080/student';
        const method = editingStudent ? 'PUT' : 'POST';

        try {
            await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(student),
            });

            fetchStudents();
            setEditingStudent(null);
            setStudent({
                id: '',
                name: '',
                reg_no: '',
                dob: '',
                dept: '',
                address: '',
                city: '',
            });
        } catch (error) {
            console.error('Error saving student:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>

            <form onSubmit={handleSubmit}>

                <div className="form-grid-3">

                    <div className="input-column">
                        <label>ID:</label>
                        <input
                            type="number"
                            name="id"
                            value={student.id}
                            onChange={handleChange}
                            required
                            disabled={!!editingStudent}
                            className="input-field"
                        />
                    </div>

                    <div className="input-column">
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={student.name}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>

                    <div className="input-column">
                        <label>Register Number:</label>
                        <input
                            type="text"
                            name="reg_no"
                            value={student.reg_no}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>

                    <div className="input-column">
                        <label>Date of Birth:</label>
                        <input
                            type="date"
                            name="dob"
                            value={student.dob}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>

                    <div className="input-column">
                        <label>Department:</label>
                        <input
                            type="text"
                            name="dept"
                            value={student.dept}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>

                    <div className="input-column">
                        <label>City:</label>
                        <input
                            type="text"
                            name="city"
                            value={student.city}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>

                    {/* Address now normal column */}
                    <div className="input-column">
                        <label>Address:</label>
                        <input
                            type="text"
                            name="address"
                            value={student.address}
                            onChange={handleChange}
                            required
                            className="input-field"
                        />
                    </div>

                    {/* Buttons now in SAME COLUMN, not full width */}
                    <div className="button-group">
                        <button type="submit" className="btn-submit">
                            {editingStudent ? 'Update Student' : 'Add Student'}
                        </button>

                        {editingStudent && (
                            <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => setEditingStudent(null)}
                            >
                                Cancel
                            </button>
                        )}
                    </div>


                </div>
            </form>
        </div>
    );

}

export default StudentForm;
