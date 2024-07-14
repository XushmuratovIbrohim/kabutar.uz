import { validationResult } from "express-validator"
import bcrypt from 'bcrypt'
import { UserModel } from "../models/UserModels.js"
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()) {
            return res.status(400).json({ msg: errors.array() })
        }
        const {phoneNumber, password, username} = req.body

        const salt = await bcrypt.genSalt(10)
        const passwordHash = await bcrypt.hash(password, salt)
        const doc = new UserModel({subscribeds: [], subscribers: [], passwordHash, username, phoneNumber})
        const user = await doc.save()
        
        const token = jwt.sign(
            {
                id: user._id,
            },
            'nematoda',
            {
                expiresIn: '30d'
            }
        )
        
        delete user._doc.passwordHash

        res.json({...user._doc, token})
    } catch (e) {
        res.status(400).json(e)
    }
}

export const login = async (req, res) => {
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty) {
            return res.status(400).json({msg: errors.array()})
        }

        const { phoneNumber, password } = req.body
        
        const user = await UserModel.findOne({
            phoneNumber
        })
        if(!user) {
            return res.status(400).json({msg: 'Error in getting user'})
        }

        const compareHashed = await bcrypt.compare(password, user._doc.passwordHash)
        if(!compareHashed) {
            res.status('400').json({msg: 'invalid password'})
        }
        const token = jwt.sign(
            {
                id: user._id
            },
            'nematoda',
            {
                expiresIn: '30d'
            }
        )

        delete user._doc.passwordHash
        res.json({...user._doc, token})
    } catch (e) {
        res.status(400).json(e)
    }
}

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.id)
        if(!user) {
            return res.status(404).json({msg: 'user not found'})
        }

        delete user._doc.passwordHash
        res.json({...user._doc})
    } catch (e) {
        console.log(e);
        res.status(500).json({msg: 'Error in getting user'})
    }
}