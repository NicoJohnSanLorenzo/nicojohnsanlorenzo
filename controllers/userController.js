const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
    try {

        const [rows] = await pool.query('SELECT id, fullname, username, created_at, updated_at FROM users');
        res.json(rows);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getUserById = async (req, res) => {
    const {id} = req.params;

    try {
        const [rows] = await pool.query('SELECT id, fullname, username, created_at, updated_at FROM users WHERE id = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(rows[0]);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }

};


const createUser = async (req, res) => {
    const { fullname, username, passwords } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(passwords, 10);
        const [result] = await pool.query('INSERT INTO users (fullname, username, passwords) VALUES (?, ?, ?)', [fullname, username, hashedPassword]);
        res.status(201).json({ id: result.insertId, fullname, username, passwords});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
};

const updateUser = async (req, res) => {
    const {id} = req.params;
    const {fullname, username, passwords} = req.body;

    try {
        const hashedPassword = await bcrypt.hash(passwords, 10);
        const [result] = await pool.query('UPDATE users SET fullname = ?, username = ?, passwords = ? WHERE id = ?', [fullname, username, hashedPassword, id]);

        if (result.affectRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteUser = async (req, res) => {
    const {id} = req.params;

    try {
        const [result] = await pool.query('DELETE FROM users WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({ message: 'User deleted successfully'});
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };