import { generateToken } from "../config/generateToken.js"
import { setCookie } from "../config/setCookies.js"
import userModel from "../models/user.model.js"
import bcrypt from "bcryptjs"


export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const emailExists = await userModel.findOne({ email })
        if (emailExists) {
            return res.status(400).json({ message: "Email already exists" })
        }
        if (password.length < 3) {
            return res.status(400).json({ message: "Password must be at least 3 characters long" })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
        const user = await userModel.create({ name, email, password: hashedPassword })
        const token = await generateToken(user?._id)
        setCookie(res, token)
        return res.status(201).json(user)
    } catch (error) {
        console.log(`Error in Register Controller: ${error}`)
        return res.status(500).json({ message: error?.message })
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found" })
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password)
        if (!isPasswordMatched) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const token = await generateToken(user?._id)
        setCookie(res, token)
        return res.status(200).json(user)
    } catch (error) {
        console.log(`Error in Signin Controller: ${error}`)
        return res.status(500).json({ message: error?.message })
    }
}

export const logout = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(200).json({ message: "User logged out successfully" })
    } catch (error) {
        console.log(`Error in Logout Controller: ${error}`)
        return res.status(500).json({ message: error?.message })
    }
}