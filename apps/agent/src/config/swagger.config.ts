import { DocumentBuilder } from '@nestjs/swagger';

export const serverUrl = process.env.AGENT_URL || '';

export const swaggerConfig = new DocumentBuilder()
  .setTitle('Agent Apps Api')
  .setDescription('The api hub for aggent android applications')
  .setVersion('1.0')
  .setBasePath('gi')
  .addBearerAuth({
    type: 'http',
    scheme: 'bearer',
    bearerFormat: 'JWT',
    name: 'JWT',
    description: 'Enter JWT token',
    in: 'header',
  })
  .addServer(serverUrl)
  .build();

export const basicAuthConfig = {
  challenge: true,
  users: {
    admin: 'supersecret',
    adam: 'password1234',
    eve: 'asdfghjkl',
  },
};
