const {createUser, findUserByusername} = require('../Models/authModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRY = '1h';

const register = async (req,res) => {
    try {
        const {username, password} = req.body;
        const hash = await bcrypt.hash(password,SALT_ROUNDS);
        const user = await createUser(username, hash);
        res.status(201).json({ id: user.id, username: user.username });

    } catch (err) {
        if (err.code === '23505') {
            return res.status(409).json({error: 'Username exists'});
        }
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
};

const login = async (req,res) => {
    try {
        const {username, password} = req.body;
        const user = await findUserByusername(username);
        if (!user) return res.status(401).json({error: 'invalid username'});

        const valid = await bcrypt.compare(password, user.password_hash);
        if (!valid) return res.status(401).json({error: 'invalid password'});

        const token = await jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: JWT_EXPIRY});
        
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 1000 * 60 * 60
        });

        res.status(200).json({userId: user.id, username: user.username, role: user.role});
    } catch (err) {
        console.log(err);
    }
};

const logout = async (req,res) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            sameSite: 'lax'
        });
        res.status(200).json({message: 'logged out successfully'})
    } catch (err) {
        console.log(err);
    };
};

const checkLoggedIn = async (req,res) => {
    return res.sendStatus(200);
};

module.exports = {
    register,
    login,
    logout,
    checkLoggedIn
};