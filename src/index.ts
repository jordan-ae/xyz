import { Hono } from 'hono'
import { AuthController } from './controllers/auth_controller'
import { logger } from 'hono/logger'
import { connectDB } from './utils/db'
import { authMiddleware } from './middlewares/auth_middleware'

const app = new Hono()

export const db = connectDB();

const authController = AuthController(app);

app.use("*", logger())

app.get('/', authMiddleware, (c) => {
  return c.text('Hello Hono!')
})

app.route('/', authController)

export default app;
