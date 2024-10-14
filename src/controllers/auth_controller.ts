import { loginUser, registerUser } from "../services/auth_service";
import { Hono } from "hono";

interface UserCredentials {
    email: string;
    password: string;
}

export const AuthController = (app: Hono) => app
    .post("/register", async (c) => {
        const { email, password } = await c.req.json()

        try {
            const user = await registerUser(email, password)
            return c.json({ message: 'User registered successfully', user })
        } catch {
            return c.json("Failed to create user", 400);
        }
    })

.post("/login", async (c) => {
    const {email, password} = await c.req.json()

    try {
        const token = await loginUser(email, password)
        return c.json({message: "User successfully logged in", token})
    } catch(err) {
        console.log(err)
        return c.json("Incorrect Credentials please try again", 400);
    }
})