import fastify from "fastify";
import cors from '@fastify/cors';
import localtunnel from 'localtunnel';
import { appRoutes } from "./routes";

const app = fastify();

app.register(cors)

app.register(appRoutes);

app.listen({
  host: '0.0.0.0',
  port: 3333,
})
.then(async () => {
  const tunnel = await localtunnel({
    local_host: '0.0.0.0',
    port: 3333,
    subdomain: 'habits-api',
  });

  console.log('Server started on http://localhost:3333');
});
