const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getCourseStud = async (req, res) => {
    const { id } = req.params;  

    try {
        
        const [rows] = await pool.query(
            'SELECT students.lname, students.fname, students.mname, courses.course_name, departments.dept_name FROM students INNER JOIN courses ON courses.course_id = students.course_id INNER JOIN departments ON departments.dept_id = courses.dept_id WHERE students.student_id = ?', 
            [id]
        );

        if (rows.length === 0) {
            return res.status(400).json({ error: 'No students found for this course.' });
        }

        res.json({ students: rows[0] });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getDeptCourses= async (req, res) => {
    const { id } = req.body;  

    try {
        
        const [rows] = await pool.query(
            'SELECT departments.dept_id, departments.dept_name, courses.course_id, courses.course_name FROM departments INNER JOIN courses ON departments.dept_id = courses.dept_id WHERE departments.dept_id = ?', 
            [id]
        );

        if (rows.length === 0) {
            return res.status(400).json({ error: 'No department found for this school.' });
        }

        res.json({ courses: rows });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getCourseStud, getDeptCourses };
