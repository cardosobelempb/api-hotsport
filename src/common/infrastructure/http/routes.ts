import { routerHost } from '@/routeros/infrastructure/http/routes/host.route'
import { Request, Response, Router } from 'express'

const router = Router()

router.get('/', (request: Request, response: Response) => {
  return response.status(200).json({ message: 'API is running' })
})

router.use('/hosts', routerHost)

export { router }
