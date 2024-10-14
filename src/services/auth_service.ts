import { connectDB } from "../utils/db"
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!

export const registerUser = async (email: string, password: string) => {
    const db = await connectDB()
    const users = db.collection('users')

    const existingUser = await users.findOne({email})
    if(existingUser) {
        throw new Error("User Already Exist")
    }

    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = {email, password: hashPassword}

    await users.insertOne(newUser)
    return newUser
}

export const loginUser = async (email: string, password: string) => {
    const db = await connectDB()
    const users = db.collection('users')

    const user = await users.findOne({email})
    if(!user){
        throw new Error("User Doesnt Exist")
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(!isPasswordCorrect) throw new Error("Invalid credentials")

    const token = jwt.sign({id: user._id, email: user.email}, SECRET_KEY, {expiresIn: '72hr'})

    return token
}