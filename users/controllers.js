import bcrypt from "bcrypt"
import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import crypto from "crypto"

import User from './models.js';
import { postSchemaUser, postSchemaLogin } from "./validation.js";
import { noDataFound } from '../bin/messages-constants.js';

const hashPassword = async (password) => {
    try {
        const saltRounds = 10; 
        const hash = await bcrypt.hash(password, saltRounds);
        return hash; 
    } catch (error) {
        throw error;
    }
};

export async function addUser(req, res) {
    const userData = req.body;
    const { error } = postSchemaUser.validate(userData);
    if (error) {
        return res.status(400).json({ error: error.details.map((d) => d.message) });
    }
    const password = userData.password;
    try {
        const hashedPassword = await hashPassword(password);
        userData.password = hashedPassword;
        const user = new User(userData);
        const savedUser = await user.save();
        return res.status(200).json({ message: "User added successfully", user: savedUser });
    } catch (error) {
        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return res.status(409).json({ message: 'User with the same email already exists' });
        } else {
            console.error("Error adding user:", error);
            return res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    } 
}


export async function login(req, res) {
    const object = req.body;
    const { error } = postSchemaLogin.validate(object);
    if (error) {
        return res.status(400).json({ error: error.details.map((d) => d.message) });
    } 
    const username = object.username;
    const password = object.password;
    try {
        const userPassword = await User.findOne({ username: username }).select('password').exec();
        if (userPassword) {
            const match = await bcrypt.compare(password, userPassword.password); 
            if (match) {
                const tokenData = {
                    userId: userPassword._id,
                };
                const token = await jwt.sign(tokenData, process.env.SECRET_KEY);
                return res.status(200).json({token: token});
            } else {
                return res.status(401).json({message: "access denied"});
            }
        } else {
            res.status(401).json({message: "access denied"});
        }
            
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "error"});
    }   

}

export async function getUsers(req, res) {
    try {
        const users = await User.find();
        if (users.length == 0) {
            return res.status(404).send("No data found")
        }
        return res.status(200).send(users)
    } catch (error) {
        return res.status(500).send(error)
    }
}