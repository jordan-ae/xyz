import { Context, Next } from "hono"
import * as jwt from 'jsonwebtoken';

const SECRET_KEY = process.env.JWT_SECRET!;

export const authMiddleware =  async(c: Context, next: Next) => {
    const authHeader = c.req.header('Authorization')

    console.log(authHeader)

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return c.json({message: 'Unauthorized'}, 401)
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        c.set('user', decoded);
        await next()
      } catch (error) {
        return c.json({ message: 'Invalid or expired token' }, 401);
      }
}