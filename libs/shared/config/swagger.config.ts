import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('Onboarding Api')
.setDescription('The api hub for onboarding applications')
.setVersion('1.0')
.build();
