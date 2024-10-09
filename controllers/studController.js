const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllStud = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT student_id, lname, fname, mname, user_id, course_id, created_at, updated_at FROM students');
        res.json(rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const createStud = async (req, res) => {
    const { fname, lname, mname, user_id, course_id } = req.body;

    try {
        const [result] = await pool.query('INSERT INTO students (fname, lname, mname, user_id, course_id) VALUES (?, ?, ?, ?, ?)', [lname, fname, mname, user_id, course_id]);
        res.status(201).json({ student_id: result.insertId, lname, fname, mname, user_id, course_id});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

const getStudById = async (req, res) => {
    const {id} = req.params;

    try {
        const [rows] = await pool.query('SELECT student_id, lname, fname, mname, user_id, course_id, created_at, updated_at FROM students WHERE student_id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User non-existent' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }

};

const updateStud = async (req, res) => {
    const {id} = req.params;
    const {lname, fname, mname} = req.body;

    try {
        const [result] = await pool.query('UPDATE students SET lname = ?, fname = ?, mname = ? WHERE student_id = ?', [lname, fname, mname, id]);

        if (result.affectRows === 0) {
            return res.status(404).json({ error: 'Student non-existent' });
        }

        res.json({ message: 'Student updated successfully.' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteStud = async (req, res) => {
    const {id} = req.params;

    try {
        const [result] = await pool.query('DELETE FROM students WHERE student_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Student non-existent' });
        }

        res.json({ message: 'Student silenced'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


module.exports = { createStud, getStudById, getAllStud, updateStud, deleteStud };