import { app } from './app'
import { routerConfig } from './config/router.config'
import { RouterOsClient } from './infra/routeros.client'

const PORT = process.env.PORT || 3000

/**
 * Inicialização do servidor
 */
async function bootstrap() {
  const routerOs = new RouterOsClient(routerConfig)
  await routerOs.connect()

  // Armazena conexão no app (dependency container simples)
  app.locals.routerOs = routerOs

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`)
  })
}

bootstrap()
