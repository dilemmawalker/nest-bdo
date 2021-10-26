import { DocumentBuilder } from '@nestjs/swagger';
export const serverUrl = process.env.ADMIN_URL || '';
export const swaggerConfig = new DocumentBuilder()
  .setTitle('Onboarding Api')
  .setDescription('The api hub for onboarding applications')
  .setVersion('1.0')
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
