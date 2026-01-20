import { Router } from 'express'
import { getDashboard } from '../controllers/dashboard.controller'
import { getUsers, getUser } from '../controllers/user.controller'

export const userRouter = Router()

/**
 * Rotas GET (equivalente ao array m_user_page)
 */
userRouter.get('/get_report', getDashboard)
userRouter.get('/users', getUsers)
userRouter.get('/user/:id', getUser)

userRouter.get('/get_sys_resource', getDashboard)
userRouter.get('/get_hotspotinfo', getDashboard)
userRouter.get('/get_log', getDashboard)
userRouter.get('/get_livereport', getDashboard)
