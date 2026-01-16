import { app } from "./app";
import { RouterOSService } from "./services/routeros.service";

const PORT = process.env.PORT || 3000;

/**
 * Inicialização do servidor
 */
async function bootstrap() {
  const routerOS = new RouterOSService();
  await routerOS.connect();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
  });
}

bootstrap();
