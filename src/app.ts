import { AppRoutes } from './presentation/api/routes';
import { Server } from './presentation/api/server';
import { envs } from './config/envs';

(() => {
  main();
})();

async function main() {
  const server = new Server({ port: envs.PORT, routes: AppRoutes.routes });

  server.start();
}
